from django.urls import path, include
from rest_framework import routers

from . import views


urlpatterns = [
    path("", views.ApiRoot.as_view(), name="api-root"),
    path(r"categories/", views.CategoryList.as_view(), name="category-list"),
    path(
        r"categories/<int:category_id>",
        views.CategoryDetail.as_view(),
        name="category-detail",
    ),
    path(
        r"categories/<int:category_id>/nominations",
        views.NominationList.as_view(),
        name="nomination-list",
    ),
    path(
        r"categories/<int:category_id>/nominations/<int:nomination_id>",
        views.NominationDetail.as_view(),
        name="nomination-detail",
    ),
]
