# from django.shortcuts import render
# from rest_framework import viewsets, permissions
# from .models import Question
# from .serializers import QuestionSerializer

# class QuestionViewSet(viewsets.ModelViewSet):
#     queryset = Question.objects.all().order_by('-created_at')
#     serializer_class = QuestionSerializer
#     # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
#     permission_classes = [permissions.AllowAny]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# from rest_framework import viewsets, permissions, generics
# from .models import Question
# from .serializers import QuestionSerializer
# from django.contrib.auth.models import User
# from rest_framework.serializers import ModelSerializer

# class QuestionViewSet(viewsets.ModelViewSet):
#     queryset = Question.objects.all().order_by('-created_at')
#     serializer_class = QuestionSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def perform_create(self, serializer):
#         print("Saving with user:", self.request.user)
#         serializer.save(user=self.request.user)


# # Register API
# class RegisterSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         return User.objects.create_user(**validated_data)

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer

from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from .models import Question
from .serializers import QuestionSerializer


# ---------------------- Registration ----------------------
class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


# ---------------------- Question Creation ----------------------
class QuestionCreateView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}


class QuestionListCreateView(generics.ListCreateAPIView):
    queryset = Question.objects.all().order_by('-id')  # newest first
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}
