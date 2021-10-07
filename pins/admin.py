from django.contrib.gis import admin

from .models import Pin, Topic, TagGroup, Tag, Comment

admin.site.register(Pin, admin.GeoModelAdmin)

for klass in [Topic, TagGroup, Tag, Comment]:
    admin.site.register(klass)
