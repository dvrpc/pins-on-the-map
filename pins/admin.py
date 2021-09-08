from django.contrib.gis import admin

# Register your models here.


from .models import Pin, Severity, Topic

admin.site.register(Pin, admin.GeoModelAdmin)
admin.site.register(Severity)
admin.site.register(Topic)
