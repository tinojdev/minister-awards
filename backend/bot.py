import os, django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "minister_awards.settings")
django.setup()

from pathlib import Path
import logging
from api.models import Voter, Category
from asgiref.sync import sync_to_async
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import (
    ApplicationBuilder,
    ContextTypes,
    CommandHandler,
    CallbackQueryHandler,
)
from dotenv import load_dotenv


logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)


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

    keyboard = []
    for category in categories:
        keyboard.append(
            [
                InlineKeyboardButton(
                    category.name, callback_data=f"{category.name}&&{category.id}"
                )
            ]
        )

    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Valitse kategoria.", reply_markup=reply_markup)


async def nominate_button(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    category_name, category_id = query.data.split("&&")
    await query.answer()
    await query.edit_message_text(
        "Valittu kategoria: {}".format(category_name), reply_markup=None
    )


if __name__ == "__main__":
    BASE_DIR = Path(__file__).resolve().parent.parent
    load_dotenv(BASE_DIR / ".." / ".env")

    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    application = ApplicationBuilder().token(token).build()

    application.add_handler(CommandHandler("join", join))

    application.add_handler(CommandHandler("start", start))

    application.add_handler(CommandHandler("nominate", nominate))
    application.add_handler(CallbackQueryHandler(nominate_button))

    application.run_polling()
