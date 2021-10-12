from django.contrib.gis import admin

from .models import Pin, Topic, Comment

admin.site.register(Pin, admin.GeoModelAdmin)

for klass in [Topic, Comment]:
    admin.site.register(klass)
