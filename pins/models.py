from django.contrib.gis.db import models
from django.contrib.gis.geos import Point


class Topic(models.Model):
    """Topic categories are used internally by DVRPC"""

    topic = models.CharField(max_length=100)

    def __str__(self):
        return self.topic


class Pin(models.Model):
    """ """

    # general data necessary for each pin
    created_on = models.DateTimeField(auto_now_add=True)
    visible = models.BooleanField(default=True)

    prompt_1 = models.TextField(blank=True)
    prompt_2 = models.TextField(blank=True)

    # The geometry should have a default value that allows
    # the equivalent of a "null" entry, which is how all
    # "general" comments will get stored in the same table
    geom = models.PointField(default=Point(0.0, 0.0))

    # connect to user record
    # user_id = models.ForeignKey(MapUser, on_delete=models.CASCADE, blank=True, null=True)

    ip_address = models.GenericIPAddressField(null=True)

    # connect to internal DVRPC fields
    topics = models.ManyToManyField(Topic, blank=True)

    tag_1 = models.BooleanField(default=False)
    tag_2 = models.BooleanField(default=False)
    tag_3 = models.BooleanField(default=False)
    tag_4 = models.BooleanField(default=False)
    tag_5 = models.BooleanField(default=False)
    tag_6 = models.BooleanField(default=False)
    tag_7 = models.BooleanField(default=False)
    tag_8 = models.BooleanField(default=False)
    tag_9 = models.BooleanField(default=False)
    tag_10 = models.BooleanField(default=False)

    def __str__(self):
        return str(self.geom)


class Comment(models.Model):
    """
    The Comment class allows people to add text comments
    to a pin that someone else had already added to the map
    """

    text = models.TextField()
    pin_id = models.ForeignKey(Pin, related_name="comments", on_delete=models.CASCADE)
    ip_address = models.GenericIPAddressField(null=True)

    def __str__(self):
        return self.text
