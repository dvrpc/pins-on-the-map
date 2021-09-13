from django.shortcuts import render

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions

from .serializers import UserSerializer, GroupSerializer, PinSerializer
from .models import Pin


def index(request):
    """
    This is the main landing page, at the root '/' path.
    """
    return render(request, "landing_page.html")


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class PinViewSet(viewsets.ModelViewSet):
    """
    API endpoint to see all pins
    """

    queryset = Pin.objects.all()
    serializer_class = PinSerializer
    permission_classes = [permissions.AllowAny]
