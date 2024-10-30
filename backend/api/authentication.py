from .models import Voter
from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import AuthenticationFailed


def get_voter_from_token(request):
    token = request.headers.get("X-Personal-Id")
    if not token:
        return None
    try:
        voter = Voter.objects.get(personal_id=token)
    except Voter.DoesNotExist:
        return None

    return voter


class IsVoter(BasePermission):
    def has_permission(self, request, view):
        voter = get_voter_from_token(request)
        if voter is None:
            return False
        return True
