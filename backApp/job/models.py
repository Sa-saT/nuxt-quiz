from django.db import models
from django.contrib.auth.models import User


class Quiz(models.Model):
    question_id = models.AutoField(primary_key=True)  # 問題ID番号
    question_text = models.TextField()  # 問題文
    option_a = models.CharField(max_length=255)  # 選択肢A
    option_b = models.CharField(max_length=255)  # 選択肢B
    option_c = models.CharField(max_length=255)  # 選択肢C
    option_d = models.CharField(max_length=255)  # 選択肢D
    correct_answer = models.CharField(max_length=1)  # 正解の選択肢（A, B, C, D）
    times_asked = models.PositiveIntegerField(default=0)  # 出題回数
    correct_rate = models.FloatField(default=0.0)  # 正解率

    def __str__(self):
        return self.question_text