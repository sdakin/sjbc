from django.shortcuts import render_to_response
from django.http import HttpResponse
from sjbc_django.models.store import Bike

def about(request):
    return render_to_response('about.html')

def store(request):
    return render_to_response('store.html')

def getInvolved(request):
    return render_to_response('getInvolved.html')

def donate(request):
    return render_to_response('donate.html')

def db_test(request):
	bike = Bike(title='Blue/Black BMX Shogun', description='Front wheel with radial spokes. 20" wheels. Ideal for 19"-25" inseam', price=80.00, thumbnail='00606_fbUSz2LVlV4.jpg', image='00606_fbUSz2LVlV4.jpg')
	bike.save()
	return HttpResponse("db_test done")
