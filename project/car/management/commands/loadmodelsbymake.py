import codecs
import csv
from contextlib import closing

import requests
from django.core.management import BaseCommand
import logging
from project.car.models import Make, Car

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Load all car models by make'

    def handle(self, *args, **options):

        api_url = 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/{}?format=csv'

        def load_car_models(make):
            with closing(requests.get(api_url.format(make.name), stream=True)) as r:
                #  decode bytes to unicode so the csv reader can understand it
                cr = csv.reader(codecs.iterdecode(r.iter_lines(), 'utf-8'), delimiter=',')

                next(cr)  # skip line 1 in csv
                for row in cr:
                    if not row or len(row) < 4:
                        continue

                    car = Car.objects.get_or_create(
                        model_id=int(row[2]),
                        make_id=make.make_id,
                        model_name=row[3],
                    )


        try:
            Make.objects.get(make_id=474)
        except Make.DoesNotExist:
            logger.error("Please fill up the Make models by running `python manage.py loadmakes` before running.")
            self.stderr.write("Please fill up the Make models by running `python manage.py loadmakes` before running.")
            return

        for m in Make.objects.all():
            logger.debug(m.name)
            load_car_models(m)

        self.stdout.write("Models loaded")
