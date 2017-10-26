from django.contrib.auth.models import User
from rest_framework import viewsets

# Create your views here.
from cars_app.project.api.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer