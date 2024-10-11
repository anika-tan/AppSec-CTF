import sqlite3, base64

connection = sqlite3.connect('database.db')

with open("./sql/users_schema.sql") as f:
    connection.executescript(f.read())

cur = connection.cursor()

# User information for admin user
password = base64.b64encode(b"SC4013_CTF_AB{sup3r_53cur3_pa55w0rd_ye5}")
cur.execute("INSERT INTO superusers (username, password) VALUES (?, ?)",
    ('superadmin', password)
)

connection.commit()
connection.close()