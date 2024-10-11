from dotenv import dotenv_values
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import jwt
import os
from datetime import datetime, timedelta
from functools import wraps
from flask import Flask, send_from_directory

# Set up env config
config = dotenv_values(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), '.env'))

# Serve from react build folder
build_path = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), config.get(
    'REACT_BUILD_PATH', '../ctf_dashboard_frontend/dist')))

app = Flask(__name__, static_folder=build_path, static_url_path='')

# Change as necessary
DATABASE_PATH = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), config.get('DATABASE_PATH', './database/database.db'))

app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DATABASE_PATH}"
app.config['JWT_SECRET'] = config.get(
    'JWT_SECRET', 'your_jwt_secret')  # Set your JWT secret
app.config['JWT_EXPIRES_IN'] = int(
    config.get('JWT_EXPIRES_IN', 3600))  # Default to 1 hour

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    challenge_process = db.Column(db.String(128), nullable=True)

    def __repr__(self):
        return f"<User {self.username}>"


# Initialize database
with app.app_context():
    db.create_all()


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
                token, app.config['JWT_SECRET'], algorithms=["HS256"])
            request.userId = payload['userId']
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired."}), 403
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token."}), 403

        return f(*args, **kwargs)

    return decorated


# User registration
@app.route("/api/auth/register", methods=["POST"])
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
    ) + timedelta(seconds=app.config['JWT_EXPIRES_IN'])}
    token = jwt.encode(payload, app.config['JWT_SECRET'], algorithm="HS256")

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
@app.route("/api/auth/login", methods=["POST"])
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
    ) + timedelta(seconds=app.config['JWT_EXPIRES_IN'])}
    token = jwt.encode(payload, app.config['JWT_SECRET'], algorithm="HS256")

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
@app.route("/api/auth/user", methods=["POST"])
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


@app.route("/", methods=["GET"])
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:path>', methods=["GET"])
def serve_static_files(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(debug=True, port=config.get('PORT', 3000))
