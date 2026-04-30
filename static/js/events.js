import { state, RANDOM_EVENTS, MILESTONES, queueUpdate } from "./core.js";
import { showMilestone } from "./ui.js";

// Trigger a random event
export function doRandomEvent() {
    const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
    event.effect();
    queueUpdate();
    showMilestone(event.message);

    setTimeout(() => {
        event.undo();
        queueUpdate();
        showMilestone(`The event "${event.message}" has ended.`);
    }, event.duration * 1000);
}

// Schedule random events
export function scheduleNextEvent() {
    setTimeout(() => {
        doRandomEvent();
        scheduleNextEvent();
    }, Math.floor(Math.random() * 90000) + 30000); // 30-120 seconds
}

// Check for milestones
export function checkMilestones() {
    MILESTONES.forEach(m => {
        if (state.vagueness >= m.threshold && !state.reachedMilestones.has(m.threshold)) {
            state.reachedMilestones.add(m.threshold);
            localStorage.setItem("reachedMilestones", JSON.stringify([...state.reachedMilestones]));
            showMilestone(m.message);
        }
    });
}