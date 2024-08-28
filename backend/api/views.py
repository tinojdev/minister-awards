from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from django.http import Http404
from rest_framework.reverse import reverse

from .models import Category, Nomination, Voter
from .serializers import CategorySerializer, NominationSerializer, VoterSerializer


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
                "voter-list": reverse("voter-list", request=request),
            }
        )


class CategoryList(views.APIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request):
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
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        voters = Voter.objects.all()
        serializer = VoterSerializer(voters, many=True)
        return Response(serializer.data)
