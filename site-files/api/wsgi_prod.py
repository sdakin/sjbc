"""
WSGI config for sjbc_django project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os, sys

from django.core.wsgi import get_wsgi_application

curdir = os.path.dirname(__file__)
projectdir = os.path.dirname(curdir)
sys.path.append(projectdir)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sjbc_django.settings_prod")

application = get_wsgi_application()
