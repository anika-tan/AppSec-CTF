from flask import Flask, request, render_template, make_response, redirect, url_for, abort
import sqlite3
import re

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
    resp = make_response(render_template(
        "chad_account.html", isManager=isManager))

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
            c.execute(
                f"SELECT * FROM superusers WHERE password = '{password}'")
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


OWNER_SESSION_ID = "1234"


def sanitize_fields(fields):
    # Allow alphabetic characters and whitespace
    return [field for field in fields if re.match(r'^[a-zA-Z\s]+$', field)]


# Challenge 6
@app.route("ownerAccount/activity", methods=["GET", "POST"])
def owner_account_activity():
    results = None
    if request.method == "POST":
        form = request.form
        session_id = request.cookies.get('session_id')

        # This is the table name
        table_name = form['data']

        # This is the type of data that the user request
        request_fields = form['data_types']
        sanitized_fields = [
            field for field in request_fields if re.match(r'^[a-zA-Z\s]+$', field)]

        # Request query from the search input (see Challenge 7)
        request_query = form["search_query"]

        # Connect to the database
        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        # Check if session_id is correct or not
        if session_id != OWNER_SESSION_ID:
            abort(403)

        if len(sanitized_fields) == 0:
            abort(403)

        db_request_fields = ", ".join(sanitized_fields)

        if table_name == "ledger":
            c.execute(f"SELECT {db_request_fields} FROM ledger")
            results = c.fetchall()
        elif table_name == "sg_clients":
            c.execute(f"SELECT {db_request_fields} FROM sg_clients")
            results = c.fetchall()
        elif request_query:
            # sanitize the input by removing non-alphanumeric characters
            sanitized_request_query = ''.join(
                e for e in request_query if re.match(r'^\w+$', e))
            c.execute(
                f"SELECT names FROM sg_clients WHERE description LIKE '%{sanitized_request_query}%'")
            results = c.fetchall()

    return render_template("owner_account.html", results=results)


# Challenge 7
@app.route("/ownerAccount/search", methods=["GET", "POST"])
def owner_account_search():
    results = None
    if request.method == "POST":
        form = request.form
        session_id = request.cookies.get('session_id')

        # user input
        request_query = form["search_query"]

        # Connect to the database
        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        # Check if session_id is correct or not
        if session_id != OWNER_SESSION_ID:
            abort(403)

        c.execute(
            f"SELECT * FROM sg_clients_v2 WHERE description LIKE '%{request_query}%'")

    return render_template("owner_account.html", results=results)


if __name__ == "__main__":
    app.run(debug=True)
