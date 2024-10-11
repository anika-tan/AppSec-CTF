import sqlite3

connection = sqlite3.connect('database.db')


with open("./sql/users_schema.sql") as f:
    connection.executescript(f.read())

cur = connection.cursor()

# User information for normal user
cur.execute("INSERT INTO users (username, password) VALUES (?, ?)",
    ('chad', 'supersecurepassword')
)

# User information for admin user
# password is secret. hash taken is MD5. https://md5decrypt.net/en/ 
cur.execute("INSERT INTO superusers (username, password) VALUES (?, ?)",
    ('superadmin', '5ebe2294ecd0e0f08eab7690d2a6ee69')
)

connection.commit()
connection.close()