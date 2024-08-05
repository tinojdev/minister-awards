from typing import Iterable
from PIL import Image
from io import BytesIO
from django.core.files import File
from django.db import models


def compress_image(image: models.ImageField) -> models.ImageField:
    img = Image.open(image)
    img_io = BytesIO()
    img.save(img_io, "JPEG", quality=70)
    new_image = File(img_io, name=image.name)
    return new_image


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

    def save(self, *args, **kwargs):
        new_image = compress_image(self.image)
        self.image = new_image
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Nominations"
