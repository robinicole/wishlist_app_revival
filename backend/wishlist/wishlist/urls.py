from django.urls import include, path
from rest_framework import routers
from api import views
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt import views as jwt_views
from django.contrib import admin

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('rest-auth/', include('rest_auth.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register', views.create_auth, name='register'),
]
