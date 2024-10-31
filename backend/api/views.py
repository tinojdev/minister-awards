from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from django.http import Http404
from django.db.models import Sum
from django.db.models.functions import Coalesce
from rest_framework.reverse import reverse

from .models import Category, Nomination, Voter, Vote
from .authentication import IsVoter
from .serializers import (
    CategorySerializer,
    NominationSerializer,
    VoterSerializer,
    VoteSerializer,
)


class ApiRoot(views.APIView):
    """
    Returns a list of all **active** accounts in the system.
    """

    def get(self, request):
        return Response(
            {
                "categories": reverse("category-list", request=request),
                "category-detail": reverse(
                    "category-detail", args=[1], request=request
                ),
                "nominations": reverse("nomination-list", args=[1], request=request),
                "nomination-detail": reverse(
                    "nomination-detail", args=[1, 1], request=request
                ),
                "vote": reverse("vote-detail", args=[1], request=request),
                "votes": reverse("vote-list", request=request),
                "voter-list": reverse("voter-list", request=request),
            }
        )


class CategoryList(views.APIView):
    serializer_class = CategorySerializer
    permission_classes = [IsVoter | permissions.IsAdminUser]

    def get(self, request):
        print(request.voter)
        categories = Category.objects.all()
        serializer = self.serializer_class(categories, many=True)
        return Response(serializer.data)


class CategoryDetail(views.APIView):
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, category_id):
        category = self.get_object(category_id)
        serializer = CategorySerializer(category, context={"request": request})
        return Response(serializer.data)


class NominationList(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, category_id):
        nominations = Nomination.objects.filter(category_id=category_id)
        serializer = NominationSerializer(nominations, many=True)
        return Response(serializer.data)


class NominationDetail(views.APIView):
    serializer_class = NominationSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self, nomination_id, category_id):
        try:
            return Nomination.objects.get(pk=nomination_id, category_id=category_id)
        except Nomination.DoesNotExist:
            raise Http404

    def get(self, request, category_id, nomination_id):
        nomination = self.get_object(nomination_id, category_id)
        serializer = self.serializer_class(nomination)
        return Response(serializer.data)


class VoterList(views.APIView):
    """
    Returns a list of all voters.

    Parameters:

    - getTotalPoints: bool (default: false)
        - If true, returns the total points for each voter.

    Returns:

    <pre>
    [{
        first_name: string,
        last_name: string | null,
        username: string | null,
        total_points: int | null ( not null only if getTotalPoints is true)
    }]
    </pre>
    """

    permission_classes = [IsVoter | permissions.IsAdminUser]

    def get(self, request):
        should_return_points = (
            request.query_params.get("getTotalPoints", "false").lower() == "true"
        )

        if should_return_points:
            voters = Voter.objects.all().annotate(
                total_points=Sum("nominations__votes__weight", default=0)
            )

            serializer = VoterSerializer(voters, many=True)
            return Response(serializer.data)

        voters = Voter.objects.all()
        serializer = VoterSerializer(voters, many=True)
        return Response(serializer.data)


class VoteListView(views.APIView):
    """
    Vote for a nomination.

    Required fields
    weight: int
    """

    permission_classes = [IsVoter | permissions.IsAdminUser]

    def post(
        self,
        request,
    ):
        serializer = VoteSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        serializer.save()
        return Response({"message": "Vote received"})

    def get(self, request):

        filters = {}
        category_id = request.query_params.get("categoryId", None)
        if category_id:
            filters["category_id"] = category_id
        nomination_id = request.query_params.get("nominationId", None)
        if nomination_id:
            filters["nomination_id"] = nomination_id

        only_personal_votes = (
            request.query_params.get("onlyPersonalVotes", "false").lower() == "true"
        )

        try:
            if only_personal_votes:
                votes = Vote.objects.filter(voter=request.voter, **filters)
            else:
                votes = Vote.objects.filter(**filters)
            serializer = VoteSerializer(votes, many=True)
            return Response(serializer.data)
        except Vote.DoesNotExist:
            return Response({"message": "Vote not found"}, status=404)

    def delete(self, request, category_id, nomination_id):
        try:
            vote = Vote.objects.get(
                category_id=category_id,
                nomination_id=nomination_id,
                voter=request.voter,
            )
            vote.delete()
            return Response({"message": "Vote removed"})
        except Vote.DoesNotExist:
            return Response({"message": "Vote not found"}, status=404)


class VoteDetailView(views.APIView):
    permission_classes = [IsVoter | permissions.IsAdminUser]

    def get(self, request, vote_id):
        try:
            vote = Vote.objects.get(pk=vote_id)
            serializer = VoteSerializer(vote)
            return Response(serializer.data)
        except Vote.DoesNotExist:
            return Response({"message": "Vote not found"}, status=404)

    def delete(self, request, vote_id):
        try:
            vote = Vote.objects.get(pk=vote_id)
            vote.delete()
            return Response({"message": "Vote removed"})
        except Vote.DoesNotExist:
            return Response({"message": "Vote not found"}, status=404)
