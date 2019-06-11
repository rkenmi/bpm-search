import codecs
import csv
from contextlib import closing

import requests
from django.core.management import BaseCommand

from project.tracks.models import VehicleMake


class Command(BaseCommand):
    help = 'Load all car Makes from a csv file'

    def handle(self, *args, **options):

        # api_url = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
        api_url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/{}?format=json"

        def load_car_makes(vehicle):
            resp = requests.get(api_url.format(vehicle))
            jsonobj = resp.json()

            if resp.status_code != 200:
                self.stderr.write("Invalid Response: {}".format(resp.status_code))
                return

            for row in jsonobj.get('Results'):
                m = VehicleMake.objects.get_or_create(
                    make_id=int(row['MakeId']),
                    name=row['MakeName'].strip(),
                )

            self.stdout.write("{} Makes loaded into database".format(vehicle))

        load_car_makes('car')
        load_car_makes('truck')
