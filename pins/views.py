from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def index(request):
    """
    This is the main landing page, at the root '/' path.
    """
    return render(request, "landing_page.html")
