import csv
from django.core.management import BaseCommand

from project.car.models import Make


class Command(BaseCommand):
    help = 'Load all car Makes from a csv file'

    def add_arguments(self, parser):
        parser.add_argument('filename', nargs='+')

    def handle(self, *args, **options):

        def load_csv(filename):
            with open(filename) as csvfile:
                car_reader = csv.reader(csvfile, delimiter=',')
                next(car_reader)
                for line in car_reader:
                    m = Make()
                    m.make_id = int(line[0])
                    m.name = line[1]
                    m.save()

        load_csv(options.get('filename')[0])
        self.stdout.write("Makes loaded")
