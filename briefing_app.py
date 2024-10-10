from flask import Flask, send_from_directory
import os
import dotenv

dotenv.load_dotenv()

# Serve from react build folder
build_path = os.getenv('BRIEFING_BUILD_PATH', os.path.join(
    'challenge_briefings_and_hints', 'dist'))
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
    app.run(debug=True, port=os.getenv('BRIEFING_PORT', 3000))
