import { state } from "./core.js";

export const maniSounds = [
    { id: "tooVague", src: "/static/too-vague.3gp" },
    { id: "unClear", src: "/static/unclear.3gp" },
    { id: "beMoreSpecific", src: "/static/be-more-specific.3gp" },
    { id: "thisMakesNoSense", src: "/static/this-makes-no-sense.3gp" },
    { id: "whatIsThisSupposedToMean", src: "/static/what-is-this-supposed-to-mean.3gp" },
    { id: "whereDoesThisIdeaComeFrom", src: "/static/where-does-this-idea-come-from.3gp" },
];

const loadedSounds = new Map();

export function playSound(soundId) {
    if (!state.soundsEnabled) return;
    const sound = maniSounds.find(s => s.id === soundId);
    if (!sound) return;

    if (!loadedSounds.has(soundId)) {
        loadedSounds.set(soundId, new Audio(sound.src));
    }
    loadedSounds.get(soundId).currentTime = 0;
    loadedSounds.get(soundId).play().catch(e => console.warn("Sound play failed:", e));
}

export function playRandomManiSound() {
    if (!state.soundsEnabled) return;
    const sound = maniSounds[Math.floor(Math.random() * maniSounds.length)];
    playSound(sound.id);
}

// Toggle sounds
export function toggleSounds() {
    state.soundsEnabled = !state.soundsEnabled;
    localStorage.setItem("soundsEnabled", state.soundsEnabled);
    const soundToggle = document.getElementById("sound-toggle");
    if (soundToggle) {
        soundToggle.classList.toggle("on", state.soundsEnabled);
    }
}