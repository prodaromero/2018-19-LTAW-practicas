# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Aviones_Combate (models.Model):
    image = models.ImageField(upload_to='static', default=0)
    # models.CharField --> definir un texto con un número limitado de caracteres.
    name  = models.CharField(max_length=200)
    stock = models.IntegerField()
    price = models.CharField(max_length=200, default=0)


    def __str__(self):
        return self.name

class Aviones_Comerciales (models.Model):
    image = models.ImageField(upload_to='static', default=0)
    # models.CharField --> definir un texto con un número limitado de caracteres.
    name  = models.CharField(max_length=200)
    stock = models.IntegerField()
    price = models.CharField(max_length=200, default=0)


    def __str__(self):
        return self.name
