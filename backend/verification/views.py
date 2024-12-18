from django.shortcuts import render

# Create your views here.
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserVerification
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Django app!")

@api_view(["POST"])
def submit_verification(request):
    data = request.data
    user = UserVerification.objects.create(
        first_name=data["first_name"],
        last_name=data["last_name"],
        institution_name=data["institution_name"],
        institution_address=data["institution_address"],
        role=data["role"],
        email=data["email"],
    )
    return Response({"message": "Verification request submitted successfully."})

@api_view(["GET"])
def get_users(request):
    users = UserVerification.objects.filter(is_verified=False)
    return Response([
        {
            "id": user.id,
            "name": f"{user.first_name} {user.last_name}",
            "institution": user.institution_name,
            "role": user.role,
            "email": user.email,
        }
        for user in users
    ])
    
@api_view(["POST"])
def is_verified(request):
    email = request.data.get("email")
    try:
        user = UserVerification.objects.get(email=email)
        return Response({"is_verified": user.is_verified})
    except UserVerification.DoesNotExist:
        return Response({"is_verified": False})

@api_view(["POST"])
def approve_user(request, user_id):
    user = UserVerification.objects.get(id=user_id)
    user.is_verified = True
    user.save()

    # Send approval email
    send_mail(
        subject="Verification Approved",
        message=f"Hello {user.first_name}, your verification is approved. Please register here: www.haske.online/register",
        from_email=None,
        recipient_list=[user.email],
    )
    return Response({"message": "User approved successfully."})
