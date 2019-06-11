from rest_framework import viewsets, permissions

# Create your views here.
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class GenericViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)


class LoginView(APIView):
    """
    Login
    """
    authentication_classes = (SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)


