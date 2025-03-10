from fastapi import FastAPI, HTTPException, Depends
from pymongo import MongoClient
import psycopg2
import psycopg2.extras
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
POSTGRES_URI = os.getenv("POSTGRES_URI", "postgresql://admin:password@localhost:5432/users_db")

# Initialize FastAPI
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client["demoDB"]
mongo_users = mongo_db["users"]

# Connect to PostgreSQL
def get_postgres_conn():
    return psycopg2.connect(POSTGRES_URI, cursor_factory=psycopg2.extras.RealDictCursor)

# Pydantic model for user input
class User(BaseModel):
    name: str
    age: int
    city: str

# 🚀 Add a user to both databases
@app.post("/users")
def create_user(user: User):
    try:
        # MongoDB insert
        mongo_users.insert_one(user.dict())

        # PostgreSQL insert
        conn = get_postgres_conn()
        cur = conn.cursor()
        cur.execute("INSERT INTO users (name, age, city) VALUES (%s, %s, %s)", (user.name, user.age, user.city))
        conn.commit()
        conn.close()

        return {"message": "User added to both databases"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 🔍 Get all users from both databases
@app.get("/users")
def get_users():
    try:
        # MongoDB query
        mongo_users_list = list(mongo_users.find({}, {"_id": 0}))

        # PostgreSQL query
        conn = get_postgres_conn()
        cur = conn.cursor()
        cur.execute("SELECT * FROM users")
        postgres_users_list = cur.fetchall()
        conn.close()

        return {"mongoDB": mongo_users_list, "postgreSQL": postgres_users_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

