from django.shortcuts import render


def index(request):
    """
    This is the main landing page, at the root '/' path.
    """

    return render(request, "landing-page.html")


def longform_survey(request):
    """
    This is the full survey form
    """

    return render(request, "survey.html")


def demographic_survey(request):
    """
    This is the demographic survey
    """

    return render(request, "survey-demographics.html")


def survey_thanks(request):
    """
    This is the thank-you page for the survey
    """

    return render(request, "survey-thanks.html")
