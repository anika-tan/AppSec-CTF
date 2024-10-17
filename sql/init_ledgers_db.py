import sqlite3

from ledgers_mock_data import ledger_entries, sg_clients_entries

connection = sqlite3.connect('database.db')

with open("./sql/ledger_entry_schema.sql") as f:
    connection.executescript(f.read())

cur = connection.cursor()

for entry in ledger_entries:
    id_no = entry["id"]
    name = entry["name"]
    amount = entry["amount"]
    date = entry["date"]
    person = entry["person"]
    details = entry.get("details", "")

    cur.execute(
        f"INSERT INTO ledger (id, name, amount, date, person, details) VALUES (?, ?, ?, ?, ?, ?)", (
            id_no, name, amount, date, person, details)
    )

for entry in sg_clients_entries:
    id_no = entry["id"]
    company_name = entry["company_name"]
    password = entry["password"]

    cur.execute(f"INSERT INTO sg_clients_migration_asdfasdf (id, name, password) VALUES (?, ?, ?)", (
        id_no, company_name, password)
    )


connection.commit()
connection.close()
