from typing import Iterable
from PIL import Image
from io import BytesIO
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from django.core.files import File
from django.db import models


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
