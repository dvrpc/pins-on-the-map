from django.shortcuts import render


def index(request):
    """
    This is the main landing page, at the root '/' path.
    """

    return render(request, "landing_page.html")
