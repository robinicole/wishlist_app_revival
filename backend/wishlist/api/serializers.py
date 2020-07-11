
from api.models import Gifts
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class UserSerializerWithPwd(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class GiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gifts
        fields = '__all__'


class MyGiftSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Gifts
        fields = ['pk', 'created_at', 'name']


class GiftToOfferSerializer(serializers.HyperlinkedModelSerializer):
    """
    Merge the two views to
    """
    owner = UserSerializer()
    offered_by = UserSerializer()
    state = serializers.SerializerMethodField()

    def get_state(self, model):
        if model.offered_by == None:
            return 'NOT OFFERED'
        elif model.offered_by == self.context['request'].user:
            return 'OFFERED BY ME'
        return 'OFFERED BY SOMEBODY_ELSE'

    def validate(self, attrs):
        return attrs

    class Meta:
        model = Gifts
        fields = ('pk', 'name', 'owner', 'state', 'offered_by')
