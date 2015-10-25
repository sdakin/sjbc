"""sjbc_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from sjbc_django.views import about, store, getInvolved, donate, db_test
from sjbc_django.users import do_login, do_logout
from sjbc_django.sjbc_admin import do_admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^user/login/$', do_login),
    url(r'^user/logout/$', do_logout),

    url(r'^about/$', about),
    url(r'^store/$', store),
    url(r'^getInvolved/$', getInvolved),
    url(r'^donate/$', donate),

    url(r'^sjbc_admin/([a-z0-9/]*)$', do_admin),
    url(r'^dbtest/$', db_test),
    url(r'^$', about),
]
