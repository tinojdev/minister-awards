import os, django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "minister_awards.settings")
django.setup()

from pathlib import Path
import logging
from api.models import Voter
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler
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


if __name__ == "__main__":
    BASE_DIR = Path(__file__).resolve().parent.parent
    load_dotenv(BASE_DIR / ".." / ".env")

    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    application = ApplicationBuilder().token(token).build()

    join_handler = CommandHandler("join", join)
    application.add_handler(join_handler)

    start_handler = CommandHandler("start", start)
    application.add_handler(start_handler)

    application.run_polling()
