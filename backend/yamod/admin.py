from django.contrib import admin
from .models import *

class PlantAdmin(admin.ModelAdmin):

    list_filter = ( 'garden__name', )


class GardenerAdmin(admin.ModelAdmin): pass


class GardenAdmin(admin.ModelAdmin): pass


admin.site.register(Plant,PlantAdmin)
admin.site.register(Gardener,GardenerAdmin)
admin.site.register(Garden,GardenAdmin)

