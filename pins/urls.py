from django.urls import include, path

from . import views


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", views.index, name="index"),
    path("survey", views.longform_survey, name="survey"),
    path("thanks", views.survey_thanks, name="survey"),
    path("demographics", views.demographic_survey, name="survey"),
]
