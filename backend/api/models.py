from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit
from django.db import models

import random


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


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


class Nomination(models.Model):
    nominated_voter = models.ForeignKey(
        Voter, related_name="nominations", on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Category, related_name="nominations", on_delete=models.CASCADE
    )
    nomination_text = models.TextField(blank=True, null=True)

    image = models.ImageField(upload_to="nomination_images", blank=True, null=True)
    image_thumbnail = ImageSpecField(
        source="image",
        format="JPEG",
        processors=[ResizeToFit(300, 200)],
        options={"quality": 60},
    )

    def __str__(self):
        return f"{self.nominated_voter} nominated for {self.category}"

    class Meta:
        verbose_name_plural = "Nominations"


class Vote(models.Model):
    voter = models.ForeignKey(Voter, related_name="votes", on_delete=models.CASCADE)
    nomination = models.ForeignKey(
        Nomination, related_name="votes", on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Category, related_name="votes", on_delete=models.CASCADE
    )

    weight = models.PositiveIntegerField(blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.voter} voted for {self.nomination.nominated_voter} in {self.category}, weight: {self.weight}."
