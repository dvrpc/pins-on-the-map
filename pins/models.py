from django.contrib.gis.db import models
from django.contrib.gis.geos import Point


class Topic(models.Model):
    """Topic categories are used internally by DVRPC"""

    topic = models.CharField(max_length=100)

    def __str__(self):
        return self.topic


class Pin(models.Model):
    """ """

    pin_id = models.BigAutoField(primary_key=True)
    created_on = models.DateTimeField(auto_now_add=True)
    visible = models.BooleanField(default=True)

    prompt_1 = models.TextField(blank=True)
    prompt_2 = models.TextField(blank=True)

    ip_address = models.GenericIPAddressField(null=True)

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

    # connect to internal DVRPC fields
    topics = models.ManyToManyField(Topic, blank=True)

    # The geometry should have a default value that allows
    # the equivalent of a "null" entry, which is how all
    # "general" comments will get stored in the same table
    geom = models.PointField(default=Point(0.0, 0.0))

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
    created_on = models.DateTimeField(auto_now_add=True)
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.text


class MapUser(models.Model):

    ip_address = models.GenericIPAddressField(null=True)
    created_on = models.DateTimeField(auto_now_add=True)

    responded_to_survey_question = models.BooleanField(default=False)

    q1 = models.TextField(blank=True)
    q2 = models.TextField(blank=True)
    q3 = models.TextField(blank=True)
    q4 = models.TextField(blank=True)
    q5 = models.TextField(blank=True)
    q6 = models.TextField(blank=True)

    def __str__(self):
        return self.ip_address


class LongformSurvey(models.Model):

    ip_address = models.GenericIPAddressField(null=True)
    created_on = models.DateTimeField(auto_now_add=True)

    usage = models.TextField(blank=True)
    frequency = models.TextField(blank=True)
    mode = models.TextField(blank=True)
    mode_issues = models.TextField(blank=True)

    condition_1 = models.TextField(blank=True)
    condition_2 = models.TextField(blank=True)
    condition_3 = models.TextField(blank=True)
    condition_4 = models.TextField(blank=True)
    condition_5 = models.TextField(blank=True)
    condition_6 = models.TextField(blank=True)
    condition_7 = models.TextField(blank=True)
    condition_8 = models.TextField(blank=True)
    condition_9 = models.TextField(blank=True)

    priorities = models.TextField(blank=True)
    ideas = models.TextField(blank=True)

    def __str__(self):
        return self.ip_address
