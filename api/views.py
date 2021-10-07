from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import PinSerializer, UserSerializer, GroupSerializer, PinGeoSerializer
from pins.models import Pin


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


@api_view(["POST"])
def add_pin(request):
    if request.method == "POST":
        serializer = PinSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
