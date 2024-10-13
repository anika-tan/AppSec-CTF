from flask import Flask, request, render_template, make_response
import sqlite3

app = Flask(__name__)


# Challenge 1
@app.route("/", methods=["GET"])
def main():
    return render_template("index.html")

# Challenge 2
@app.route("/account")
def chad_account():
    # Check if the manager cookie is already set
    isManager = request.cookies.get('manager')

    # Initializing response object
    resp = make_response(render_template("chad_account.html", isManager=isManager))

    # Set the manager cookie to "false"
    if isManager is None: 
        resp.set_cookie("manager", "false")

    return resp

# Challenge 3
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