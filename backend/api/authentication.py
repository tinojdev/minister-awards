from .models import Voter
from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import AuthenticationFailed


class IsVoter(BasePermission):
    def has_permission(self, request, view):
        if request.voter is None:
            return False
        return True
