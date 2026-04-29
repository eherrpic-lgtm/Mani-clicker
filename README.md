# Mani-Clicker 🏭✨

**Mani-Clicker** is a **multiplayer incremental game** where players compete to generate the most *vagueness* by clicking and upgrading their factories. Built with **Flask**, **SQLAlchemy**, and a touch of absurdity, this game lets you dominate the leaderboard by maximizing your *vagueness per click* (VPC) and *vagueness per second* (VPS).

---

## 🎮 Features

- **Real-Time Leaderboard**: Compete with other players to top the global rankings.
- **Factory Management**: Upgrade your factory to increase your *vagueness* production.
- **Admin Dashboard**: Monitor active players, send global messages, and override player stats (for testing or chaos).
- **Persistent Progress**: Your *vagueness* and upgrades are saved to a database.
- **Simple & Addictive**: Easy to pick up, hard to put down.

---

## 📦 Technologies

- **Backend**: [Flask](https://flask.palletsprojects.com/) (Python web framework)
- **Database**: [SQLAlchemy](https://www.sqlalchemy.org/) (SQLite by default, PostgreSQL supported)
- **Frontend**: HTML/CSS/JS (with templates in `/templates`)
- **Dependencies**: See [`requirements.txt`](requirements.txt)

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/eherrpic-lgtm/Mani-clicker.git
   cd Mani-clicker
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables (optional)**:
   - `DATABASE_URL`: Database connection string (default: `sqlite:///scores.db`)
   - `SECRET_KEY`: Secret key for Flask sessions (default: `dev-secret-key`)
   - `ADMIN_PASSWORD`: Password for the admin dashboard (default: `admin`)
   - `PORT`: Port to run the app on (default: `5000`)

   Example (Linux/macOS):
   ```bash
   export DATABASE_URL="sqlite:///scores.db"
   export SECRET_KEY="your-secret-key"
   export ADMIN_PASSWORD="your-admin-password"
   export PORT=8080
   ```

4. **Run the app**:
   ```bash
   python app.py
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5000` (or your specified port).

---

## 🎯 How to Play

1. **Join the Game**:
   - Enter your *factory name* on the homepage to start playing.

2. **Click to Earn Vagueness**:
   - Each click on the *Mani* button earns you *vagueness* based on your **VPC (Vagueness Per Click)**.

3. **Upgrade Your Factory**:
   - Spend your *vagueness* to increase your **VPC** and **VPS (Vagueness Per Second)**.

4. **Climb the Leaderboard**:
   - Your total *vagueness* is saved, and the top 10 players are displayed on the leaderboard.

5. **Admin Features (Optional)**:
   - Log in to the admin dashboard (`/admin`) with the `ADMIN_PASSWORD`.
   - Monitor active players, send messages, or override stats for testing.

---

## 📂 Project Structure

```
Mani-clicker/
├── app.py                  # Flask backend logic
├── requirements.txt        # Python dependencies
├── static/                 # Static files (CSS, JS, images)
├── templates/              # HTML templates
│   ├── index.html          # Main game page
│   └── admin.html          # Admin dashboard
└── README.md               # This file
```

---

## 🔧 Configuration

### Database
By default, the app uses **SQLite** (`scores.db`). To use **PostgreSQL**:
1. Install `psycopg2-binary`:
   ```bash
   pip install psycopg2-binary
   ```
2. Set the `DATABASE_URL` environment variable:
   ```bash
   export DATABASE_URL="postgresql://user:password@localhost/dbname"
   ```

### Admin Access
- The admin dashboard is protected by a password. Set `ADMIN_PASSWORD` in your environment variables.
- Default password: `admin` (change this in production!).

---

## 🎨 Customization

- **Styling**: Edit the CSS in `/static` or modify the HTML templates in `/templates`.
- **Game Balance**: Adjust the default `vagueness_per_click` and `vagueness_per_second` values in the `PlayerSession` model in `app.py`.
- **Messages**: Use the admin dashboard to send global or targeted messages to players.

---

## 🤝 Contributing

Contributions are welcome! Here’s how you can help:

1. **Fork the repository** and create a new branch.
2. **Make your changes** (e.g., new features, bug fixes, or improvements).
3. **Submit a pull request** with a clear description of your changes.

---

## 🐛 Issues & Bug Reports

Found a bug or have a feature request? Open an issue on the [GitHub repository](https://github.com/eherrpic-lgtm/Mani-clicker/issues).

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- Inspired by classic incremental games like *Cookie Clicker*.
- Built with ❤️ and a lot of *vagueness*.

---

**Happy clicking!** 🚀
