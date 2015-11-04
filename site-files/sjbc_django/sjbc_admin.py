from django.core import serializers
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
import uuid

from sjbc_django.forms.bicycle_form import BicycleForm
from sjbc_django.forms.member_form import MemberForm
from sjbc_django.forms.signup_form import SignUpForm
from sjbc_django.views import get_default_context
from membership.sjbcMember import SjbcMember
from store.bicycle import Bicycle

def do_kiosk(request, path):
    form = None
    context = { 'hide_banner': True }
    if path:
        if path.startswith("get/form/signup"):
            form = SignUpForm()
            context = { 'form': form, 'submit_url': '/kiosk/signup/' }
        elif path.startswith("signup"):
            return signup_member(request)

    if form:
        return render(request, 'basicForm.html', context)

    return render_to_response('kiosk.html', context)

def do_admin(request, path):
    if request.user.is_authenticated() and request.user.is_staff:
        if path:
            # use a filter to omit empty path elements
            ops = filter(lambda a: a != '', path.split('/'))
            if ops[0] == 'browse' and len(ops) == 2:
                return browse_records(ops[1])
            if ops[0] == 'get' and len(ops) > 1:
                return get_record(ops[1:], request)
            if ops[0] == 'save' and len(ops) > 1:
                return save_record(ops[1:], request)
        else:
            return render_to_response('admin.html', context=get_default_context(request))
    raise Http404

def browse_records(type):
    if type == 'bicycles':
        bikes = Bicycle.objects.values('id', 'sjbc_id', 'manufacturer', 'model')
        return JsonResponse(list(bikes), safe=False, status=200)
    raise Http404

def get_record(pathElts, request):
    if pathElts[0] == 'members':
        return get_members(pathElts[1:], request)
    if pathElts[0] == 'form' and len(pathElts) > 1:
        return get_form(pathElts[1:], request)
    if pathElts[0] == 'bicycle':
        bike = Bicycle.objects.get(id__exact=pathElts[1])
        data = serializers.serialize('json', [ bike, ])
        return HttpResponse(data, content_type='application/json', status=200)
    raise Http404

def get_form(pathElts, request):
    form = None
    context = {}
    if pathElts[0] == 'bicycle':
        if len(pathElts) == 1:      # return an empty form
            form = BicycleForm()
        else:
            id = pathElts[1]
            bicycle = Bicycle.objects.get(pk=id)
            form = BicycleForm(instance=bicycle)
        context = {'form': form, 'submit_url': '/sjbc_admin/save/bicycle/'}
    elif pathElts[0] == 'member':
        if len(pathElts) == 1:      # return an empty form
            form = MemberForm()
        else:
            id = pathElts[1]
            member = SjbcMember.objects.get(pk=id)
            form = MemberForm(instance=member)
        context = {'form': form, 'submit_url': '/sjbc_admin/save/member/'}

    if form:
        return render(request, 'basicForm.html', context)
    raise Http404

def get_members(pathElts, request):
    members = SjbcMember.objects.values('id', 'first_name', 'last_name', 'email', 
                                        'username', 'waiver_signed')
    return JsonResponse(list(members), safe=False, status=200)

def save_record(pathElts, request):
    if pathElts[0] == 'bicycle':
        return save_bicycle(pathElts[1:], request)
    if pathElts[0] == 'member':
        return save_member(pathElts[1:], request)
    raise Http404

def save_bicycle(pathElts, request):
    form = None
    result = 400
    if len(pathElts) == 0:
        form = BicycleForm(request.POST)
    else:
        bike = Bicycle.objects.get(pk=pathElts[0])
        if bike == None:
            raise Http404
        else:
            form = BicycleForm(request.POST, instance=bike)
    if form.is_valid():
        form.save()
        result = 200
    else:
        print "form is not valid"

    return HttpResponse(status=result)

def save_member(pathElts, request):
    form = None
    result = 400
    if len(pathElts) == 0:
        print "insert new member"
        print request.POST
        form = MemberForm(request.POST)
    else:
        print "update member with id: " + pathElts[0]
        member = SjbcMember.objects.get(pk=pathElts[0])
        if member == None:
            raise Http404
        else:
            form = MemberForm(request.POST, instance=member)
    if form.is_valid():
        form.save()
        result = 200
    else:
        print "form is not valid"

    return HttpResponse(status=result)

def signup_member(request):
    result = 400
    print request.POST
    params = request.POST.copy()
    params['username'] = uuid.uuid4().hex[:30]
    print params
    form = SignUpForm(params)
    if form.is_valid():
        form.save()
        result = 200
    else:
        print "form is not valid"
        print form.errors

    return HttpResponse(status=result)
