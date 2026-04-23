from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///scores.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

class Score(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    factory_name = db.Column(db.String(64), nullable = False)
    total_vagueness = db.Column(db.Float, nullable = False)
    updated_at = db.Column(db.DateTime, default = datetime.utcnow)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/score", methods = ["POST"])
def submit_score():
    data = request.get_json()
    name = data.get("factoryName").strip()[:64]
    score = float(data.get("totalVagueness", 0))
    if not name:
        return jsonify({"error": "No factory name"}), 400
    existing = Score.query.filter_by(factory_name = name).first()
    if existing:
        if score > existing.total_vagueness:
            existing.total_vagueness = score
            existing.updated_at = datetime.utcnow()
    else:
        db.session.add(Score(factory_name = name, total_vagueness = score))
    db.session.commit()
    return jsonify({"ok": True})

@app.route("/api/leaderboard", methods = ["GET"])
def leaderboard():
    top = Score.query.order_by(Score.total_vagueness.desc()).limit(10).all()
    return jsonify([
        {"factoryName": s.factory_name, "totalVagueness": s.total_vagueness}
        for s in top
    ])

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = int(os.environ.get("PORT", 5000)))