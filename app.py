from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def main():
    return render_template("index.html")

@app.route("/login", methods=["POST"])
def login():
    # SQL Injection
    username = request.form['username']
    password = request.form['pwd']
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    sql_statement = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    results = c.execute(sql_statement).fetchall()
    return results

if __name__ == "__main__":
    app.run(debug = True)