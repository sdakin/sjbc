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
    return render_to_response('about.html')

def store(request):
    return render_to_response('store.html')

def getInvolved(request):
    return render_to_response('getInvolved.html')
