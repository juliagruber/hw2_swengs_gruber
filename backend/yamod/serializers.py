from rest_framework import serializers
from .models import Garden, Plant, Gardener


class GardenFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Garden
        fields = '__all__'


class GardenOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Garden
        fields = ['id', 'name']

class GardenListSerializer(serializers.ModelSerializer):
    gardener_name = serializers.SerializerMethodField()

    class Meta:
        model = Garden
        fields = ['id', 'name', 'size', 'gardener_name']


    def get_gardener_name(self, obj):
        return obj.gardener_name.last_name if obj.gardener_name else ''

class PlantListSerializer(serializers.ModelSerializer):
    garden_name = serializers.SerializerMethodField()

    class Meta:
        model = Plant
        fields = ['id', 'name', 'type', 'garden_name']

    def get_garden_name(self, obj):
        return obj.garden.name if obj.garden else ''


class PlantFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'


class GardenerOptionSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Gardener
        fields = ['id', 'name']

    def get_name(self, obj):
        return ' '.join(filter(None, (obj.first_name, obj.last_name)))
