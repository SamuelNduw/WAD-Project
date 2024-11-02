from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Patient, Doctor, Prescription, Appointment

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_patient',
            'is_doctor',
            'date_joined',
            'password',
        ]
        read_only_fields = ['id', 'date_joined']
        extra_kwargs = {'password': {'write_only': True}}  # Make password write-only

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)  # Hash the password
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)  # Hash the password if provided
        instance.save()
        return instance

class PatientSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Patient
        fields = ['id', 'user', 'date_of_birth', 'address', 'phone_number', 'medical_history']

    def create(self, validated_data):
        patient = Patient.objects.create(**validated_data)
        return patient
    
    def update(self, instance, validated_data):
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.address = validated_data.get('address', instance.address)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.medical_history = validated_data.get('medical_history', instance.medical_history)

        instance.save()
        return instance

class DoctorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Doctor
        fields = ['id', 'user', 'specialization', 'license_number', 'contact_number']

    def create(self, validated_data):
        doctor = Doctor.objects.create(**validated_data)
        return doctor

    def update(self, instance, validated_data):
        instance.specialization = validated_data.get('specialization', instance.specialization)
        instance.license_number = validated_data.get('license_number', instance.license_number)
        instance.contact_number = validated_data.get('contact_number', instance.contact_number)

        instance.save()
        return instance

class DoctorInfoSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    class Meta:
        model = Doctor
        fields = ['first_name', 'last_name']

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['id', 'doctor', 'patient', 'medication_name', 'dosage', 'instructions', 'date_issued']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'patient', 'appointment_date', 'reason_for_visit', 'status']

class AppointmentSerializer2(serializers.ModelSerializer):
    doctor_info = DoctorInfoSerializer(source='doctor', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'doctor_info', 'patient', 'appointment_date', 'reason_for_visit', 'status']
