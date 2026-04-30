import { state, upgrades, queueUpdate } from "./core.js";
import { updateUpgradeButtons, showMilestone } from "./ui.js";

// Buy an upgrade
export function buyUpgrade(upgradeId) {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || state.vagueness < state.upgradeCosts[upgradeId]) return;

    state.vagueness -= state.upgradeCosts[upgradeId];
    upgrade.effect();
    state.upgradeCounts[upgradeId]++;
    state.upgradeCosts[upgradeId] = Math.floor(upgrade.baseCost * Math.pow(1.15, state.upgradeCounts[upgradeId]));
    localStorage.setItem(`upgradeCount_${upgradeId}`, state.upgradeCounts[upgradeId]);
    localStorage.setItem(`upgradeCost_${upgradeId}`, state.upgradeCosts[upgradeId]);

    // Unlock next upgrades if applicable
    upgrades.forEach(u => {
        if (!u.unlocked && state.vagueness >= u.baseCost / 1.25) {
            u.unlocked = true;
        }
    });

    queueUpdate();
}

// Buy percent upgrade
export function buyPercentUpgrade() {
    const cost = Math.floor(state.percentUpgradeBaseCost * Math.pow(1.15, state.percentUpgradeCount));
    if (state.vagueness < cost) return;

    state.vagueness -= cost;
    state.percentUpgradeCount++;
    state.percentUpgradeBaseCost = Math.floor(state.percentUpgradeBaseCost * 1.15);
    localStorage.setItem("percentUpgradeCount", state.percentUpgradeCount);
    localStorage.setItem("percentUpgradeBaseCost", state.percentUpgradeBaseCost);

    // Recalculate vagueness per click
    state.vaguenessPerClick = state.baseVaguenessPerClick * Math.pow(1.01, state.percentUpgradeCount) * state.eventClickMultiplier * state.prestigeMultiplier;
    queueUpdate();
}