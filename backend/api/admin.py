from django.contrib import admin
from .models import Category, Nomination, Voter


class VoterAdmin(admin.ModelAdmin):
    readonly_fields = ("personal_id",)


admin.site.register(Category)
admin.site.register(Nomination)
admin.site.register(Voter, VoterAdmin)
