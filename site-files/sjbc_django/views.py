from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import RequestContext
from store.bicycle import Bicycle

def get_profile_name(request):
    if request.user.is_authenticated():
        return request.user.first_name or request.user.username or "<user>"
    return ""

def get_default_context(request):
    return RequestContext(request, {'profile_name': get_profile_name(request)})


# ---- Top-level navigation view handlers ----
def about(request):
    return render_to_response('about.html', context=get_default_context(request))

def store(request):
    return render_to_response('store.html', context=get_default_context(request))

def getInvolved(request):
    return render_to_response('getInvolved.html', context=get_default_context(request))

def donate(request):
    return render_to_response('donate.html', context=get_default_context(request))


# ---- debugging
def db_test(request):
	bike = Bicycle(manufacturer='Specialized', model='Crossroads')
	bike.save()
	return HttpResponse("db_test done")
