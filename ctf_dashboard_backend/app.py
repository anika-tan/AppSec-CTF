from flask import Flask, send_from_directory
import os
from dotenv import dotenv_values

config = dotenv_values(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), '.env'))

# Serve from react build folder
build_path = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), config.get(
    'REACT_BUILD_PATH', '../ctf_dashboard_frontend/dist')))

print("Build path: ", build_path)

app = Flask(__name__, static_folder=build_path, static_url_path='')


@app.route("/", methods=["GET"])
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/<path:path>', methods=["GET"])
def serve_static_files(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    # Default port is 3000
    app.run(debug=True, port=config.get('PORT', 3000))
