from django.shortcuts import render_to_response
from django.http import HttpResponse
from store.bicycle import Bicycle

def about(request):
    return render_to_response('about.html')

def store(request):
    return render_to_response('store.html')

def getInvolved(request):
    return render_to_response('getInvolved.html')

def donate(request):
    return render_to_response('donate.html')

def db_test(request):
	bike = Bicycle(manufacturer='Specialized', model='Crossroads')
	bike.save()
	return HttpResponse("db_test done")
