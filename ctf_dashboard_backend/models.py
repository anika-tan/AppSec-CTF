from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    current_challenge_id = db.Column(
        db.Integer, db.ForeignKey('challenge.id'), default=1)
    current_challenge = db.relationship('Challenge', backref='users')

    def __repr__(self):
        return f"<User {self.username}>"


class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(128), nullable=False)
    flag = db.Column(db.String(128), nullable=False)
    link = db.Column(db.String(128), nullable=False)
    hints = db.Column(db.JSON, nullable=True)

    def __repr__(self):
        return f"<Challenge {self.title}>"
