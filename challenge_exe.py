import subprocess
import threading
import os
import sys

# Get the absolute path of the directory where the executable is located
if getattr(sys, 'frozen', False):
    base_path = sys._MEIPASS
else:
    base_path = os.path.dirname(os.path.abspath(__file__))

# def run_dashboard():
#     subprocess.Popen(["python", os.path.join(base_path, "ctf_dashboard_app.py")])

def run_challenges():
    subprocess.Popen(["python", os.path.join(base_path, "app.py")])

# Start both apps in separate threads
# dashboard_thread = threading.Thread(target=run_dashboard)
challenges_thread = threading.Thread(target=run_challenges)

# dashboard_thread.start()
challenges_thread.start()

# dashboard_thread.join()
challenges_thread.join()

# input("Press Enter to exit...")  # Ensure the window doesn't close immediately
