from rest_framework import serializers
from .models import Category, Nomination, Voter, Vote


class NominationSerializer(serializers.ModelSerializer):
    image_thumbnail = serializers.ImageField(read_only=True)

    class Meta:
        model = Nomination
        fields = ["id", "name", "category", "image", "image_thumbnail"]
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    nominations = NominationSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = "__all__"
        # fields = ["id", "name", "nominations"]


class VoterSerializer(serializers.ModelSerializer):
    total_points = serializers.IntegerField(
        read_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Voter
        fields = ["first_name", "last_name", "username", "total_points"]


class VoteSerializer(serializers.ModelSerializer):
    nominated_voter = serializers.CharField(
        read_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Vote
        required_fields = ["weight"]
        fields = [
            "id",
            "nomination",
            "category",
            "weight",
            "timestamp",
            "nominated_voter",
        ]
