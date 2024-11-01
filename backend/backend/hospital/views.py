from django.contrib.auth import authenticate
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import User, Doctor, Patient, Prescription, Appointment
from .serializer import UserSerializer, PatientSerializer, DoctorSerializer, PrescriptionSerializer, AppointmentSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=user.id)

    def get_permissions(self):
        if self.action in ['create', 'list']:
            self.permission_classes = [permissions.AllowAny]
        return super(UserViewSet, self).get_permissions()
    

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [AllowAny]

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [AllowAny]

class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_class = [AllowAny]

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_class = [AllowAny]

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            doctor_id = None
            patient_id = None

            if user.is_doctor:
                doctor = Doctor.objects.filter(user=user).first()
                doctor_id = doctor.id if doctor else None

            if user.is_patient:
                patient = Patient.objects.filter(user=user).first()
                patient_id = patient.id if patient else None

            return Response({
                "message": "Login successful",
                "user_id": user.id,
                "username": user.username,
                "is_patient": user.is_patient,
                "is_doctor": user.is_doctor,
                "doctor_id": doctor_id,
                "patient_id": patient_id
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error", "Invalid username or password"}, status.status.HTTP_400_BAD_REQUEST)