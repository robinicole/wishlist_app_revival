from api.views import MyGiftsViewSet, GiftsWishlistViewSet, UsersViewSet

from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register('my_gifts', MyGiftsViewSet, 'my_gifts')
router.register('wishlists', GiftsWishlistViewSet, 'wishlists')
router.register('users', UsersViewSet, 'users')



urlpatterns = router.urls 
