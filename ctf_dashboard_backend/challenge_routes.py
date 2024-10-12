from flask import Blueprint, request, jsonify, current_app
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
import jwt
from functools import wraps
from .models import db, User, Challenge
from .auth_routes import authenticate_token

# Create challenge Blueprint
challenge_bp = Blueprint('challenge', __name__)


# Get current challenge
@challenge_bp.route("/current", methods=["POST"])
@authenticate_token
def get_current_challenge():
    data = request.json
    user_id = request.userId

    # Get user
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"error": "User not found."}), 404

    # Get current challenge
    challenge_id = user.current_challenge_id

    if challenge_id is None:
        return jsonify({"error": "Challenge not found."}), 404

    challenge = Challenge.query.filter_by(id=challenge_id).first()
    null_challenge = {"id": challenge_id, "title": "",
                      "description": "", "link": "", "hitns": []}

    response_challenge = null_challenge if not challenge else {
        "id": challenge.id,
        "title": challenge.title,
        "description": challenge.description,
        "link": challenge.link,
        "hints": challenge.hints,
    }

    return jsonify({
        "status": {
            "code": 201,
            "message": "Flag submitted successfully.",
        },
        "data": {
            "challenge": response_challenge
        },
    })


# Get any challenge by id
@challenge_bp.route("/<int:challenge_id>", methods=["GET"])
def get_challenge(challenge_id):
    challenge = Challenge.query.filter_by(id=challenge_id).first()

    if not challenge:
        return jsonify({"error": "Challenge not found."}), 404

    return jsonify({
        "status": {
            "code": 201,
            "message": "Flag submitted successfully.",
        },
        "data": {
            "challenge": {
                "id": challenge.id,
                "title": challenge.title,
                "description": challenge.description,
                "link": challenge.link,
                "hints": challenge.hints,
            }
        },
    })


# Submit flag, which will then update the server regarding the user's progress
@challenge_bp.route("/submit", methods=["POST"])
@authenticate_token
def submit_flag():
    data = request.json
    user_id = request.userId
    challengeId = data.get("challenge")
    flag = data.get("flag")

    # Get user
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found.", "success": False}), 404

    # Find challenge by id
    challenge = Challenge.query.filter_by(id=challengeId).first()
    no_challenges = Challenge.query.count()

    if not challenge:
        return jsonify({"error": "Challenge not found.", "success": False}), 404

    # Compare flag
    is_correct = False

    if flag == challenge.flag:
        user.current_challenge_id = challenge.id + 1
        if challenge.id + 1 > no_challenges:
            user.current_challenge_id = 69  # Indicates end of challenges
        print(user.current_challenge_id)
        db.session.commit()
        is_correct = True
    else:
        is_correct = False

    return jsonify({
        "status": {
            "code": 201,
            "message": "Flag submitted successfully.",
        },
        "data": {
            "message": "Correct flag!" if is_correct else "Incorrect flag!",
            "success": is_correct,
        },
    })


# Reset user's current challenge
@challenge_bp.route("/reset", methods=["POST"])
@authenticate_token
def reset_challenge():
    user_id = request.userId

    # Get user
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"error": "User not found.", "success": False}), 404

    user.current_challenge_id = 1
    db.session.commit()

    return jsonify({
        "status": {
            "code": 201,
            "message": "Challenge reset successfully.",
        },
        "data": {
            "message": "Challenge reset successfully.",
            "success": True,
        },
    })
