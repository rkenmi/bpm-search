from django.contrib.auth.models import User
from rest_framework import viewsets

# Create your views here.
from rest_framework.permissions import IsAuthenticated

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
