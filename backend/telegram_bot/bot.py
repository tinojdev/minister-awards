import os
from pathlib import Path
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "minister_awards.settings")
load_dotenv(BASE_DIR / ".." / ".env")


logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)


async def join(update: Update, context: ContextTypes.DEFAULT_TYPE):
    bot_username = context.bot.username

    bot_link = f"https://t\.me/{bot_username}?start=private_chat"
    message = f"Click [here]({bot_link}) to get your token\."

    await update.message.reply_text(message, parse_mode="MarkdownV2")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    first_name = update.message.from_user.first_name
    last_name = update.message.from_user.last_name
    try:
        nickname = update.message.from_user.username
        if nickname is None:
            nickname = first_name

        user_photos = await update.message.from_user.get_profile_photos()
        print(user_photos.total_count)
        print(user_photos.photos[0][0])

        first_photo = user_photos.photos[0]
        downloadable_photo = await context.bot.get_file(first_photo[0].file_id)

        await update.message.reply_photo(first_photo[0].file_id)
        await update.message.reply_text(f"Kato ny ittees {first_name}")
    except Exception as e:
        print(e)


if __name__ == "__main__":
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    application = ApplicationBuilder().token(token).build()

    join_handler = CommandHandler("join", join)
    application.add_handler(join_handler)

    start_handler = CommandHandler("start", start)
    application.add_handler(start_handler)

    application.run_polling()
