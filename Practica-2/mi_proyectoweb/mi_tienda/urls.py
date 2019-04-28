from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns =  [
    url(r'^$', views.home_view),
    url(r'^admin/', admin.site.urls),
    url(r'^index', views.home_view),
    url(r'^AvionesCombate', views.AvionesCombate_view),
]
