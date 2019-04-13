"""mi_tienda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))


--------------------------------------------------------------------------------
---------------- DEFINIMOS TODAS LAS URLS QUE IMPLEMENTAREMOS ------------------
--------------------------------------------------------------------------------

Para implementar las URLs se utilizan expresiones de python. Estas expresiones
son cadenas que comienzan por la letra r: r'expresion regular' y en su interior
contiene una serie de caracteres especiales para indicar la estructura de la URL:

        - '^' seguido de caracteres indica que es una palabra situada al comienzo
            de la cadena

        - Asi, en el proyecto hola mundo se define la URL 'admin/'
"""

from django.conf.urls import include, url
from django.contrib import admin
from mi_tienda.views import mi_funcion
from mi_tienda.views import mi_producto
from mi_tienda.views import saludo
from mi_tienda.views import index

urlpatterns = [
    url(r'^main/', index),
    url(r'hola/', mi_funcion),
    url(r'producto/(\d{1,2})/$', mi_producto),
    url(r'saludo/', saludo),
    url(r'^test/', include(admin.site.urls)),
]
