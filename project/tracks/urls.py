from rest_framework.routers import SimpleRouter

from project.tracks.views import TrackViewSet

app_name = 'articles'

router = SimpleRouter()
router.register(
    prefix=r'',
    base_name='articles',
    viewset=TrackViewSet
)
urlpatterns = router.urls
