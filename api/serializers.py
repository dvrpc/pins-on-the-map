from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer


from pins.models import Pin, Comment, MapUser

from .configuration import TAGS


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
    """This is the upload serializer, which accepts all 10 tags by default"""

    class Meta:
        model = Pin
        fields = [
            "pin_id",
            "geom",
            "ip_address",
            "prompt_1",
            "tag_1",
            "tag_2",
            "tag_3",
            "tag_4",
            "tag_5",
            "tag_6",
            "tag_7",
            "tag_8",
            "tag_9",
            "tag_10",
        ]


class CommentSerializer(serializers.ModelSerializer):
    """
    Used to create a comment
    """

    class Meta:
        model = Comment
        fields = ["text", "pin_id", "ip_address"]


class CommentViewSerializer(serializers.ModelSerializer):
    """
    Used for viewing comments grouped by parent pin
    """

    class Meta:
        model = Comment
        fields = ["text"]


class MapUserSerializer(serializers.ModelSerializer):
    """
    Used to create/update a MapUser
    """

    class Meta:
        model = MapUser
        fields = ["ip_address", "responded_to_survey_question", "q1"]


class PinGeoSerializer(GeoFeatureModelSerializer):
    """
    This is the read-only geo view of the pins,
    which only provides the number of tags that have been configured
    """

    comments = CommentViewSerializer(many=True, read_only=True)

    class Meta:
        model = Pin
        geo_field = "geom"
        fields = [
            # "pin_id",
            "geom",
            "comments",
            "prompt_1",
            "pin_id",
        ] + [f"tag_{x}" for x in range(1, len(TAGS) + 1)]
