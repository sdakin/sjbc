from django.core import serializers
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render, render_to_response
from django.template import RequestContext

from sjbc_django.forms.bicycle_form import BicycleForm
from sjbc_django.views import get_default_context
from store.bicycle import Bicycle

def do_admin(request, path):
    if request.user.is_authenticated() and request.user.is_staff:
        if path:
            ops = path.split('/')
            if ops[0] == 'browse' and len(ops) == 2:
                return browse_records(ops[1])
            if ops[0] == 'get' and len(ops) > 1:
                return get_record(ops[1:], request)
        else:
            return render_to_response('admin.html', context=get_default_context(request))
    raise Http404

def browse_records(type):
    if type == 'bicycles':
        bikes = Bicycle.objects.values('id', 'sjbc_id', 'manufacturer', 'model')
        return JsonResponse(list(bikes), safe=False, status=200)
    raise Http404

def get_record(pathElts, request):
    if pathElts[0] == 'form' and len(pathElts) > 1:
        return get_form(pathElts[1:], request)
    if pathElts[0] == 'bicycle':
        bike = Bicycle.objects.get(id__exact=pathElts[1])
        data = serializers.serialize('json', [ bike, ])
        return HttpResponse(data, content_type='application/json', status=200)
    raise Http404

def get_form(pathElts, request):
    print "getting form..."
    if pathElts[0] == 'bicycle':
        print "getting bicycle form..."
        if len(pathElts) == 1:      # return an empty form
            raise Http404
        else:
            id = pathElts[1]
            print "getting bicycle form for id: " + id
            bicycle = Bicycle.objects.get(pk=id)
            form = BicycleForm(instance=bicycle)
            return render(request, 'basicForm.html', {'form': form})
    raise Http404
