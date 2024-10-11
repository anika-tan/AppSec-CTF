from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)

@app.route("/", methods=["GET"])
def main():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def logic():
    return render_template("superLogin.html")

@app.route("/superlogin", methods=["GET", "POST"])
def super_login():
    # SQL Injection
    if request.method == "POST":
        username = request.form['username']
        password = request.form['pwd']
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        sql_statement = f"SELECT * FROM superusers WHERE username = '{username}' AND password = '{password}'"
        results = c.execute(sql_statement).fetchall()
        # return results
        return render_template("superLogin.html", results=results)
    else:
        return render_template("superLogin.html")

if __name__ == "__main__":
    app.run(debug = True)