from django.contrib.auth.decorators import permission_required
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from yamod.models import Garden, Plant, Gardener
from yamod.serializers import GardenOptionSerializer, PlantListSerializer, PlantFormSerializer, \
    GardenerOptionSerializer, GardenFormSerializer, GardenListSerializer


@swagger_auto_schema(method='GET', responses={200: GardenOptionSerializer(many=True)})
@api_view(['GET'])
def garden_option_list(request):
    gardens = Garden.objects.all()
    serializer = GardenOptionSerializer(gardens, many=True)
    return Response(serializer.data)


#swagger_auto_schema(method='GET', responses={200: GardenFormSerializer(many=True)})
#@api_view(['GET'])
#def garden_form_list(request):
 #   gardens = Garden.objects.all()
  #  serializer = GardenFormSerializer(gardens, many=True)
   # return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=GardenFormSerializer, responses={200: GardenFormSerializer()})
@api_view(['POST'])
@permission_required('yamod.add_garden', raise_exception=True)
def garden_form_create(request):
    data = JSONParser().parse(request)
    serializer = GardenFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=GardenFormSerializer, responses={200: GardenFormSerializer()})
@api_view(['PUT'])
@permission_required('yamod.change_garden', raise_exception=True)
def garden_form_update(request, pk):
    try:
        garden = Garden.objects.get(pk=pk)
    except Garden.DoesNotExist:
        return Response({'error': 'Garden does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = GardenFormSerializer(garden, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: GardenFormSerializer()})
@api_view(['GET'])
@permission_required('yamod.view_garden', raise_exception=True)
def garden_form_get(request, pk):
    try:
        garden = Garden.objects.get(pk=pk)
    except Garden.DoesNotExist:
        return Response({'error': 'Garden does not exist.'}, status=404)

    serializer = GardenFormSerializer(garden)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('yamod.delete_garden', raise_exception=True)
def garden_delete(request, pk):
    try:
        garden = Garden.objects.get(pk=pk)
    except Garden.DoesNotExist:
        return Response({'error': 'Garden does not exist.'}, status=404)
    garden.delete()
    return Response(status=204)

@swagger_auto_schema(method='GET', responses={200: GardenListSerializer(many=True)})
@api_view(['GET'])
@permission_required('yamod.view_garden', raise_exception=True)
def garden_list(request):
    garden = Garden.objects.all()
    serializer = GardenListSerializer(garden, many=True)
    return Response(serializer.data)

@swagger_auto_schema(method='GET', responses={200: PlantListSerializer(many=True)})
@api_view(['GET'])
@permission_required('yamod.view_plant', raise_exception=True)
def plant_list(request):
    plant = Plant.objects.all()
    serializer = PlantListSerializer(plant, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=PlantFormSerializer, responses={200: PlantFormSerializer()})
@api_view(['POST'])
@permission_required('yamod.add_plant', raise_exception=True)
def plant_form_create(request):
    data = JSONParser().parse(request)
    serializer = PlantFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=PlantFormSerializer, responses={200: PlantFormSerializer()})
@api_view(['PUT'])
@permission_required('yamod.change_plant', raise_exception=True)
def plant_form_update(request, pk):
    try:
        plant = Plant.objects.get(pk=pk)
    except Plant.DoesNotExist:
        return Response({'error': 'Plant does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = PlantFormSerializer(plant, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: PlantFormSerializer()})
@api_view(['GET'])
@permission_required('yamod.view_plant', raise_exception=True)
def plant_form_get(request, pk):
    try:
        plant = Plant.objects.get(pk=pk)
    except Plant.DoesNotExist:
        return Response({'error': 'Plant does not exist.'}, status=404)

    serializer = PlantFormSerializer(plant)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('yamod.delete_plant', raise_exception=True)
def plant_delete(request, pk):
    try:
        plant = Plant.objects.get(pk=pk)
    except Garden.DoesNotExist:
        return Response({'error': 'Plant does not exist.'}, status=404)
    plant.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: GardenerOptionSerializer(many=True)})
@api_view(['GET'])
def gardener_option_list(request):
    gardener = Gardener.objects.all()
    serializer = GardenerOptionSerializer(gardener, many=True)
    return Response(serializer.data)
