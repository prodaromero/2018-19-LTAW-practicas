# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

# From mi_tienda.models import Products
from mi_tienda.models import Aviones_Combate
from mi_tienda.models import Aviones_Comerciales

# Create your views here.
def home_view (request):
    return render(request, "index.html", {'user':'cilente'})

def AvionesCombate_view (request):
    combate = Aviones_Combate.objects.all()
    return render(request, "AvionesCombate.html",{'products':combate})

def AvionesComerciales_view (request):
    comerciales = Aviones_Comerciales.objects.all()
    return render(request, "AvionesComerciales.html",{'products':comerciales})

def list(request):
    objects = Aviones_Combate.objects.all()
    html = "<p>Listado de articulos</p>"
    for elt in objects:
        print(elt.name)
        html += '<p>'+ elt.name + ' ' + str(elt.price) + '<p>'
    return HttpResponse(html)
