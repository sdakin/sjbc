from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render, render_to_response
import datetime

def hello(request):
    return HttpResponse("Hello world")

def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)

def about(request):
    context = {'app_css': settings.WEB_DIR + "/xlib/tbs/css/bootstrap.min.css"}
    return render_to_response('about.html', context)