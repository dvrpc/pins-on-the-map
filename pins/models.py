from django.contrib.gis.db import models
from django.contrib.gis.geos import Point


class MapUser(models.Model):
    """
    The MapUser class exists to capture an ID for each
    user and some optional demographic info. Each pin
    and comment will tie back to a user.
    """

    ip_address = models.GenericIPAddressField()
    age_range = models.CharField(max_length=100)
    demographic_info = models.CharField(max_length=100)
    # etc.


class Survey(models.Model):
    """
    The Survey class is the only one that would
    potentially need customization on a per-project basis
    """

    prompt_1 = models.TextField()
    prompt_2 = models.TextField()
    # etc ...


class TagGroup(models.Model):
    """
    The public interface uses tags, which are presented
    in groups of related tags
    """

    title = models.CharField(max_length=100)


class Tag(models.Model):
    """
    Each individual tag belogs to a TagGroup,
    and has both a name and a description that will
    appear in the interface when hovering over an info icon
    """

    title = models.CharField(max_length=100)
    description = models.TextField()
    tag_group = models.ForeignKey(TagGroup, on_delete=models.CASCADE)


class Topic(models.Model):
    """Topic categories are used internally by DVRPC"""

    topic = models.CharField(max_length=100)


class Severity(models.Model):
    """Severity categories are used interally by DVRPC"""

    severity = models.CharField(max_length=100)


class Pin(models.Model):
    """
    The Pin class includes links to:
        - MapUser
        - Survey
        - Tag(s)
        - Topic(s)
        - Severity

    It also includes attributes for geo location,
    creation datetime, and map visibility.

    Finally, each pin may have multiple Comment records.
    """

    # general data necessary for each pin
    created_on = models.DateTimeField()
    visible = models.BooleanField(default=True)

    # The geometry should have a default value that allows
    # the equivalent of a "null" entry, which is how all
    # "general" comments will get stored in the same table
    geom = models.PointField(default=Point(0.0, 0.0))

    # connect to user record
    user_id = models.ForeignKey(MapUser, on_delete=models.CASCADE)

    # connect to survey table that is customized per-project
    survey_id = models.ForeignKey(Survey, on_delete=models.CASCADE)

    # connect to public-facing tags
    tags = models.ManyToManyField(Tag)

    # connect to internal DVRPC fields
    topics = models.ManyToManyField(Topic)
    severity_level = models.ForeignKey(Severity, on_delete=models.CASCADE)


class Comment(models.Model):
    """
    The Comment class allows people to add text comments
    to a pin that someone else had already added to the map
    """

    text = models.TextField()
    pin_id = models.ForeignKey(Pin, on_delete=models.CASCADE)
    user_id = models.ForeignKey(MapUser, on_delete=models.CASCADE)
