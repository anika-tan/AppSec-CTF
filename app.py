from flask import Flask, request, render_template, make_response, redirect, url_for, abort
import sqlite3
import re
import base64
import subprocess
import os

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
        "chad_account.html", isManager=True if isManager == 'true' else False))

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


# Challenge 5
def convert_csv_to_paragraph(csv_file):
    path = f"data/{csv_file}"
    # Convert the CSV file to a paragraph,
    result = subprocess.run(
        f'bash print.sh {path}', shell=True, capture_output=True, text=True)
    return result.stdout.strip()


# Change this to something else later
ADMIN_SESSION_ID = "admin's-super-secret-session-id"


@app.route("/adminAccount", methods=["GET", "POST"])
def admin_account():

    # HTML has search bar for admin account, which will be a CMD injection
    if "search_query" in request.form:
        query = request.form["search_query"]
    else:
        query = None

    results = "Nothing to show"
    session_id = request.cookies.get('session_id')

    # e.g. query = "timesheet.csv && ls"
    if query and session_id == ADMIN_SESSION_ID:
        results = convert_csv_to_paragraph(query)

    # Set cookie to "admin-id" if it is not already set
    resp = make_response(render_template(
        "admin_account.html", results=results))
    resp.set_cookie("session_id", ADMIN_SESSION_ID)

    return resp


# OWNER_SESSION_ID = "ze_session_id"  # Change this to something else later
OWNER_SESSION_ID = "owner's-super-secret-session-id"


# Challenge 6 & 7
@app.route("/ownerAccount", methods=["GET"])
@app.route("/ownerAccount/search", methods=["GET", "POST"])
def owner_account():
    results = None
    if request.method == "POST":
        session_id = request.cookies.get('session_id')

        # user input
        request_query = request.form["search_query"]

        # Connect to the database
        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        # Check if session_id is correct or not
        if session_id != OWNER_SESSION_ID:
            abort(403)

        c.execute(
            f"SELECT id, name FROM ledger WHERE name LIKE '%{request_query}%'")

        results = c.fetchall()

    resp = make_response(render_template(
        "owner_account.html", results=results))

    resp.set_cookie("session_id", OWNER_SESSION_ID)

    return resp


# Challenge 6 Insecure API Endpoint
@app.route("/api/ownerAccount/activity", methods=["POST"])
def owner_account_ledger():
    session_id = request.cookies.get('session_id')

    # This is the type of data that the user request
    data = request.form.get('data')

    if not re.match(r'^[a-zA-Z_\s]+$', data):
        abort(403)
    elif data == 'sg_clients':
        log_message = b""" [-] ERROR: Database not found
            [!] LOG: Database under migration, see sg_clients_migration_asdfasdf(100 % completed)
            [!] LOG: Database under maintenance(40 % completed)
            [!] LOG: Please revisit us the next day"""
        encoded_log_message = base64.b64encode(log_message).decode('utf-8')
        results = {
            "oioioi": encoded_log_message
        }
        return {"results": results}

    request_fields = request.form.getlist('data_types')

    if (len(request_fields) == 0):
        request_fields = ["*"]
    sanitized_fields = [
        field for field in request_fields if re.match(r'^[a-zA-Z\s\*]+$', field)]

    # Connect to the database
    conn = sqlite3.connect("database.db")
    c = conn.cursor()

    # Check if session_id is correct or not
    if session_id != OWNER_SESSION_ID:
        abort(403)

    if len(sanitized_fields) == 0:
        abort(403)

    db_request_fields = ", ".join(sanitized_fields)

    c.execute(f"SELECT {db_request_fields} FROM {data}")
    results = c.fetchall()

    return {"results": results}


if __name__ == "__main__":
    app.run(debug=True)
