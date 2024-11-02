from django.contrib.auth import authenticate
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import User, Doctor, Patient, Prescription, Appointment
from .serializer import UserSerializer, PatientSerializer, DoctorSerializer, PrescriptionSerializer, AppointmentSerializer, AppointmentSerializer2
from django.db.models import Q

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
    permission_classes = [AllowAny]

    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        if patient_id:
            return Prescription.objects.filter(patient_id=patient_id)
        return super().get_queryset()

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        if patient_id:
            return Appointment.objects.filter(patient_id=patient_id)
        return super().get_queryset()
    
class PatientAppointmentsView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        patientId = request.data.get('patient_id')

        appointments = Appointment.objects.filter(patient_id=patientId)

class PatientAppointmentsByPostView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        patient_id = request.data.get('patient_id')
        if not patient_id:
            return Response({"error": "patient_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        appointments = Appointment.objects.filter(patient_id=patient_id)
        serializer = AppointmentSerializer2(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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

class GetPatientIDView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username, email, *args, **kwargs):
        try:
            # Use `iexact` for a case-insensitive match on the username
            user = User.objects.get(Q(username__iexact=username) & Q(email__iexact=email))
            # Check if the user has a Patient profile
            patient = Patient.objects.filter(user=user).first()
            if patient:
                return Response({"patient_id": patient.id}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User is not a patient"}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)