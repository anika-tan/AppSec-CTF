import sqlite3

conn = sqlite3.connect("database.db")

results = conn.execute('SELECT * FROM users').fetchall()

print(results)