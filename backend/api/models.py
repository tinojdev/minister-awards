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

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Nominations"
