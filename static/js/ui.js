import { state } from "./core.js";

// Format numbers (e.g., 1000 -> "1K")
export function formatNumber(num) {
    if (num < 1000) return num.toFixed(0);
    if (num < 1000000) return (num / 1000).toFixed(1) + "K";
    if (num < 1000000000) return (num / 1000000).toFixed(1) + "M";
    if (num < 1000000000000) return (num / 1000000000).toFixed(1) + "B";
    return (num / 1000000000000).toFixed(1) + "T";
}

// Update the HUD
export function updateHUD() {
    document.getElementById("vagueness-count").textContent = formatNumber(state.vagueness);
    document.getElementById("vpc").textContent = formatNumber(state.vaguenessPerClick);
    document.getElementById("vps").textContent = formatNumber(state.vaguenessPerSecond);
    document.getElementById("total-vagueness").textContent = formatNumber(state.totalVagueness);
}