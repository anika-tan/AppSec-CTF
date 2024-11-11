import subprocess
import os
import sys

# Get the absolute path of the directory where the executable is located
if getattr(sys, 'frozen', False):
    base_path = sys._MEIPASS
else:
    base_path = os.path.dirname(os.path.abspath(__file__))

def run_challenges():
    # Start the subprocess and wait for it to complete
    proc = subprocess.Popen(["python", os.path.join(base_path, "app.py")], close_fds=True)
    proc.wait()  # Wait for the subprocess to complete

# Run the function directly without threading to avoid cleanup issues
run_challenges()

# Ensure the script exits cleanly to help remove the temporary directory
sys.exit()