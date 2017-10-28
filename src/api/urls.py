from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken import views as drf_views
from src.api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'cars', views.CarViewSet)
router.register(r'makes', views.VehicleMakeViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_framework.urls'))  # adds DRF's login and logout views
]