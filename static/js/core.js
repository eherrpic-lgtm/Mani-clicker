// ========== CONSTANTS ==========
export const DEFAULT_NAMES = [
    "Vague Ventures Ltd.", "Ambiguity Corp.", "The Fog Institute",
    "Undefined Solutions", "Pending Confirmation LLC", "The Unclear Agency",
    "Misty Deliverables Inc.", "Circling Back GmbH", "To Be Determined Ltd.",
    "The Alignment Bureau", "Fuzzy Logic Enterprises", "Undisclosed Holdings",
    "Strategic Fog Partners", "The Synergy Collective", "Murky Outcomes Inc.",
    "Vague Horizons Ltd.", "The Framework Factory", "Implied Consensus Group",
    "Nebulous Systems Corp.", "The Pivot Department", "Hollow Metrics Ltd.",
    "The Stakeholder Void", "Adjacent Thinking Co.", "The Bandwidth Concern",
    "Theoretical Org LLC", "The North Star Division", "Unspecified Ventures",
    "The Ongoing Situation", "Phantom KPI Partners", "Vague Disruption Inc.",
    "The Offsite Bureau", "Misaligned Objectives Co.", "The Tiger Team Trust",
    "Cascading Ambiguity Ltd.", "The Deliverable Concern", "Pre-Vague Solutions",
    "The Looping Initiative", "Unclear Value Prop Inc.", "The Horizon Group",
    "Workshopped & Unresolved"
];

export const MILESTONES = [
    { threshold: 1000, message: "1,000 vagueness achieved. A promising lack of clarity." },
    { threshold: 1000000, message: "1 Million vagueness. Mani would be proud. Maybe." },
    { threshold: 1000000000, message: "1 Billion vagueness. The board has been notified. They have questions. No one will answer them." },
    { threshold: 1000000000000, message: "1 Trillion vagueness. You have transcended the org chart." },
    { threshold: 1000000000000000, message: "1 Quadrillion vagueness. The concept of clarity no longer applies to you." },
    { threshold: 1e18, message: "1 Quintillion vagueness. Mani himself has left the building." },
    { threshold: 1e21, message: "1 Sextillion vagueness. Regulators are concerned but cannot articulate why." },
    { threshold: 1e24, message: "1 Septillion vagueness. The universe has filed a complaint. It was too vague to process." },
];

export const RANDOM_EVENTS = [
    { id: "e1", message: "Mani is in a meeting. Clicks are worth double.", duration: 30, effect: () => { state.eventClickMultiplier = 2; }, undo: () => { state.eventClickMultiplier = 1; } },
    { id: "e2", message: "Someone has forwarded your email to the entire company. Clicks ×3 for 20 seconds.", duration: 20, effect: () => { state.eventClickMultiplier = 3; }, undo: () => { state.eventClickMultiplier = 1; } },
    { id: "e3", message: "A motivational speaker has entered the building. Clicks ×1.5.", duration: 45, effect: () => { state.eventClickMultiplier = 1.5; }, undo: () => { state.eventClickMultiplier = 1; } },
    { id: "e4", message: "The office coffee machine has been fixed. Clicks ×4 briefly.", duration: 15, effect: () => { state.eventClickMultiplier = 4; }, undo: () => { state.eventClickMultiplier = 1; } },
    { id: "e5", message: "Mani has left for lunch early. Unsupervised clicking ×2.5.", duration: 25, effect: () => { state.eventClickMultiplier = 2.5; }, undo: () => { state.eventClickMultiplier = 1; } },
    { id: "e6", message: "A vague initiative has been auto-approved. Passive income ×2 for 30 seconds.", duration: 30, effect: () => { state.eventSecondMultiplier = 2; }, undo: () => { state.eventSecondMultiplier = 1; } },
    { id: "e7", message: "The quarterly report has been deliberately obscured. Passive income ×3.", duration: 20, effect: () => { state.eventSecondMultiplier = 3; }, undo: () => { state.eventSecondMultiplier = 1; } },
    { id: "e8", message: "A consultant has submitted their invoice early. Passive income ×1.5.", duration: 60, effect: () => { state.eventSecondMultiplier = 1.5; }, undo: () => { state.eventSecondMultiplier = 1; } },
    { id: "e9", message: "Synergies have been detected in the wild. Passive income ×2 briefly.", duration: 20, effect: () => { state.eventSecondMultiplier = 2; }, undo: () => { state.eventSecondMultiplier = 1; } },
    { id: "e10", message: "The org chart has been restructured. Again. Passive income ×4 for 15 seconds.", duration: 15, effect: () => { state.eventSecondMultiplier = 4; }, undo: () => { state.eventSecondMultiplier = 1; } },
    { id: "e11", message: "Mani has gone off-script in a board presentation. Everything ×2.", duration: 20, effect: () => { state.eventClickMultiplier = 2; state.eventSecondMultiplier = 2; }, undo: () => { state.eventClickMultiplier = 1; state.eventSecondMultiplier = 1; } },
    { id: "e12", message: "A fire drill has been called. No one has left the building. Everything ×1.5.", duration: 40, effect: () => { state.eventClickMultiplier = 1.5; state.eventSecondMultiplier = 1.5; }, undo: () => { state.eventClickMultiplier = 1; state.eventSecondMultiplier = 1; } },
    { id: "e13", message: "The strategy deck has gone missing. Pure chaos. Everything ×3.", duration: 15, effect: () => { state.eventClickMultiplier = 3; state.eventSecondMultiplier = 3; }, undo: () => { state.eventClickMultiplier = 1; state.eventSecondMultiplier = 1; } },
    { id: "e14", message: "It is someone's birthday in the office. Productivity is abolished. Everything ×2.", duration: 30, effect: () => { state.eventClickMultiplier = 2; state.eventSecondMultiplier = 2; }, undo: () => { state.eventClickMultiplier = 1; state.eventSecondMultiplier = 1; } },
    { id: "e15", message: "A team offsite has been announced. No one is doing any work. Everything ×2.5.", duration: 25, effect: () => { state.eventClickMultiplier = 2.5; state.eventSecondMultiplier = 2.5; }, undo: () => { state.eventClickMultiplier = 1; state.eventSecondMultiplier = 1; } },
    { id: "e16", message: "Mani has requested clarification. Clicks halved for 20 seconds.", duration: 20, effect: () => { state.eventClickMultiplier = 0.5; }, undo: () => { state.eventClickMultiplier = 1; } },
    { id: "e17", message: "A mandatory compliance training has been scheduled. Passive income halved.", duration: 30, effect: () => { state.eventSecondMultiplier = 0.5; }, undo: () => { state.eventSecondMultiplier = 1; } },
    { id: "e18", message: "Someone has introduced a clarity framework. Everything slows down.", duration: 25, effect: () => { state.eventClickMultiplier = 0.5; state.eventSecondMultiplier = 0.5; }, undo: () => { state.eventClickMultiplier = 1; state.eventSecondMultiplier = 1; } },
    { id: "e19", message: "The VPN is down. Passive income reduced for 20 seconds.", duration: 20, effect: () => { state.eventSecondMultiplier = 0.75; }, undo: () => { state.eventSecondMultiplier = 1; } },
    { id: "e20", message: "A town hall has been called. All vagueness production paused briefly.", duration: 5, effect: () => { state.eventClickMultiplier = 0; state.eventSecondMultiplier = 0; }, undo: () => { state.eventClickMultiplier = 1; state.eventSecondMultiplier = 1; } },
];

// ========== GAME STATE ==========
export const state = {
    vagueness: 0,
    baseVaguenessPerClick: 1,
    vaguenessPerClick: 1,
    vaguenessPerSecond: 0,
    totalVagueness: 0,
    totalVaguenessSinceLastPrestige: 0,
    factoryName: "",
    percentUpgradeCount: 0,
    percentUpgradeBaseCost: 5000,
    upgradeCounts: {},
    upgradeCosts: {},
    eventClickMultiplier: 1,
    eventSecondMultiplier: 1,
    timeSinceLastClick: 0,
    lastClickTime: 0,
    clickStreak: 0,
    longestStreak: 0,
    prestigeCount: 0,
    prestigeMultiplier: 1,
    soundsEnabled: true,
    sort: false,
    reachedMilestones: new Set(),
};

// ========== UPGRADES ==========
export const upgrades = [
    { id: "u1", label: "Vague notion", benefit: "+1/click", baseCost: 30, effect: () => { state.baseVaguenessPerClick += 1; }, unlocked: true },
    { id: "u2", label: "Ambiguous memo", benefit: "+1/sec", baseCost: 100, effect: () => { state.vaguenessPerSecond += 1; }, unlocked: false },
    { id: "u3", label: "Unclear strategy", benefit: "+3/click", baseCost: 500, effect: () => { state.baseVaguenessPerClick += 3; }, unlocked: false },
    { id: "u4", label: "Vague roadmap", benefit: "+3/sec", baseCost: 800, effect: () => { state.vaguenessPerSecond += 3; }, unlocked: false },
    { id: "u5", label: "Mystery meeting", benefit: "+8/click", baseCost: 4000, effect: () => { state.baseVaguenessPerClick += 8; }, unlocked: false },
    { id: "u6", label: "Consultant", benefit: "+10/sec", baseCost: 6000, effect: () => { state.vaguenessPerSecond += 10; }, unlocked: false },
    { id: "u7", label: "Nebulous vision", benefit: "+25/click", baseCost: 30000, effect: () => { state.baseVaguenessPerClick += 25; }, unlocked: false },
    { id: "u8", label: "Vague enterprise", benefit: "+50/sec", baseCost: 50000, effect: () => { state.vaguenessPerSecond += 50; }, unlocked: false },
    { id: "u9", label: "Abstract synergy", benefit: "+100/click", baseCost: 250000, effect: () => { state.baseVaguenessPerClick += 100; }, unlocked: false },
    { id: "u10", label: "Mani himself", benefit: "+500/sec", baseCost: 1000000, effect: () => { state.vaguenessPerSecond += 500; }, unlocked: false },
];

// ========== CORE FUNCTIONS ==========
export function initState() {
    state.factoryName = localStorage.getItem("factoryName") || "";
    state.prestigeCount = parseInt(localStorage.getItem("prestigeCount") || "0");
    state.prestigeMultiplier = parseFloat(localStorage.getItem("prestigeMultiplier") || "1");
    state.totalVagueness = parseFloat(localStorage.getItem("totalVagueness") || "0");
    state.reachedMilestones = new Set(JSON.parse(localStorage.getItem("reachedMilestones") || "[]"));
    state.percentUpgradeCount = parseInt(localStorage.getItem("percentUpgradeCount") || "0");
    state.soundsEnabled = localStorage.getItem("soundsEnabled") !== "false";

    upgrades.forEach(u => {
        state.upgradeCounts[u.id] = parseInt(localStorage.getItem(`upgradeCount_${u.id}`) || "0");
        state.upgradeCosts[u.id] = parseFloat(localStorage.getItem(`upgradeCost_${u.id}`) || u.baseCost);
        u.unlocked = state.upgradeCounts[u.id] > 0 || u.id === "u1";
    });

    updateVaguenessPerClick();
}

export function updateVaguenessPerClick() {
    state.vaguenessPerClick = state.baseVaguenessPerClick * Math.pow(1.01, state.percentUpgradeCount) * state.eventClickMultiplier * state.prestigeMultiplier;
}

export function addVagueness(amount) {
    state.vagueness += amount;
    state.totalVagueness += amount;
    state.totalVaguenessSinceLastPrestige += amount;
}

export function getPrestigeMultiplier(count) {
    const steps = [1, 1.1, 1.35, 1.85, 2.85, 4.85];
    if (count >= steps.length) {
        return steps[steps.length - 1] + (count - (steps.length - 1)) * 2;
    }
    return steps[count];
}

export function prestige() {
    if (state.totalVagueness < 1e9) {
        showMilestone("Not enough vagueness to prestige. Keep going.");
        return;
    }

    const nextMultiplier = getPrestigeMultiplier(state.prestigeCount + 1);
    const confirmed = confirm(
        `Prestige #${state.prestigeCount + 1}\n\nAll progress will be reset.\nYour new permanent multiplier: x${nextMultiplier.toFixed(2)} on all production.\n\nAre you sure?`
    );
    if (!confirmed) return;

    state.prestigeCount++;
    state.prestigeMultiplier = getPrestigeMultiplier(state.prestigeCount);
    state.vagueness = 0;
    state.baseVaguenessPerClick = 1;
    state.vaguenessPerClick = 1;
    state.vaguenessPerSecond = 0;
    state.percentUpgradeCount = 0;
    state.eventClickMultiplier = 1;
    state.eventSecondMultiplier = 1;
    state.clickStreak = 0;
    state.reachedMilestones.clear();
    state.totalVaguenessSinceLastPrestige = 0;

    upgrades.forEach(u => {
        state.upgradeCounts[u.id] = 0;
        state.upgradeCosts[u.id] = u.baseCost;
        u.unlocked = u.id === "u1";
    });

    localStorage.setItem("prestigeCount", state.prestigeCount);
    localStorage.setItem("prestigeMultiplier", state.prestigeMultiplier);
    localStorage.setItem("totalVagueness", state.totalVagueness);
    localStorage.setItem("factoryName", state.factoryName);

    updateVaguenessPerClick();
    queueUpdate();
    renderUpgrades();
    updatePrestigeUI();
    showMilestone(`Prestige #${state.prestigeCount} achieved. Multiplier: x${state.prestigeMultiplier.toFixed(2)}`);
}

// Queue DOM updates
let needsUpdate = false;
export function queueUpdate() {
    if (!needsUpdate) {
        needsUpdate = true;
        requestAnimationFrame(() => {
            updateHUD();
            updateUpgradeButtons();
            needsUpdate = false;
        });
    }
}

// Placeholder functions (defined in other modules)
export function updateHUD() {}
export function updateUpgradeButtons() {}
export function showMilestone(message) {}
export function renderUpgrades() {}
export function updatePrestigeUI() {}