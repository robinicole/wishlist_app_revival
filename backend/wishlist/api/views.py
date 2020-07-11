from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework import mixins
from django.db.models import Q

from api.models import Gifts
from api.serializers import GiftSerializer, GiftToOfferSerializer, UserSerializer, UserSerializerWithPwd
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework import status, serializers
from rest_framework.decorators import api_view
from django.contrib.auth.models import User



@api_view(['POST'])
def create_auth(request):
    serialized = UserSerializerWithPwd(data=request.data)
    if serialized.is_valid():
        get_user_model().objects.create_user(
            serialized.data['username'],
            serialized.data['email'],
            serialized.data['password']
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

class UsersViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    """
    Use this view to create and delete gifts from your wishlist
    GET -> get this list of gift you want
    GET /pk/ Retrieve a gift if it is yours
    DELETE /pk/ -> delete gift pk
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class MyGiftsViewSet(viewsets.ModelViewSet):
    """
    Use this view to create and delete gifts from your wishlist
    GET -> get this list of gift you want
    GET /pk/ Retrieve a gift if it is yours
    DELETE /pk/ -> delete gift pk
    """
    serializer_class = GiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.gifts.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class GiftsWishlistViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
    ):
    """
    Class to retrieve the list of gifts available to be offered
    """
    serializer_class = GiftToOfferSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Gifts.objects.exclude(owner=self.request.user).all()
        
    def list(self, request, project_pk=None):
        serializer = self.serializer_class(self.get_queryset(), many=True, context={'request': request})
        return Response(serializer.data)
    
    def partial_update(self, request, pk=None, project_pk=None):
        """
        Offer a gift synthax PATCH /api/wishlists/{pk}
        TODO: add a field offered by me
        """
        gift = Gifts.objects.get(pk=pk)
        if gift.owner == request.user:
            return Response({"error": "you cannot offer a gift to yourself"}, status=404)
        if gift.offered_by is not None:
            return Response({"error": "ALREADY OFFERED"}, status=404)
        serialized_gift = GiftToOfferSerializer(gift, data=request.data, partial=True, context={'request': request})
        serialized_gift.is_valid()
        serialized_gift.save(offered_by=request.user)
        return Response(serialized_gift.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None, project_pk=None):
        """
        Stop offering a gift DELETE /wishlists/{pk}
        """
        gift = Gifts.objects.get(pk=pk)
        serialized_gift = GiftToOfferSerializer(gift, data=request.data, partial=True, context={'request': request})
        serialized_gift.is_valid()
        serialized_gift.save(offered_by=None)
        return Response(serialized_gift.data, status=status.HTTP_200_OK)