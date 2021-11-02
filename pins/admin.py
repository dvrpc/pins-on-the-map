from django.contrib.gis import admin

from .models import Pin, Topic, Comment, MapUser, LongformSurvey

admin.site.register(Pin, admin.GeoModelAdmin)

for klass in [Topic, Comment, MapUser, LongformSurvey]:
    admin.site.register(klass)
