from django.contrib.gis import admin

from .models import Pin, Severity, Topic, MapUser, Survey, TagGroup, Tag, Comment

admin.site.register(Pin, admin.GeoModelAdmin)

for klass in [Severity, Topic, MapUser, Survey, TagGroup, Tag, Comment]:
    admin.site.register(klass)
