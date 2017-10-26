from django.db import models

# Create your models here.


class Make(models.Model):
    make_id = models.PositiveIntegerField()
    name = models.CharField(max_length=70)


class AbstractCar(models.Model):
    make = models.ForeignKey(Make, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Car(AbstractCar):
    model_id = models.PositiveIntegerField()
    model_name = models.CharField(max_length=70)
