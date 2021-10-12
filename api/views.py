from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ipware import get_client_ip


from .serializers import (
    PinSerializer,
    UserSerializer,
    GroupSerializer,
    PinGeoSerializer,
)
from pins.models import Pin

from .configuration import TAGS


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


class PinGeoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to see all pins as geojson
    """

    queryset = Pin.objects.all()
    serializer_class = PinGeoSerializer
    permission_classes = [permissions.AllowAny]


@api_view(["GET"])
def all_tags(request):
    return Response(TAGS, status=status.HTTP_200_OK)


@api_view(["POST"])
def add_pin(request):
    if request.method == "POST":

        # Get the user's IP address
        client_ip, is_routable = get_client_ip(request)

        if not client_ip:
            client_ip = "999.8.7.6"

        # Insert the IP address into the user's data dict
        data = request.data.copy()
        data["ip_address"] = client_ip

        print(data)

        # Insert the record into the database
        serializer = PinSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
