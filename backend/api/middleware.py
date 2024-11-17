from .models import Voter


class VoterMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        token = request.headers.get("X-Personal-Id")
        if token is not None:
            try:
                voter = Voter.objects.get(personal_id=token)
                request.voter = voter
            except Voter.DoesNotExist:
                request.voter = None
                pass
        else:
            request.voter = None

        response = self.get_response(request)
        return response
