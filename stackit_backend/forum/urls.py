# from django.urls import path
# from rest_framework.routers import DefaultRouter
# from .views import QuestionViewSet, RegisterView

# router = DefaultRouter()
# router.register(r'questions', QuestionViewSet)

# # ✅ Define urlpatterns first
# urlpatterns = router.urls

# # ✅ Then add more to it
# urlpatterns += [
#     path('auth/register/', RegisterView.as_view(), name='register'),
# ]


from django.urls import path
from .views import RegisterView, QuestionCreateView,QuestionListCreateView


    


urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('questions/', QuestionCreateView.as_view(), name='create-question'),
    path('questions/get', QuestionListCreateView.as_view(), name='list-create-question'),

]