from typing import Iterable
from PIL import Image
from io import BytesIO
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from django.core.files import File
from django.db import models

import random


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Nomination(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(
        Category, related_name="nominations", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="nomination_images", blank=True, null=True)
    image_thumbnail = ImageSpecField(
        source="image",
        format="JPEG",
        processors=[ResizeToFill(300, 200)],
        options={"quality": 60},
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Nominations"


class Voter(models.Model):
    first_name = models.CharField(max_length=100, unique=True, primary_key=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    username = models.CharField(max_length=100, blank=True, null=True)

    telegram_id = models.IntegerField(unique=True, blank=True, null=True)
    personal_id = models.CharField(max_length=100, blank=True)

    def save(self, *args, **kwargs) -> None:
        if not self.personal_id:
            characters = (
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
            )
            new_id = "".join(random.choices(characters, k=10))
            self.personal_id = new_id

        return super().save(*args, **kwargs)

    def __str__(self):
        return self.first_name
