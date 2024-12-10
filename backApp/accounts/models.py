from django.db import models
from django.contrib.auth.models import PermissionsMixin, BaseUserManager, AbstractBaseUser

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, name=None, **extra_fields):
        """
        通常のユーザーを作成する
        """
        if not email:
            raise ValueError('メールアドレスは必須です')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, name=None, **extra_fields):
        """
        スーパーユーザーを作成する
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not extra_fields.get('is_staff'):
            raise ValueError('スーパーユーザーはis_staff=Trueである必要があります。')
        if not extra_fields.get('is_superuser'):
            raise ValueError('スーパーユーザーはis_superuser=Trueである必要があります。')

        return self.create_user(email, password, name, **extra_fields)

# カスタムユーザーモデル
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name='メールアドレス')
    name = models.CharField(
        max_length=150, 
        verbose_name='名前',
        default='',  # デフォルト値を空文字列に設定
        blank=True   # フォームでの入力を任意に
    )
    is_active = models.BooleanField(default=True, verbose_name='アクティブ')
    is_staff = models.BooleanField(default=False, verbose_name='スタッフ')
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']  # nameは必須フィールドとして維持

    class Meta:
        verbose_name = 'ユーザー'
        verbose_name_plural = 'ユーザー'

    def __str__(self):
        return self.email
