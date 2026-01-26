---
title: Swagger/OpenAPI
---

# Swagger/OpenAPI

**Interactive REST API documentation. Industry standard for APIs.**

---

## What It Is

- Machine-readable API specification
- Auto-generates interactive documentation
- Enables code generation
- YAML or JSON format
- Standardized across industry

---

## Install & Setup

```bash
# Install Swagger UI / Swagger Editor
npm install -g @swagger-ui/dist
npm install -g @apidevtools/swagger-cli

# Or use online editors:
# https://editor.swagger.io/
# https://swagger.io/tools/swagger-ui/
```

---

## Basic Structure (OpenAPI 3.0)

```yaml
openapi: 3.0.0

info:
  title: My API
  description: API for my application
  version: 1.0.0

servers:
  - url: https://api.example.com/v1
    description: Production
  - url: https://staging-api.example.com/v1
    description: Staging

paths:
  /users:
    get:
      summary: List all users
      tags:
        - Users
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: List of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'

    post:
      summary: Create a user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserInput'
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

  /users/{userId}:
    get:
      summary: Get user by ID
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: User object
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
          format: email
        created_at:
          type: string
          format: date-time
      required:
        - id
        - name
        - email

    UserInput:
      type: object
      properties:
        name:
          type: string
        email:
          type: string
          format: email
      required:
        - name
        - email

  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - BearerAuth: []
```

---

## Django REST Framework Integration

Auto-generate OpenAPI spec from DRF:

```bash
# Install drf-spectacular
pip install drf-spectacular
```

**settings.py:**

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'drf_spectacular',
]

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'My API',
    'DESCRIPTION': 'API documentation',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SERVE_PERMISSIONS': ['rest_framework.permissions.AllowAny'],
}
```

**urls.py:**

```python
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView

urlpatterns = [
    # OpenAPI spec endpoint
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    # Swagger UI
    path('api/docs/', SpectacularSwaggerView.as_view(
        url_name='schema'
    ), name='swagger-ui'),
]
```

**models.py:**

```python
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
```

**serializers.py:**

```python
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""
    
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'created_at']
        read_only_fields = ['id', 'created_at']
```

**views.py:**

```python
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for user management.
    
    list: Return list of all users
    create: Create new user
    retrieve: Get specific user
    update: Update user
    delete: Delete user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter users by query params."""
        queryset = User.objects.all()
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
        return queryset
```

**urls.py (register viewset):**

```python
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
```

**Result:** Visit `/api/docs/` to see auto-generated Swagger UI.

---

## Common HTTP Methods

```yaml
paths:
  /resource:
    get:        # Retrieve data
    post:       # Create new
    put:        # Replace entire resource
    patch:      # Partial update
    delete:     # Remove resource
    head:       # Like GET but no body
    options:    # Describe communication options
```

---

## Request/Response Examples

### Request Body

```yaml
requestBody:
  required: true
  content:
    application/json:
      schema:
        type: object
        properties:
          name:
            type: string
          age:
            type: integer
        required:
          - name
```

### Response

```yaml
responses:
  '200':
    description: Success
    content:
      application/json:
        schema:
          type: object
          properties:
            id:
              type: string
            message:
              type: string
  '400':
    description: Bad request
  '401':
    description: Unauthorized
  '500':
    description: Server error
```

---

## Authentication

```yaml
components:
  securitySchemes:
    ApiKey:
      type: apiKey
      in: header
      name: X-API-Key

    BearerToken:
      type: http
      scheme: bearer
      bearerFormat: JWT

    OAuth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://example.com/oauth/authorize
          tokenUrl: https://example.com/oauth/token
          scopes:
            read: Read access
            write: Write access

security:
  - BearerToken: []
```

---

## Data Types

```yaml
type: string       # Text
type: integer      # Whole numbers
type: number       # Decimals
type: boolean      # true/false
type: array        # Lists
type: object       # JSON objects
```

---

## Validation Rules

```yaml
schema:
  type: string
  minLength: 3
  maxLength: 100
  pattern: "^[a-zA-Z]+$"

  type: integer
  minimum: 0
  maximum: 100
  multipleOf: 5

  type: array
  minItems: 1
  maxItems: 10
  uniqueItems: true

  type: number
  exclusiveMinimum: 0
  exclusiveMaximum: 100
```

---

## Code Generation

Generate client libraries from OpenAPI spec:

```bash
# Install OpenAPI Generator
npm install @openapitools/openapi-generator-cli -g

# Generate Python client
openapi-generator-cli generate \
  -i openapi.yaml \
  -g python \
  -o ./python-client

# Generate JavaScript client
openapi-generator-cli generate \
  -i openapi.yaml \
  -g javascript \
  -o ./js-client
```

---

## Tools & Platforms

| Tool | Use |
| ------ | ----- |
| **Swagger Editor** | Write/edit OpenAPI specs |
| **Swagger UI** | Interactive documentation |
| **ReDoc** | Beautiful documentation |
| **Postman** | Test & document APIs |
| **Insomnia** | API testing & documentation |

---

## Best For

- ✅ REST APIs
- ✅ Team collaboration
- ✅ Client code generation
- ✅ Interactive documentation
- ✅ Testing & mocking

---

## Pros ✅

- Industry standard
- Auto-generates clients
- Interactive documentation
- Machine-readable
- Great tooling support

---

## Cons ❌

- Verbose specification
- Learning curve
- Requires discipline to maintain
- Can become outdated

---

## Quick Checklist

- ✅ Define all endpoints
- ✅ Document request/response bodies
- ✅ Add error responses
- ✅ Include authentication
- ✅ Use consistent naming
- ✅ Test with Swagger UI
- ✅ Use API Gateway (AWS API Gateway, Kong) or mock server
