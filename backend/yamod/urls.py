from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token

from . import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('gardener/options', views.gardener_option_list),
    path('garden/list', views.garden_list),
    path('garden/options', views.garden_option_list),
    path('garden/create', views.garden_form_create),
    path('garden/<int:pk>/get', views.garden_form_get),
    path('garden/<int:pk>/update', views.garden_form_update),
    path('garden/<int:pk>/delete', views.garden_delete),
    path('plant/list', views.plant_list),
    path('plant/create', views.plant_form_create),
    path('plant/<int:pk>/get', views.plant_form_get),
    path('plant/<int:pk>/update', views.plant_form_update),
    path('plant/<int:pk>/delete', views.plant_delete),


    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^api-token-auth/', obtain_jwt_token),
]
