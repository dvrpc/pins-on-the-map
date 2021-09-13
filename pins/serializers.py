from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer


from .models import Pin


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class PinSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pin
        fields = ["geom"]


class PinGeoSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Pin
        geo_field = "geom"
        fields = "__all__"
