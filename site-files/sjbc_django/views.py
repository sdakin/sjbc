from django.shortcuts import render_to_response
from django.http import HttpResponse, Http404
from django.template import RequestContext
from django.views.decorators.csrf import ensure_csrf_cookie
from store.bicycle import Bicycle

def get_profile_name(request):
    if request.user.is_authenticated():
        return request.user.first_name or request.user.username or "<user>"
    return ""

def get_default_context(request):
    return RequestContext(request, {'profile_name': get_profile_name(request)})


# ---- Top-level navigation view handlers ----
@ensure_csrf_cookie
def about(request):
    return render_to_response('about.html', context=get_default_context(request))

@ensure_csrf_cookie
def store(request):
    return render_to_response('store.html', context=get_default_context(request))

@ensure_csrf_cookie
def getInvolved(request):
    return render_to_response('getInvolved.html', context=get_default_context(request))

@ensure_csrf_cookie
def donate(request):
    return render_to_response('donate.html', context=get_default_context(request))

@ensure_csrf_cookie
def do_admin(request):
    if request.user.is_authenticated() and request.user.is_staff:
        return render_to_response('admin.html', context=get_default_context(request))
    raise Http404


# ---- debugging
def db_test(request):
	bike = Bicycle(manufacturer='Specialized', model='Crossroads')
	bike.save()
	return HttpResponse("db_test done")
