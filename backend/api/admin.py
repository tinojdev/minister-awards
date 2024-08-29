from django.contrib import admin
from .models import Category, Nomination, Voter, Vote


class VoterAdmin(admin.ModelAdmin):
    readonly_fields = ("personal_id",)


class VoteAdmin(admin.ModelAdmin):
    readonly_fields = ("timestamp",)


admin.site.register(Category)
admin.site.register(Nomination)
admin.site.register(Voter, VoterAdmin)
admin.site.register(Vote, VoteAdmin)
