import { state, queueUpdate } from "./core.js";
import { showAdminPopup } from "./ui.js";

// Poll for admin messages/overrides
export async function pollAdmin() {
    if (!state.factoryName) return;
    try {
        const res = await fetch("/api/poll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                factoryName: state.factoryName,
                vagueness: state.vagueness,
                vaguenessPerClick: state.vaguenessPerClick,
                vaguenessPerSecond: state.vaguenessPerSecond,
                totalVagueness: state.totalVagueness
            })
        });
        const data = await res.json();
        if (data.message) {
            showAdminPopup(data.message);
        }
        if (data.override_vpc !== undefined) {
            state.baseVaguenessPerClick = data.override_vpc;
            state.vaguenessPerClick = state.baseVaguenessPerClick * Math.pow(1.01, state.percentUpgradeCount) * state.eventClickMultiplier * state.prestigeMultiplier;
            queueUpdate();
        }
        if (data.override_vps !== undefined) {
            state.vaguenessPerSecond = data.override_vps;
            queueUpdate();
        }
        if (data.override_vagueness !== undefined) {
            state.vagueness = data.override_vagueness;
            state.totalVagueness = data.override_vagueness;
            queueUpdate();
        }
    } catch (e) {
        console.error("Poll failed:", e);
    }
}