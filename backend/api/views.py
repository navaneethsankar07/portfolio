import hashlib
from datetime import timedelta
from django.utils import timezone
from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile, Skill, Project, Experience, Article, ContactMessage, VisitorStat
from .serializers import (
    ProfileSerializer,
    SkillSerializer,
    ProjectSerializer,
    ExperienceSerializer,
    ArticleSerializer,
    ContactMessageSerializer,
    ContactMessageAdminSerializer,
    VisitorStatSerializer,
)


# ==========================================
# PUBLIC API VIEWS (Pure DB Querying)
# ==========================================

class ProfileView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response(
                {"error": "Profile not configured in database yet"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class SkillListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        category = request.query_params.get('category', None)
        queryset = Skill.objects.all()
        if category and category != 'all':
            queryset = queryset.filter(category=category)
        serializer = SkillSerializer(queryset, many=True)
        return Response(serializer.data)


class ProjectListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        category = request.query_params.get('category', None)
        featured = request.query_params.get('featured', None)
        queryset = Project.objects.all()
        if category and category != 'all':
            queryset = queryset.filter(category=category)
        if featured == 'true':
            queryset = queryset.filter(featured=True)
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)


class ProjectDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        try:
            project = Project.objects.get(slug=slug)
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)


class ExperienceListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        queryset = Experience.objects.all()
        serializer = ExperienceSerializer(queryset, many=True)
        return Response(serializer.data)


class ArticleListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        queryset = Article.objects.filter(published=True)
        serializer = ArticleSerializer(queryset, many=True)
        return Response(serializer.data)


class ArticleDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        try:
            article = Article.objects.get(slug=slug, published=True)
            article.views += 1
            article.save(update_fields=['views'])
            serializer = ArticleSerializer(article)
            return Response(serializer.data)
        except Article.DoesNotExist:
            return Response({"error": "Article not found"}, status=status.HTTP_404_NOT_FOUND)


class ContactMessageCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Thank you! Your message has been sent successfully. I will get back to you shortly."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecordVisitView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        ip = request.META.get('REMOTE_ADDR', '')
        ip_hash = hashlib.sha256(ip.encode()).hexdigest()[:16] if ip else 'unknown'
        user_agent = request.META.get('HTTP_USER_AGENT', '')[:280]
        path = request.data.get('path', '/')

        VisitorStat.objects.create(
            path=path,
            ip_hash=ip_hash,
            user_agent=user_agent
        )
        return Response({"status": "recorded"}, status=status.HTTP_201_CREATED)


class PublicStatsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        profile = Profile.objects.first()
        projects_count = Project.objects.count()
        skills_count = Skill.objects.count()
        articles_count = Article.objects.filter(published=True).count()
        total_visits = VisitorStat.objects.count()
        
        return Response({
            "projects_count": projects_count,
            "skills_count": skills_count,
            "articles_count": articles_count,
            "total_visits": total_visits,
            "years_experience": profile.years_experience_label if profile and profile.years_experience_label else "1+",
            "github_repos": "10+",
            "open_to_work": profile.available_for_hire if profile else True,
        })


# ==========================================
# ADMIN RESTRICTED API VIEWS (JWT Required)
# ==========================================

class AdminDashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get(self, request):
        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        
        total_visits = VisitorStat.objects.count()
        visits_today = VisitorStat.objects.filter(visited_at__gte=today_start).count()
        visits_last_7_days = VisitorStat.objects.filter(visited_at__gte=now - timedelta(days=7)).count()
        
        total_messages = ContactMessage.objects.count()
        unread_messages = ContactMessage.objects.filter(is_read=False).count()
        
        recent_messages = ContactMessageAdminSerializer(
            ContactMessage.objects.all()[:5], many=True
        ).data

        recent_visits = VisitorStatSerializer(
            VisitorStat.objects.all()[:8], many=True
        ).data

        return Response({
            "overview": {
                "total_projects": Project.objects.count(),
                "total_skills": Skill.objects.count(),
                "total_articles": Article.objects.count(),
                "total_messages": total_messages,
                "unread_messages": unread_messages,
                "total_visits": total_visits,
                "visits_today": visits_today,
                "visits_last_7_days": visits_last_7_days,
            },
            "recent_messages": recent_messages,
            "recent_visits": recent_visits,
        })


class AdminCurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
        })


class AdminProfileUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def put(self, request):
        profile = Profile.objects.first()
        if not profile:
            serializer = ProfileSerializer(data=request.data)
        else:
            serializer = ProfileSerializer(profile, data=request.data, partial=True)
            
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminSkillViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class AdminProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class AdminExperienceViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class AdminArticleViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class AdminMessageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageAdminSerializer
