import os, django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "minister_awards.settings")
django.setup()

from pathlib import Path
import logging
import io
from django.core.files.images import ImageFile
from api.models import Voter, Category, Nomination
from asgiref.sync import sync_to_async
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, Message
from telegram.ext import (
    ApplicationBuilder,
    ContextTypes,
    CommandHandler,
    CallbackQueryHandler,
    ConversationHandler,
    DictPersistence,
)
from dotenv import load_dotenv


logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

CATEGORY, NOMINEE = range(2)


async def join(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.message.from_user.is_bot:
        return
    if update.message.chat.type == "private":
        return

    bot_username = context.bot.username

    bot_link = f"https://t.me/{bot_username}?start=private_chat"
    message = f"Linkki äänestykseen: {bot_link}"

    await update.message.reply_text(message, parse_mode="HTML")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.message.from_user.is_bot:
        return

    if update.message.chat.type != "private":
        return

    first_name = update.message.from_user.first_name
    last_name = update.message.from_user.last_name
    nickname = update.message.from_user.username
    telegram_id = update.message.from_user.id

    user = await Voter.objects.aupdate_or_create(
        first_name=first_name,
        defaults=dict(
            last_name=last_name,
            username=nickname,
            telegram_id=telegram_id,
        ),
    )
    user = user[0]

    target_url = os.getenv("TELEGRAM_BOT_TARGET_URL")

    message = f"Pääset äänestämään <a href='{target_url}{user.personal_id}'>tästä</a>."
    await update.message.reply_text(message, parse_mode="HTML")


@sync_to_async
def get_categories():
    return list(Category.objects.all())


async def nominate(update: Update, context: ContextTypes.DEFAULT_TYPE):
    categories = await get_categories()

    replied_to_message = update.message.reply_to_message
    if not replied_to_message:
        return -1

    context.user_data["message"] = replied_to_message

    keyboard = []
    for category in categories:
        keyboard.append(
            [
                InlineKeyboardButton(category.name, callback_data=f"{category.id}"),
            ]
        )

    reply_markup = InlineKeyboardMarkup(keyboard)
    await replied_to_message.reply_text(
        "Valitse kategoria.", reply_markup=reply_markup, quote=True
    )

    return CATEGORY


@sync_to_async
def get_voters():
    return list(Voter.objects.all())


async def category_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    data = query.data
    await query.answer()

    category = await Category.objects.aget(id=int(data))
    context.user_data["category"] = category

    voters = await get_voters()

    keyboard = []
    for voter in voters:
        keyboard.append(
            [
                InlineKeyboardButton(
                    voter.first_name,
                    callback_data=f"{voter.first_name}",
                ),
            ]
        )

    await query.edit_message_text(
        "Valittu kategoria: {}. Valitse ehdokas:".format(category.name),
        reply_markup=InlineKeyboardMarkup(keyboard),
    )

    return NOMINEE


async def nominee_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    data = query.data
    await query.answer()

    voter = await Voter.objects.aget(first_name=data)
    category = context.user_data["category"]
    message: Message = context.user_data["message"]

    if message.photo or message.sticker:
        if message.photo:
            photo = message.photo[-1]
            photo_file = await photo.get_file()
        if message.sticker:
            photo_file = await message.sticker.get_file()

        byte_arr = await photo_file.download_as_bytearray()
        image = ImageFile(io.BytesIO(byte_arr), name="submission.jpg")

        await Nomination.objects.acreate(
            nominated_voter=voter,
            category=category,
            image=image,
        )
    else:
        await Nomination.objects.acreate(
            nominated_voter=voter,
            category=category,
            nomination_text=message.text,
        )

    await query.edit_message_text(
        f"{voter.first_name} asetettu ehdolle kategoriassa {category.name}",
        reply_markup=None,
    )
    return -1


async def fallback_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    if query:
        await query.answer()

    return -1


if __name__ == "__main__":
    BASE_DIR = Path(__file__).resolve().parent.parent
    load_dotenv(BASE_DIR / ".." / ".env")

    token = os.environ.get("TELEGRAM_BOT_TOKEN")

    persistence = DictPersistence()
    application = ApplicationBuilder().token(token).persistence(persistence).build()

    application.add_handler(CommandHandler("join", join))

    application.add_handler(CommandHandler("start", start))

    conv_handler = ConversationHandler(
        conversation_timeout=180,
        per_chat=True,
        per_user=True,
        per_message=False,
        allow_reentry=True,
        entry_points=[CommandHandler("nominate", nominate)],
        states={
            CATEGORY: [CallbackQueryHandler(category_callback)],
            NOMINEE: [CallbackQueryHandler(nominee_callback)],
        },
        fallbacks=[CommandHandler("cancel", fallback_handler)],
    )
    application.add_handler(conv_handler)

    application.run_polling()
