# Generated by Django 5.0.7 on 2024-11-22 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_weight_vote_order'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='nomination',
            name='nomination_text',
        ),
        migrations.AddField(
            model_name='nomination',
            name='title',
            field=models.TextField(default='skibidi'),
            preserve_default=False,
        ),
    ]
