from django.db import models
from django.contrib.auth.models import PermissionsMixin, BaseUserManager, AbstractBaseUser

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, name=None, **extra_fields):
        if not email:
            raise ValueError('メールアドレスは必須です。')
        email = self.normalize_email(email)

        user = self.model(email=email, name=name, **extra_fields)

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name='メールアドレス')
    name = models.CharField(
        max_length=150,
        default='',
        blank=True,
        verbose_name='名前'
    )
    is_active = models.BooleanField(default=True, verbose_name='アクティブ')
    is_staff = models.BooleanField(default=False, verbose_name='スタッフ')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']  # nameを必須フィールドに

    class Meta:
        verbose_name = 'ユーザー'
        verbose_name_plural = 'ユーザー'

    def __str__(self):
        return self.email
