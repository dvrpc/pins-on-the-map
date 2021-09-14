from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer


from .models import Pin, Tag, TagGroup, Comment, Survey


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


class TagGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagGroup
        fields = ["title"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["text"]


class TagSerializer(serializers.ModelSerializer):
    tag_group = TagGroupSerializer(read_only=True)

    class Meta:
        model = Tag
        fields = ["title", "tag_group"]


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ["prompt_1", "prompt_2"]


class PinGeoSerializer(GeoFeatureModelSerializer):

    tags = TagSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    survey_id = SurveySerializer(read_only=True)

    class Meta:
        model = Pin
        geo_field = "geom"
        fields = ["geom", "tags", "comments", "survey_id"]
