from .models import db, Challenge

baseUrl = "http://localhost:5000"

# Create fake challenges and insert them into the database
CHALLENGES = [
    {
        "id": 1,
        "title": "Challenge 1 - Lost and Found",
        "description": "You received a tip-off to the link of the website the criminals use. Find the mystery that lies within.",
        "flag": "SC4013_CTF_AB{1_kn0w_wh3r3_1m_g01n9}",
        "link": f"{baseUrl}/",
        "hints": ["Where do the images go?"],
        "success_message": "Well even my grandma could do that",
        "points": 100,
        "completed_users": []
    },
    {
        "id": 2,
        "title": "Challenge 2 - Surface Level",
        "description": "Oh, there is a login page. Can you find a way in?",
        "flag": "SC4013_CTF_AB{1m_n07_c0nfu51n9_y0u_4r3_c0nfu51n9_m3}",
        "link": f"{baseUrl}/login",
        "hints": ["How are websites made?"],
        "success_message": "Ooos, sorry, looks like my kid coded this challenge",
        "points": 100,
        "completed_users": []
    },
    {
        "id": 3,
        "title": "Challenge 3 - Lateral Movement",
        "description": "Looks like Chad has some friends! Are there more?",
        "flag": "SC4013_CTF_AB{c00k1e_m0n5ter_4cc3ss}",
        "link": f"{baseUrl}/account",
        "hints": [" Check your Inspector tab"],
        "success_message": "Oh mY, aRe YoU a HaCkEr?",
        "points": 100,
        "completed_users": []
    },
    {
        "id": 4,
        "title": "Challenge 4 - Admin Login",
        "description": "You learn that “superadmin” is a possible user that has administrator access. Can you log in?",
        "flag": "SC4013_CTF_AB{sup3r_53cur3_pa55w0rd_ye5}",
        "link": f"{baseUrl}/superlogin",
        "hints": ["What happens if you put unexpected input?"],
        "success_message": "Bet you can't beat the next one",
        "points": 100,
        "completed_users": []
    },
    {
        "id": 5,
        "title": "Challenge 5 - Owner's Account?",
        "description": "We are logged into the admin account now? Wonderful, look at all the admin privileges that we have. We can look at criminal's minions timesheet… Oh… wait is that all? That is not really useful. Looks like we need greater access privilege! An insider told us that the owner of the website, Old Man Diddy, has full access to all files and data. But he is usually accompanied by his great-grandson, Pubescent Diddy. So we can't really get any info out of the old man.",
        "flag": "SC4013_CTF_AB{0h_h3y_15_th1s_th3_0wn3r's_4cc0unt}",
        "link": f"{baseUrl}/adminAccount",
        "hints": ["He's an old man, you wouldn't hurt a senile, FORGETFUL old man right?",
                  "FORGETFUL? Maybe I should write down my login info somewhere."
                  "He's old, but his great-grandson Pubescent Diddy helps him encrypt his account information that is only accessible by the great-grandson's super secure secret session id.",
                  "What kind of Algorithm for Encryption Should we use?",
                  ],
        "success_message": "Yoooo chilllll, you're too good",
        "points": 100,
        "completed_users": []
    },

    {
        "id": 6,
        "title": "Challenge 6 - Incriminating Evidence",
        "description": "Awesome Beans! We now have the highest privilege. Now what should we do? Oh, what's that, is that a ledger of all the illegal activities that has been going on? JACKPOT~~ Wait a minute, that's only the names of the activities, we need more information to bust them criminals.",
        "flag": "SC4013_CTF_AB{n3tw0rk_g03s_brrrrrrt}",
        "link": f"{baseUrl}/ownerAccount",
        "hints": ["Why is the server only returning names?",
                  "If only we could mimic the request while requesting for more information…",
                  ],
        "success_message": "Okok you have potential, I'll admit it",
        "points": 100,
        "completed_users": []
    },
    {
        "id": 7,
        "title": "Challenge 7 - There's more?",
        "description": "Whew, what an expose! 😀 Wait, this just in… There are other Singaporean companies and stores that launder money through this store?? And, get this, the transaction log is stored in the same server! For the sake of IRAS and our salary, we must not let them go unscathed. Let's go back to the ledger site and find out more! We need to provide our forensics team with the companies' login info.",
        "flag": "SC4013_CTF_AB{password_hanselgratel_ntu_password123_abc123_123456789_hearing_aid_qwerty}",
        "link": f"{baseUrl}/ownerAccount",
        "hints": ["Perhaps we can try something similar as the previous challenge, if you remember that is.",
                  "Database under maintenance 40 % completed?",
                  "Perhaps the security measures are not fully configured yet",
                  "Password is a short hash, mayhaps it's not a secure hash?",
                  "We have the hashed password, but we need the password in plain text!",
                  "Perhaps the password is predictable as the companies' cyber security department is not on board",
                  ],
        "success_message": "Wonderful! See what I told you. I never doubted you.",
        "points": 100,
        "completed_users": []
    },
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
