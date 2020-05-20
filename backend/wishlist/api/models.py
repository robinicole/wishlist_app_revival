from django.db import models
from django.contrib.auth.models import User


class Gifts(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User, related_name="gifts", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    offered_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='offered_by', default=None, blank=True, null=True)

    def __str__(self):
        return self.task

    class Meta:
        ordering = ['created_at']
