from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer


from pins.models import Pin, Comment


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """This is the built-in Django user for authentication"""

    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    """This is the built-in Django groups tied to each 'User'"""

    class Meta:
        model = Group
        fields = ["url", "name"]


class PinSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pin
        fields = ["geom", "ip_address", "prompt_1"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["text"]


class PinGeoSerializer(GeoFeatureModelSerializer):

    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Pin
        geo_field = "geom"
        fields = ["geom", "comments", "prompt_1"]
