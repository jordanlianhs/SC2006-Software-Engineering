# Generated by Django 4.1.7 on 2023-03-19 06:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pricePrediction', '0008_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='houseprice',
            name='block',
            field=models.CharField(max_length=8, verbose_name='block'),
        ),
        migrations.AlterField(
            model_name='houseprice',
            name='floor_area_sqm',
            field=models.FloatField(blank=True, verbose_name='floor_area_sqm'),
        ),
        migrations.AlterField(
            model_name='houseprice',
            name='lease_commence_date',
            field=models.FloatField(blank=True, verbose_name='lease_commence_date'),
        ),
        migrations.AlterField(
            model_name='houseprice',
            name='resale_price',
            field=models.FloatField(blank=True, verbose_name='resale_price'),
        ),
    ]