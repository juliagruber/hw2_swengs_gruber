# Generated by Django 3.0.2 on 2020-01-11 17:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Garden',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('size', models.PositiveIntegerField(help_text='in square meter')),
                ('location', models.TextField()),
                ('inuse', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Gardener',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.TextField()),
                ('last_name', models.TextField()),
                ('year_of_birth', models.IntegerField()),
                ('gender', models.CharField(choices=[('w', 'Woman'), ('m', 'Man'), ('d', 'Divers')], max_length=1, null=True)),
                ('ssn', models.PositiveIntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Plant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('color', models.TextField()),
                ('seeded_at', models.DateField()),
                ('regional', models.BooleanField(default=True)),
                ('type', models.CharField(choices=[('ve', 'Vegetable'), ('fr', 'Fruit'), ('fl', 'Flower')], max_length=2)),
                ('quantity', models.PositiveIntegerField()),
                ('garden', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='yamod.Garden')),
                ('gardener', models.ManyToManyField(blank=True, to='yamod.Gardener')),
            ],
        ),
        migrations.AddField(
            model_name='garden',
            name='gardener_name',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='yamod.Gardener'),
        ),
    ]
