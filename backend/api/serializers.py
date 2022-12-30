from rest_framework import serializers
from .models import Video
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email','password']
				# パスワードは書込のみ可
        extra_kwargs = {'password': {'write_only': True, 'required': True, 'min_length': 5}}

		#ユーザ作成時にトークンを自動生成させる
    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

class VideoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = ['id','title','video','img','like','dislike']