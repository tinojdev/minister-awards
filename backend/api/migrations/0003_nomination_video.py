# Generated by Django 5.0.7 on 2024-10-14 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_nomination_nomination_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='nomination',
            name='video',
            field=models.FileField(blank=True, null=True, upload_to='nomination_videos'),
        ),
    ]