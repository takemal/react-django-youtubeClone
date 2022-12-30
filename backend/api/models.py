from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

def load_path_video(instance, filename):
    return '/'.join(['video', str(instance.title)+str(".mp4")])

def load_path_img(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['images', str(instance.title)+str(".")+str(ext)])

# 本来はusernameとpassword認証だが、emailとpasswordの場合は書き換える必要あり
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
				#emailがない場合は、必須エラー表示
        if not email:
            raise ValueError('email is must')
				#emailを正規化(小文字化)
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using= self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    # idはuuidを使用
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    email = models.EmailField(max_length=50, unique=True)
    # usernameは任意
    username = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

class Video(models.Model):
    id = models.UUIDField(default=uuid.uuid4,primary_key=True, editable=False)
    title = models.CharField(max_length=30, blank=False)
    video = models.FileField(blank=False, upload_to=load_path_video)
    img = models.ImageField(blank=False,  upload_to=load_path_img)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)

    def __str__(self):
        return self.title