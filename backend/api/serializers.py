from rest_framework import serializers
from .models import Category, Nomination


class NominationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomination
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    nominations = NominationSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = "__all__"
        # fields = ["id", "name", "nominations"]
