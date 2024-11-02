from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PatientViewSet, DoctorViewSet, PrescriptionViewSet, AppointmentViewSet, LoginView, GetPatientIDView, PatientAppointmentsByPostView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'prescriptions', PrescriptionViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('get-patient-id/<str:username>/<str:email>/', GetPatientIDView.as_view(), name='get-patient-id'),
    path('appointment/by-patient/', PatientAppointmentsByPostView.as_view(), name='appointments-by-patient')
]
