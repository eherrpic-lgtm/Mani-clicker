import { state, initState, addVagueness, prestige, queueUpdate, upgrades } from "./core.js";
import { updateHUD, updateUpgradeButtons, updatePrestigeUI, initFactoryName, renameFactory, renderUpgrades, showMilestone, closeAdminPopup } from "./ui.js";
import { buyUpgrade, buyPercentUpgrade } from "./upgrades.js";
import { doRandomEvent, scheduleNextEvent, checkMilestones } from "./events.js";
import { playRandomManiSound, toggleSounds } from "./sounds.js";
import { submitScore, fetchLeaderboard } from "./leaderboard.js";
import { pollAdmin } from "./admin.js";

// DOM Elements
const maniBtn = document.getElementById("mani");
const resetBtn = document.getElementById("reset-button");
const soundToggle = document.getElementById("sound-toggle");
const renameBtn = document.getElementById("rename-btn");
const percentUpgradeBtn = document.getElementById("percentUpgrade");
const prestigeBtn = document.getElementById("prestige-btn");
const adminPopupCloseBtn = document.getElementById("admin-popup-close-btn");

// Initialize the game
function init() {
    initState();
    initFactoryName();
    renderUpgrades();
    updateHUD();
    updatePrestigeUI();
    scheduleNextEvent();
    fetchLeaderboard();

    // Set up sound toggle
    if (soundToggle) {
        soundToggle.classList.toggle("on", state.soundsEnabled);
        soundToggle.addEventListener("click", toggleSounds);
    }

    // Set up click handler for Mani
    if (maniBtn) {
        let lastClickTime = 0;
        const CLICK_DEBOUNCE_MS = 50;
        maniBtn.addEventListener("click", () => {
            const now = Date.now();
            if (now - lastClickTime < CLICK_DEBOUNCE_MS) return;
            lastClickTime = now;

            addVagueness(state.vaguenessPerClick);
            state.clickStreak++;
            if (state.clickStreak > state.longestStreak) {
                state.longestStreak = state.clickStreak;
            }
            state.timeSinceLastClick = 0;
            state.lastClickTime = now;
            queueUpdate();
            playRandomManiSound();
        });
    }

    // Set up rename button
    if (renameBtn) {
        renameBtn.addEventListener("click", renameFactory);
    }

    // Set up percent upgrade button
    if (percentUpgradeBtn) {
        percentUpgradeBtn.addEventListener("click", () => {
            buyPercentUpgrade();
            queueUpdate();
        });
    }

    // Set up prestige button
    if (prestigeBtn) {
        prestigeBtn.addEventListener("click", prestige);
    }

    // Set up admin popup close button
    if (adminPopupCloseBtn) {
        adminPopupCloseBtn.addEventListener("click", closeAdminPopup);
    }

    // Set up reset button
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to reset your game? All progress will be lost.")) {
                localStorage.clear();
                location.reload();
            }
        });
    }

    // Set up passive income
    let lastPassiveUpdate = Date.now();
    setInterval(() => {
        const now = Date.now();
        if (now - lastPassiveUpdate < 100) return;
        lastPassiveUpdate = now;

        const passiveVagueness = state.vaguenessPerSecond * (now - lastPassiveUpdate) / 1000;
        if (passiveVagueness > 0) {
            addVagueness(passiveVagueness);
            queueUpdate();
        }
    }, 50);

    // Poll for admin messages
    setInterval(pollAdmin, 5000);

    // Submit score periodically
    setInterval(submitScore, 30000);

    // Check for milestones
    setInterval(checkMilestones, 1000);
}

// Start the game
init();