from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render_to_response
from django.template import RequestContext

from sjbc_django.views import get_default_context
from store.bicycle import Bicycle

def do_admin(request, path):
    if request.user.is_authenticated() and request.user.is_staff:
        if path:
            ops = path.split('/', 1)
            if ops[0] == 'browse':
                return browse_records(ops[1])
        else:
            return render_to_response('admin.html', context=get_default_context(request))
    raise Http404

def browse_records(type):
    if type == 'bicycles':
        bikes = Bicycle.objects.values('id', 'sjbc_id', 'manufacturer', 'model')
        return JsonResponse(list(bikes), safe=False, status=200)
    raise Http404
