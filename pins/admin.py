from django.contrib.gis import admin

from .models import Pin, Topic, Comment, MapUser

admin.site.register(Pin, admin.GeoModelAdmin)

for klass in [Topic, Comment, MapUser]:
    admin.site.register(klass)
