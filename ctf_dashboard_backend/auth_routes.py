from flask import Blueprint, request, jsonify, current_app
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
import jwt
from functools import wraps
from .models import db, User


# Initialize Bcrypt
bcrypt = Bcrypt()

# Create a Blueprint
auth_bp = Blueprint('auth', __name__)


# Middleware to authenticate token
def authenticate_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        token = auth_header.split(" ")[1] if auth_header else None

        if not token:
            return jsonify({"error": "Access denied. No token provided."}), 401

        try:
            payload = jwt.decode(
                token, current_app.config['JWT_SECRET'], algorithms=["HS256"])
            request.userId = payload['userId']
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired."}), 403
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token."}), 403

        return f(*args, **kwargs)

    return decorated


# User registration
@auth_bp.route("/register", methods=["POST"])
def register_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Basic validation
    if not username or not password:
        return jsonify({"error": "Please enter all fields."}), 400

    # Check if user exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "User already exists."}), 400

    # Hash password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create new user
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Create and return JWT
    payload = {"userId": new_user.id, "exp": datetime.utcnow(
    ) + timedelta(seconds=current_app.config['JWT_EXPIRES_IN'])}
    token = jwt.encode(
        payload, current_app.config['JWT_SECRET'], algorithm="HS256")

    return jsonify({
        "status": {
            "code": 201,
            "message": "User registered successfully.",
        },
        "data": {
            "token": token,
            "user": {
                "id": new_user.id,
                "username": new_user.username,
            },
        },
    })


# User login
@auth_bp.route("/login", methods=["POST"])
def login_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Basic validation
    if not username or not password:
        return jsonify({"error": "Please enter all fields."}), 400

    # Check for user
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "Invalid credentials."}), 400

    # Validate password
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials."}), 400

    # Create and return JWT
    payload = {"userId": user.id, "exp": datetime.utcnow(
    ) + timedelta(seconds=current_app.config['JWT_EXPIRES_IN'])}
    token = jwt.encode(
        payload, current_app.config['JWT_SECRET'], algorithm="HS256")

    return jsonify({
        "status": {
            "code": 200,
            "message": "User logged in successfully.",
        },
        "data": {
            "token": token,
            "user": {
                "id": user.id,
                "username": user.username,
            },
        },
    })


# Get user details
@auth_bp.route("/user", methods=["POST"])
@authenticate_token
def get_user():
    user = User.query.get(request.userId)
    if not user:
        return jsonify({"error": "User not found."}), 404

    return jsonify({
        "status": {
            "code": 200,
            "message": "User found successfully.",
        },
        "data": {
            "user": {
                "id": user.id,
                "username": user.username,
            },
        },
    })
