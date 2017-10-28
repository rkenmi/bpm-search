from django.core.validators import MinValueValidator
from django.db import models

# Create your models here.


class VehicleMake(models.Model):
    make_id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=70)


class AbstractVehicleModel(models.Model):
    # make = models.ForeignKey(VehicleMake, on_delete=models.CASCADE)
    make = models.ManyToManyField(VehicleMake)

    class Meta:
        abstract = True


class VehicleModel(AbstractVehicleModel):
    model_id = models.PositiveIntegerField(primary_key=True)
    model_name = models.CharField(max_length=70)


class Car(models.Model):
    car_id = models.UUIDField(primary_key=True, editable=False)
    year = models.PositiveIntegerField(validators=[MinValueValidator(1995)])
    make = models.ForeignKey(VehicleMake, on_delete=models.CASCADE)
    model = models.ForeignKey(VehicleModel, on_delete=models.CASCADE)


