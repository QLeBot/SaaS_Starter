#!/bin/bash

set -e

echo "�� Setting up FastAPI Backend for Vercel Functions"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if backend directory already exists
if [ -d "apps/backend/fastapi-vercel" ]; then
    print_warning "apps/backend/fastapi-vercel already exists. Do you want to overwrite it? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_status "Skipping FastAPI Vercel backend setup"
        exit 0
    fi
    rm -rf apps/backend/fastapi-vercel
fi

# Create backend directory
mkdir -p apps/backend/fastapi-vercel
cd apps/backend/fastapi-vercel

print_status "Creating FastAPI backend for Vercel Functions..."

# Create requirements.txt
cat > requirements.txt << 'EOL'
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
python-multipart==0.0.6
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-dotenv==1.0.0
httpx==0.25.2
redis==5.0.1
sqlalchemy==2.0.23
alembic==1.13.1
psycopg2-binary==2.9.9
motor==3.3.2
pymongo==4.6.0
EOL

# Create main FastAPI application
cat > main.py << 'EOL'
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import os
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext

# Initialize FastAPI app
app = FastAPI(
    title="SaaS API",
    description="FastAPI backend for SaaS application",
    version="1.0.0"
)

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class HealthCheck(BaseModel):
    status: str
    timestamp: datetime
    version: str

# In-memory storage (replace with database in production)
users_db = {}
tokens_db = {}

# JWT settings
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = users_db.get(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

# Routes
@app.get("/", response_model=HealthCheck)
async def root():
    return HealthCheck(
        status="healthy",
        timestamp=datetime.utcnow(),
        version="1.0.0"
    )

@app.post("/auth/register", response_model=User)
async def register(user: UserCreate):
    # Check if user already exists
    for existing_user in users_db.values():
        if existing_user["email"] == user.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
    
    # Create new user
    user_id = str(len(users_db) + 1)
    hashed_password = get_password_hash(user.password)
    
    new_user = {
        "id": user_id,
        "email": user.email,
        "full_name": user.full_name,
        "hashed_password": hashed_password,
        "is_active": True,
        "created_at": datetime.utcnow()
    }
    
    users_db[user_id] = new_user
    
    return User(**{k: v for k, v in new_user.items() if k != "hashed_password"})

@app.post("/auth/login", response_model=Token)
async def login(user_credentials: UserLogin):
    # Find user by email
    user = None
    for u in users_db.values():
        if u["email"] == user_credentials.email:
            user = u
            break
    
    if not user or not verify_password(user_credentials.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["id"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/auth/me", response_model=User)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    return User(**{k: v for k, v in current_user.items() if k != "hashed_password"})

@app.get("/api/users", response_model=List[User])
async def get_users(current_user: dict = Depends(get_current_user)):
    return [User(**{k: v for k, v in user.items() if k != "hashed_password"}) 
            for user in users_db.values()]

# Vercel function handler
def handler(request, context):
    """Vercel function handler for FastAPI"""
    from mangum import Mangum
    
    # Create Mangum handler
    handler = Mangum(app)
    
    # Handle the request
    return handler(request, context)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOL

# Create Vercel configuration
cat > vercel.json << 'EOL'
{
  "functions": {
    "api/main.py": {
      "runtime": "python3.9"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/main.py"
    }
  ],
  "env": {
    "JWT_SECRET_KEY": "@jwt-secret-key"
  }
}
EOL

# Create API directory structure for Vercel
mkdir -p api
cat > api/main.py << 'EOL'
from mangum import Mangum
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext

# Initialize FastAPI app
app = FastAPI(
    title="SaaS API",
    description="FastAPI backend for SaaS application",
    version="1.0.0"
)

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class HealthCheck(BaseModel):
    status: str
    timestamp: datetime
    version: str

# In-memory storage (replace with database in production)
users_db = {}
tokens_db = {}

# JWT settings
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Routes
@app.get("/", response_model=HealthCheck)
async def root():
    return HealthCheck(
        status="healthy",
        timestamp=datetime.utcnow(),
        version="1.0.0"
    )

@app.post("/auth/register", response_model=User)
async def register(user: UserCreate):
    # Check if user already exists
    for existing_user in users_db.values():
        if existing_user["email"] == user.email:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
    
    # Create new user
    user_id = str(len(users_db) + 1)
    hashed_password = get_password_hash(user.password)
    
    new_user = {
        "id": user_id,
        "email": user.email,
        "full_name": user.full_name,
        "hashed_password": hashed_password,
        "is_active": True,
        "created_at": datetime.utcnow()
    }
    
    users_db[user_id] = new_user
    
    return User(**{k: v for k, v in new_user.items() if k != "hashed_password"})

@app.post("/auth/login", response_model=Token)
async def login(user_credentials: UserLogin):
    # Find user by email
    user = None
    for u in users_db.values():
        if u["email"] == user_credentials.email:
            user = u
            break
    
    if not user or not verify_password(user_credentials.password, user["hashed_password"]):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["id"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# Vercel function handler
handler = Mangum(app)
EOL

# Create environment file
cat > .env.example << 'EOL'
# JWT Configuration
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Database Configuration (if using external database)
# DATABASE_URL=your-database-url

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
EOL

# Create README for the backend
cat > README.md << 'EOL'
# FastAPI Backend for Vercel Functions

This is a FastAPI backend designed to run on Vercel Functions.

## Features

- User authentication (register/login)
- JWT token-based authentication
- CORS middleware configured
- Health check endpoint
- Ready for Vercel deployment

## Local Development

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Run the development server:
   ```bash
   python main.py
   ```

4. The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /` - Health check
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user info (requires authentication)
- `GET /api/users` - Get all users (requires authentication)

## Deployment to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   - `JWT_SECRET_KEY`

## Notes

- This uses in-memory storage for demonstration. Replace with a proper database for production.
- JWT secret should be a strong, random string in production.
- CORS origins should be configured properly for your frontend domain.
EOL

# Create a simple test script
cat > test_api.py << 'EOL'
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    response = requests.get(f"{BASE_URL}/")
    print("Health check:", response.json())

def test_register():
    user_data = {
        "email": "test@example.com",
        "password": "testpassword123",
        "full_name": "Test User"
    }
    response = requests.post(f"{BASE_URL}/auth/register", json=user_data)
    print("Register:", response.json())
    return response.json()

def test_login():
    login_data = {
        "email": "test@example.com",
        "password": "testpassword123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print("Login:", response.json())
    return response.json()

if __name__ == "__main__":
    print("Testing FastAPI backend...")
    test_health()
    test_register()
    test_login()
EOL

cd ../../..

print_success "FastAPI Vercel backend setup complete!"
echo ""
print_status "Next steps:"
echo "1. cd apps/backend/fastapi-vercel"
echo "2. pip install -r requirements.txt"
echo "3. python main.py (for local development)"
echo "4. vercel (for deployment)"
echo ""
print_status "Don't forget to:"
echo "- Set JWT_SECRET_KEY in environment variables"
echo "- Configure CORS origins for your frontend domain"
echo "- Replace in-memory storage with a proper database" 