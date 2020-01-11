from django.db import models

class Gardener(models.Model):

    CHOICES = (
        ('w' , 'Woman'),
        ('m' , 'Man'),
        ('d' , 'Divers'),
    )

    first_name = models.TextField()
    last_name = models.TextField()
    year_of_birth = models.IntegerField()
    gender = models.CharField(max_length=1,choices=CHOICES, null=True)
    ssn = models.PositiveIntegerField(null=True)

    def __str__(self):
        return '%s %s (%s)' % (self.first_name, self.last_name, self.year_of_birth)


class Garden(models.Model):
    name = models.TextField()
    size = models.PositiveIntegerField(help_text="in square meter")
    location = models.TextField()
    gardener_name = models.ForeignKey(Gardener, on_delete=models.CASCADE, null=True)
    inuse = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Plant(models.Model):

    CHOICES = (
        ('ve' , 'Vegetable'),
        ('fr' , 'Fruit'),
        ('fl' , 'Flower'),
    )

    name = models.TextField()
    color = models.TextField()
    garden = models.ForeignKey(Garden,on_delete=models.CASCADE)
    seeded_at = models.DateField()
    regional = models.BooleanField(default=True)
    type = models.CharField(max_length=2,choices=CHOICES)
    gardener = models.ManyToManyField('Gardener', blank=True)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return self.name


