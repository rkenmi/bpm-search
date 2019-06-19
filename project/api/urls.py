from django.conf.urls import url, include
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^', include('rest_auth.urls')),
    url(r'^auth/', include('rest_framework.urls'))  # adds DRF's login and logout views
]
