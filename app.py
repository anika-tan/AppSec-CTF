from flask import Flask, request, render_template, make_response, redirect, url_for
import sqlite3

app = Flask(__name__)

# Challenge 1
@app.route("/", methods=["GET"])
def main():
    return render_template("index.html")

# Challenge 2
@app.route("/login", methods=["GET"])
def login():
    return render_template("login.html")

# Challenge 3
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

# Challenge 4
@app.route("/superlogin", methods=["GET", "POST"])
def super_login():
    success = None  # Set to None initially
    results = None

    if request.method == "POST":
        username = request.form['username']
        password = request.form['pwd']

        # Connect to the database
        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        # Prevent SQL injection for username
        c.execute('SELECT * FROM superusers WHERE username = ?', (username,))
        user = c.fetchone()

        if user:
            # Potentially vulnerable query for password
            c.execute(f"SELECT * FROM superusers WHERE password = '{password}'")
            results = c.fetchone()
            if results:
                success = 1  # Login successful
            else:
                success = 0  # Incorrect password
        else:
            success = 0  # Username not found

        # Close the database connection
        conn.close()

    # Render the template with the current results and success status
    return render_template("superLogin.html", results=results, success=success)

if __name__ == "__main__":
    app.run(debug = True)