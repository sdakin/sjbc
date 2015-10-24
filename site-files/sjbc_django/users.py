from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect

def do_login(request):
    result = 401    # default is to return an 'invalid login' error message
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            result = 200    # indicate success!
        else:
            result = 403    # return a 'disabled account' error message
    return HttpResponse(status=result)

def do_logout(request):
    logout(request)
    return HttpResponseRedirect('/')
