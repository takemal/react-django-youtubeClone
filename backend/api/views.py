from rest_framework import generics,viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from .serializers import VideoSerializer, UserSerializer
from .models import Video

#登録(POST)。
class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
