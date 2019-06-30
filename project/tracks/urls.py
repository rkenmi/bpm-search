from rest_framework.routers import SimpleRouter

from project.tracks.views import TrackViewSet

app_name = 'tracks'

router = SimpleRouter()
router.register(
    prefix=r'',
    basename='tracks',
    viewset=TrackViewSet
)
urlpatterns = router.urls
