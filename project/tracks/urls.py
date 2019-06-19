from rest_framework.routers import SimpleRouter

from project.tracks.views import TrackViewSet

app_name = 'tracks'

router = SimpleRouter()
router.register(
    prefix=r'',
    base_name='tracks',
    viewset=TrackViewSet
)
urlpatterns = router.urls
