import { state } from "./core.js";
import { renderLeaderboard } from "./ui.js";

// Submit score to the server
export async function submitScore() {
    if (!state.factoryName) return;
    try {
        await fetch("/api/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                factoryName: state.factoryName,
                totalVagueness: state.totalVagueness,
                vaguenessPerClick: state.vaguenessPerClick,
                vaguenessPerSecond: state.vaguenessPerSecond
            })
        });
    } catch (e) {
        console.warn("Score submit failed:", e);
    }
}

// Fetch leaderboard from the server
export async function fetchLeaderboard() {
    try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        renderLeaderboard(data);
    } catch (e) {
        console.warn("Leaderboard fetch failed:", e);
    }
}