from ctf_dashboard_backend.auth_routes import auth_bp
from ctf_dashboard_backend.models import db
from dotenv import dotenv_values
from flask import Flask, send_from_directory, render_template, request
from flask_bcrypt import Bcrypt
import os

# The CTF Dashboard App
# Set up env config
config = dotenv_values(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), '.env'))

# Serve from react build folder
build_path = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), config.get(
    'CTF_FRONTEND_BUILD_PATH', './ctf_dashboard_frontend/dist')))

app = Flask(
    __name__, static_folder=build_path, static_url_path='')

# Change as necessary
DATABASE_PATH = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), config.get('DATABASE_PATH', './ctf_dashboard_backend/database/database.db'))

app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DATABASE_PATH}"
app.config['JWT_SECRET'] = config.get(
    'JWT_SECRET', 'your_jwt_secret')  # Set your JWT secret
app.config['JWT_EXPIRES_IN'] = int(
    config.get('JWT_EXPIRES_IN', 3600))  # Default to 1 hour

db.init_app(app)
bcrypt = Bcrypt(app)

# Import and register the blueprint
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# Initialize database
with app.app_context():
    db.create_all()


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
    app.run(debug=True, port=config.get('CTF_DASHBOARD_PORT', 3000))
