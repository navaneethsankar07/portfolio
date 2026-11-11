from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    ProfileView,
    SkillListView,
    ProjectListView,
    ProjectDetailView,
    ExperienceListView,
    ArticleListView,
    ArticleDetailView,
    ContactMessageCreateView,
    RecordVisitView,
    PublicStatsView,
    AdminCurrentUserView,
    AdminDashboardStatsView,
    AdminProfileUpdateView,
    AdminSkillViewSet,
    AdminProjectViewSet,
    AdminExperienceViewSet,
    AdminArticleViewSet,
    AdminMessageViewSet,
)

router = DefaultRouter()
router.register(r'admin/skills', AdminSkillViewSet, basename='admin-skills')
router.register(r'admin/projects', AdminProjectViewSet, basename='admin-projects')
router.register(r'admin/experiences', AdminExperienceViewSet, basename='admin-experiences')
router.register(r'admin/articles', AdminArticleViewSet, basename='admin-articles')
router.register(r'admin/messages', AdminMessageViewSet, basename='admin-messages')

urlpatterns = [
    # Auth
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', AdminCurrentUserView.as_view(), name='admin_current_user'),

    # Public Endpoints
    path('profile/', ProfileView.as_view(), name='profile'),
    path('skills/', SkillListView.as_view(), name='skills'),
    path('projects/', ProjectListView.as_view(), name='projects'),
    path('projects/<slug:slug>/', ProjectDetailView.as_view(), name='project_detail'),
    path('experiences/', ExperienceListView.as_view(), name='experiences'),
    path('articles/', ArticleListView.as_view(), name='articles'),
    path('articles/<slug:slug>/', ArticleDetailView.as_view(), name='article_detail'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact'),
    path('analytics/visit/', RecordVisitView.as_view(), name='record_visit'),
    path('stats/', PublicStatsView.as_view(), name='public_stats'),

    # Admin Dashboard Endpoints
    path('admin/dashboard/stats/', AdminDashboardStatsView.as_view(), name='admin_dashboard_stats'),
    path('admin/profile/', AdminProfileUpdateView.as_view(), name='admin_profile_update'),

    # Admin Router CRUD
    path('', include(router.urls)),
]

