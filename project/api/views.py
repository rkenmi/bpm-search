from django.contrib.auth.models import User
from django.http import Http404
from rest_framework import viewsets, permissions

# Create your views here.
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from project.api.serializers import UserSerializer, CarSerializer, VehicleMakeSerializer
from project.car.models import Car, VehicleMake


class GenericViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)

class UserViewSet(GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CarViewSet(GenericViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class VehicleMakeViewSet(viewsets.ReadOnlyModelViewSet,
                         GenericViewSet):
    queryset = VehicleMake.objects.all().order_by('name')
    serializer_class = VehicleMakeSerializer


class LoginView(APIView):
    """
    Login
    """
    authentication_classes = (SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, name):
        try:
            return VehicleMake.objects.get(name=name)
        except VehicleMake.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        name = 'Honda'
        vehicle_make = self.get_object(name)
        serializer = VehicleMakeSerializer(vehicle_make)
        return Response(serializer.data)

