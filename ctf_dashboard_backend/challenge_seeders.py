from .models import db, Challenge

# Create fake challenges and insert them into the database
CHALLENGES = [
    {
        "id": 1,
        "title": "Challenge 1 - The First Blood",
        "description": "This is the first challenge",
        "flag": "1",
        "link": "https://www.google.com",
        "success_message": "Well even my grandma could do that",
        "points": 100,
        "completed_users": []
    },
    {
        "id": 2,
        "title": "Challenge 2 - Electric Boogaloo",
        "description": "This is the second challenge",
        "flag": "2",
        "link": "https://www.google.com",
        "hints": ["Test 1", "Test 2", "Test 3"],
        "success_message": "Ooos, sorry, looks like my kid coded this challenge",
        "points": 100,
        "completed_users": []
    },
    {
        "id": 3,
        "title": "Challenge 3 - The Trilogy",
        "description": "This is the third challenge",
        "flag": "3",
        "link": "https://www.google.com",
        "hints": ["If math is mathematical, then what is test?"],
        "success_message": "Oh mY, aRe YoU a HaCkEr?",
        "points": 100,
        "completed_users": []
    },
    {
        "id": 4,
        "title": "Challenge 4 - I am Number Four",
        "description": "This is the fourth challenge",
        "flag": "4",
        "link": "https://www.google.com",
        "hints": ["Somebody once told me", "The world is gonna roll me"],
        "success_message": "Bet you can't beat the next one",
        "points": 100,
        "completed_users": []
    },
    {
        "id": 5,
        "title": "Challenge 5 - The Last Airbender",
        "description": "This is the fifth challenge",
        "flag": "5",
        "link": "https://www.google.com",
        "success_message": "Yoooo chilllll, you're too good",
        "points": 100,
        "completed_users": []
    }
]


def seed_challenges():
    for challenge in CHALLENGES:
        new_challenge = Challenge(
            id=challenge["id"],
            title=challenge["title"],
            description=challenge["description"],
            flag=challenge["flag"],
            link=challenge["link"],
            hints=challenge.get("hints", None),
            success_message=challenge["success_message"],
            points=challenge["points"],
            completed_users=challenge["completed_users"]
        )
        db.session.add(new_challenge)
    db.session.commit()
