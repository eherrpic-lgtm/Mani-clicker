from flask import Flask, render_template, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///scores.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-key")
db = SQLAlchemy(app)

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin")

class Score(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    factory_name = db.Column(db.String(64), nullable = False)
    total_vagueness = db.Column(db.Float, nullable = False)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow)

class PlayerSession(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    factory_name = db.Column(db.String(64), nullable = False, unique = True)
    vagueness_per_click = db.Column(db.Float, default = 0)
    vagueness_per_second = db.Column(db.Float, default = 0)
    total_vagueness = db.Column(db.Float, default = 0)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    pending_message = db.Column(db.String(256), nullable = True)
    override_vpc = db.Column(db.Float, nullable = True)
    override_vps = db.Column(db.Float, nullable = True)
    override_vagueness = db.Column(db.Float, nullable = True)

with app.app_context():
    db.create_all()

def is_admin():
    return session.get("is_admin") == True

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/score", methods = ["POST"])
def submit_score():
    data = request.get_json()
    name = data.get("factoryName").strip()[:64]
    score = float(data.get("totalVagueness", 0))
    vpc = float(data.get("vaguenessPerClick", 0))
    vps = float(data.get("vaguenessPerSecond", 0))
    if not name:
        return jsonify({"error": "No factory name"}), 400
    
    existing = Score.query.filter_by(factory_name = name).first()
    if existing:
        if score > existing.total_vagueness:
            existing.total_vagueness = score
            existing.updated_at = datetime.utcnow()
    else:
        db.session.add(Score(factory_name = name, total_vagueness = score))
    player = PlayerSession.query.filter_by(factory_name = name).first()
    if player:
        player.vagueness_per_click = vpc
        player.vagueness_per_second = vps
        player.total_vagueness = score
        player.last_seen = datetime.utcnow()
    else:
        db.session.add(PlayerSession(
            factory_name = name,
            vagueness_per_click = vpc,
            vagueness_per_second = vps,
            total_vagueness = score
        ))

    db.session.commit()
    return jsonify({"ok": True})

@app.route("/api/leaderboard", methods = ["GET"])
def leaderboard():
    top = Score.query.order_by(Score.total_vagueness.desc()).limit(10).all()
    return jsonify([
        {"factoryName": s.factory_name, "totalVagueness": s.total_vagueness}
        for s in top
    ])

@app.route("/api/poll", methods=["POST"])
def poll():
    data = request.get_json()
    name = data.get("factoryName", "").strip()
    if not name:
        return jsonify({})
    
    player = PlayerSession.query.filter_by(factory_name = name).first()
    if not player:
        return jsonify({})
    
    response = {}

    if player.pending_message:
        response["message"] = player.pending_message
        player.pending_message = None

    if player.override_vpc is not None:
        response["override_vpc"] = player.override_vpc
        player.override_vpc = False

    if player.override_vps is not None:
        response["override_vps"] = player.override_vps
        player.override_vps = False

    if player.override_vagueness is not None:
        response["override_vagueness"] = player.override_vagueness
        player.override_vagueness = False

    db.session.commit()
    return jsonify(response)

@app.route("/admin")    
def admin():
    return render_template("admin.html")

@app.route("/api/admin/login", methods = ["POST"])
def admin_login():
    data=request.get_json()
    if data.get("password") == ADMIN_PASSWORD:
        session["is_admin"] = True
        return jsonify({"ok": True})
    return jsonify({"error": "Wrong password"}), 401

@app.route("/api/admin/logout", methods = ["POST"])
def admin_logout():
    session.pop("is_admin", None)
    return jsonify({"ok": True})

@app.route("/api/admin/players", methods = ["GET"])
def admin_players():
    if not is_admin():
        return jsonify({"error": "Unauthorized"}), 401
    cutoff = datetime.utcnow() - timedelta(seconds = 60)
    players = PlayerSession.query.filter(PlayerSession.last_seen >= cutoff).all()
    return jsonify([{
        "factoryName": p.factory_name,
        "vaguenessPerClick": p.vagueness_per_click,
        "vaguenessPerSecond": p.vagueness_per_second,
        "totalVagueness": p.total_vagueness,
        "lastSeen": p.last_seen.isoformat()
    } for p in players])

@app.route("api/admin/message", methods = ["POST"])
def admin_message():
    if not is_admin():
        return jsonify({"error": "Unauthorized"})
    data = request.get_json()
    target = request.get_data("factoryName")
    message = request.get_data("message", "").strip()[:256]
    if not message:
        return jsonify({"error": "No message"}), 400
    if target == "__all__":
        players = PlayerSession.query.all()
        for p in players:
            p.pending_message = message
    else:
        player = PlayerSession.query.filter_by("factory_name" == target).first()
        if player:
            player.pending_message = message
    db.session.commit()
    return jsonify({"ok": True})

@app.route("api/admin/override", methods = ["POST"])
def admin_override():
    if not is_admin():
        return jsonify({"error": "Unauthorized"})
    data = request.get_json()
    name = data.get("factoryName")
    player = PlayerSession.query.filter_by("factory_name" == name).first()
    if not player:
        return jsonify({"error": "Player not found"}), 404
    if "vaguenessPerClick" in data:
        player.override_vpc = float(data["vaguenessPerClick"])
    if "vaguenessPerSecond" in data:
        player.override_vps = float(data["vaguenessPerSecond"])
    if "vagueness" in data:
        player.override_vagueness = float(data["vagueness"])
    db.session.commit()
    return jsonify({"ok", True})

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = int(os.environ.get("PORT", 5000)))