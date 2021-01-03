from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from .serializers import AuthRegisterSerializer, UserSerializer
from .services import register_user, delete_user
from .models import User, Roles


class AuthViewset(ViewSet):

    @action(methods=['post'], detail=False, permission_classes=[], url_path='register', url_name='register')
    def register(self, request):
        serializer = AuthRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = register_user(request.data)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)

class UserViewset(ModelViewSet):
    serializer_class = UserSerializer

    @action(methods=['get'], detail=False, permission_classes=[IsAuthenticated], url_path='me', url_name='me')
    def me(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        delete_user(pk)
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        return User.objects.filter(Q(company=self.request.user.company) & Q(is_active=True) & ~Q(role=Roles.SUPER_ADMIN))
