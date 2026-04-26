let vagueness = 0;
let baseVaguenessPerClick = 1;
let vaguenessPerClick = baseVaguenessPerClick;
let vaguenessPerSecond = 0;
let totalVagueness = 0;
let soundsEnabled = true;
let percentUpgradeCount = 0;
let percentUpgradeBaseCost = 5000;
let eventClickMultiplier = 1;
let eventSecondMultiplier = 1;
let sort = false;
let timeSinceLastClick = 0;
let lastClickTime = 0;
let clickStreak = 0;
let longestStreak = 0;
let factoryName = localStorage.getItem("factoryName") || "";
let prestigeCount = 0;
let prestigeMultiplier = 1; 

const vaguenessDisplay = document.getElementById("vagueness-count");
const perClickDisplay = document.getElementById("vpc");
const perSecondDisplay = document.getElementById("vps");
const totalVaguenessDisplay = document.getElementById("total-vagueness");
const maniBtn = document.getElementById("mani");
const resetBtn = document.getElementById("reset-button");
const soundToggle = document.getElementById("sound-toggle");

function formatTime(seconds) {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

let upgrades = [
    { id: "u1", label: "Vague notion", benefit: "+1/click", baseCost: 30, effect: () => {baseVaguenessPerClick += 1; }, unlocked: true },
    { id: "u2", label: "Ambiguous memo", benefit: "+1/sec", baseCost: 100, effect: () => {vaguenessPerSecond += 1; }, unlocked: false },
    { id: "u3", label: "Unclear strategy", benefit: "+3/click", baseCost: 500, effect: () => {baseVaguenessPerClick += 3; }, unlocked: false },
    { id: "u4", label: "Vague roadmap", benefit: "+3/sec", baseCost: 800, effect: () => {vaguenessPerSecond += 3; }, unlocked: false },
    { id: "u5", label: "Mystery meeting", benefit: "+8/click", baseCost: 4000, effect: () => {baseVaguenessPerClick += 8; }, unlocked: false },
    { id: "u6", label: "Consultant", benefit: "+10/sec", baseCost: 6000, effect: () => {vaguenessPerSecond += 10; }, unlocked: false },
    { id: "u7", label: "Nebulous vision", benefit: "+25/click", baseCost: 30000, effect: () => {baseVaguenessPerClick += 25; }, unlocked: false },
    { id: "u8", label: "Vague enterprise", benefit: "+50/sec", baseCost: 50000, effect: () => {vaguenessPerSecond += 50; }, unlocked: false },
    { id: "u9", label: "Abstract synergy", benefit: "+100/click", baseCost: 250000, effect: () => {baseVaguenessPerClick += 100; }, unlocked: false },
    { id: "u10", label: "Mani himself", benefit: "+500/sec", baseCost: 1000000, effect: () => {vaguenessPerSecond += 500; }, unlocked: false },
    { id: "u11", label: "Fuzzy objective", benefit: "+250/click", baseCost: 500000, effect: () => {baseVaguenessPerClick += 250; }, unlocked: false },
    { id: "u12", label: "Indeterminate forecast", benefit: "+1K/sec", baseCost: 2000000, effect: () => {vaguenessPerSecond += 1000; }, unlocked: false },
    { id: "u13", label: "Cryptic directive", benefit: "+750/click", baseCost: 5000000, effect: () => {baseVaguenessPerClick += 750; }, unlocked: false },
    { id: "u14", label: "Shapeless initiative", benefit: "+3K/sec", baseCost: 12000000, effect: () => {vaguenessPerSecond += 3000; }, unlocked: false },
    { id: "u15", label: "Undisclosed pivot", benefit: "+2K/click", baseCost: 40000000, effect: () => {baseVaguenessPerClick += 2000; }, unlocked: false },
    { id: "u16", label: "Vague disruption", benefit: "+10K/sec", baseCost: 100000000, effect: () => {vaguenessPerSecond += 10000; }, unlocked: false },
    { id: "u17", label: "Elusive paradigm", benefit: "+7.5K/click", baseCost: 350000000, effect: () => {baseVaguenessPerClick += 7500; }, unlocked: false },
    { id: "u18", label: "Murky ecosystem", benefit: "+40K/sec", baseCost: 1000000000, effect: () => {vaguenessPerSecond += 40000; }, unlocked: false },
    { id: "u19", label: "Ambiguous singularity", benefit: "+25K/click", baseCost: 5000000000, effect: () => {baseVaguenessPerClick += 25000; }, unlocked: false },
    { id: "u20", label: "The vibe", benefit: "+200K/sec", baseCost: 20000000000, effect: () => {vaguenessPerSecond += 200000; }, unlocked: false },
    { id: "u21", label: "Borderline coherent", benefit: "+75K/click", baseCost: 60000000000, effect: () => {baseVaguenessPerClick += 75000; }, unlocked: false },
    { id: "u22", label: "Phantom KPI", benefit: "+750K/sec", baseCost: 200000000000, effect: () => {vaguenessPerSecond += 750000; }, unlocked: false },
    { id: "u23", label: "Implied consensus", benefit: "+250K/click", baseCost: 600000000000, effect: () => {baseVaguenessPerClick += 250000; }, unlocked: false },
    { id: "u24", label: "Hollow framework", benefit: "+3M/sec", baseCost: 2000000000000, effect: () => {vaguenessPerSecond += 3000000; }, unlocked: false },
    { id: "u25", label: "Unspoken alignment", benefit: "+800K/click", baseCost: 7000000000000, effect: () => {baseVaguenessPerClick += 800000; }, unlocked: false },
    { id: "u26", label: "Ghostwritten whitepaper", benefit: "+12M/sec", baseCost: 25000000000000, effect: () => {vaguenessPerSecond += 12000000; }, unlocked: false },
    { id: "u27", label: "Deliberate ambiguity", benefit: "+3M/click", baseCost: 80000000000000, effect: () => {baseVaguenessPerClick += 3000000; }, unlocked: false },
    { id: "u28", label: "Vague legislation", benefit: "+50M/sec", baseCost: 300000000000000, effect: () => {vaguenessPerSecond += 50000000; }, unlocked: false },
    { id: "u29", label: "Redacted report", benefit: "+10M/click", baseCost: 900000000000000, effect: () => {baseVaguenessPerClick += 10000000; }, unlocked: false },
    { id: "u30", label: "Undefined terms & conditions", benefit: "+200M/sec", baseCost: 3000000000000000, effect: () => {vaguenessPerSecond += 200000000; }, unlocked: false },
    { id: "u31", label: "Classified briefing", benefit: "+40M/click", baseCost: 10000000000000000, effect: () => {baseVaguenessPerClick += 40000000; }, unlocked: false },
    { id: "u32", label: "Theoretical department", benefit: "+800M/sec", baseCost: 40000000000000000, effect: () => {vaguenessPerSecond += 800000000; }, unlocked: false },
    { id: "u33", label: "Speculative org chart", benefit: "+150M/click", baseCost: 150000000000000000, effect: () => {baseVaguenessPerClick += 150000000; }, unlocked: false },
    { id: "u34", label: "Cosmic misunderstanding", benefit: "+3B/sec", baseCost: 600000000000000000, effect: () => {vaguenessPerSecond += 3000000000; }, unlocked: false },
    { id: "u35", label: "The fog itself", benefit: "+1B/click", baseCost: 2000000000000000000, effect: () => {baseVaguenessPerClick += 1000000000; }, unlocked: false },
    { id: "u36", label: "Someone's dream about work", benefit: "+2B/sec", baseCost: 8000000000000000000, effect: () => {vaguenessPerSecond += 2000000000; }, unlocked: false },
    { id: "u37", label: "A feeling in the room", benefit: "+5B/click", baseCost: 30000000000000000000, effect: () => {baseVaguenessPerClick += 5000000000; }, unlocked: false },
    { id: "u38", label: "Vibes-based governance", benefit: "+8B/sec", baseCost: 100000000000000000000, effect: () => {vaguenessPerSecond += 8000000000; }, unlocked: false },
    { id: "u39", label: "The concept of maybe", benefit: "+15B/click", baseCost: 400000000000000000000, effect: () => {baseVaguenessPerClick += 15000000000; }, unlocked: false },
    { id: "u40", label: "Prophecy written in fog", benefit: "+30B/sec", baseCost: 1500000000000000000000, effect: () => {vaguenessPerSecond += 30000000000; }, unlocked: false },
    { id: "u41", label: "God's unread notification", benefit: "+60B/click", baseCost: 6000000000000000000000, effect: () => {baseVaguenessPerClick += 60000000000; }, unlocked: false },
    { id: "u42", label: "The universe shrugging", benefit: "+120B/sec", baseCost: 25000000000000000000000, effect: () => {vaguenessPerSecond += 120000000000; }, unlocked: false },
    { id: "u43", label: "Schrödinger's deliverable", benefit: "+250B/click", baseCost: 100000000000000000000000, effect: () => {baseVaguenessPerClick += 250000000000; }, unlocked: false },
    { id: "u44", label: "A rumour whispered to a black hole", benefit: "+500B/sec", baseCost: 400000000000000000000000, effect: () => {vaguenessPerSecond += 500000000000; }, unlocked: false },
    { id: "u45", label: "Primordial vagueness", benefit: "+1T/click", baseCost: 2000000000000000000000000, effect: () => {baseVaguenessPerClick += 1000000000000; }, unlocked: false },
    { id: "u46", label: "The shadow of an idea's ghost", benefit: "+2T/sec", baseCost: 8000000000000000000000000, effect: () => {vaguenessPerSecond += 2000000000000; }, unlocked: false },
    { id: "u47", label: "Interdimensional maybe", benefit: "+5T/click", baseCost: 35000000000000000000000000, effect: () => {baseVaguenessPerClick += 5000000000000; }, unlocked: false },
    { id: "u48", label: "The part before the big bang", benefit: "+10T/sec", baseCost: 150000000000000000000000000, effect: () => {vaguenessPerSecond += 10000000000000; }, unlocked: false },
    { id: "u49", label: "Vagueness achieving sentience", benefit: "+25T/click", baseCost: 700000000000000000000000000, effect: () => {baseVaguenessPerClick += 25000000000000; }, unlocked: false },
    { id: "u50", label: "The answer to everything, probably", benefit: "+100T/sec", baseCost: 5000000000000000000000000000, effect: () => {vaguenessPerSecond += 100000000000000; }, unlocked: false },
];

const maniSounds = [
    {id: "tooVague", class: "store_upgrade", src: "/static/too-vague.3gp"},
    {id: "unClear", class: "store_upgrade", src: "/static/unclear.3gp"},
    {id: "beMoreSpecific", class: "store_upgrade", src: "/static/be-more-specific.3gp"},
    {id: "thisMakesNoSense", class: "store_upgrade", src: "/static/this-makes-no-sense.3gp"},
    {id: "whatIsThisSupposedToMean", class: "store_upgrade", src: "/static/what-is-this-supposed-to-mean.3gp"},
    {id: "whereDoesThisIdeaComeFrom", class: "store_upgrade", src: "/static/where-does-this-idea-come-from.3gp"},
];

const tickerMessages = [
    { minVagueness: 0, messages: [
        "Somewhere, a memo is going unread.",
        "A strategy is being workshopped. No one knows what it means.",
        "A meeting has been scheduled to discuss the meeting.",
        "The deliverable has been delivered. No one is sure what it was.",
        "Action items have been noted. They will not be acted upon.",
        "A vision is being aligned. It was already vague to begin with.",
        "Someone has sent a follow-up to the follow-up.",
        "The brief has been briefed. Clarity was not achieved.",
        "A stakeholder has been identified. They are also confused.",
        "Synergies are being explored. No one will report back.",
        "A pivot is being considered. From what, to what, remains unclear.",
        "The agenda has been circulated. It raises more questions than it answers.",
        "Someone is looping someone else in. The loop is infinite.",
        "A workshop has been proposed. The outcomes are pre-vague.",
        "Bandwidth is being assessed. Results are inconclusive.",
        "The onboarding document has been updated. It is now longer and less clear.",
        "A thought leader has had a thought. It has not yet been verified.",
        "An out-of-office reply has been sent. It is somehow also vague.",
        "The team is aligned. On what, exactly, is still being workshopped.",
        "A deck is being prepared. It will raise more questions than it answers.",
    ]},
    { minVagueness: 1000000, messages: [
        "Sources close to the situation are unable to clarify.",
        "The roadmap has been updated. It is vaguer than before.",
        "A press release has been drafted. It confirms nothing.",
        "The strategy has been stratified. No one can see the bottom.",
        "Mani has reviewed the proposal. He has concerns. They are unspecified.",
        "A consultant has been consulted. Their findings are pending, indefinitely.",
        "The initiative has been initiated. Further details are forthcoming, eventually.",
        "Leadership is aware of the situation. Leadership is also the situation.",
        "A framework has been frameworked. Its structural integrity is theoretical.",
        "The KPIs have been identified. They will not be measured.",
        "An all-hands has been called. The hands are not sure why.",
        "The north star has been located. It is behind significant cloud cover.",
        "A tiger team has been assembled. The tiger is metaphorical. Probably.",
        "Alignment has been achieved at the executive level. It will not trickle down.",
        "The customer journey has been mapped. The customer did not consent to this.",
        "A task force has been tasked. The force is weak.",
        "Quarterly targets have been set. They were immediately made more ambiguous.",
        "The brand voice has been defined as 'clear but mysterious'.",
        "An escalation path has been documented. No one has taken it.",
        "The roadmap has a horizon. The horizon is moving away from us.",
    ]},
    { minVagueness: 1000000000, messages: [
        "Regulators are monitoring the vagueness. Vaguely.",
        "Mani has entered the chat. He has questions. No answers.",
        "The vagueness has achieved critical mass. Scientists are baffled.",
        "International observers have noted the situation. Their notes are unclear.",
        "A government body has convened to address the vagueness. The convening was itself vague.",
        "The fog has been declared a natural landmark.",
        "Historians will note this moment. Their notes will be inconclusive.",
        "The vagueness has been recognised at the UN. The resolution was non-binding.",
        "Philosophers have weighed in. They have made things considerably worse.",
        "A think tank is thinking. Results expected never.",
        "The vagueness has gone viral. No one can explain why. Or what it is.",
        "Academic papers are being written. Their abstracts are already too vague to abstract.",
        "The vagueness has been granted a patent. The patent is for 'something, roughly'.",
        "An AI has attempted to summarise the vagueness. It has become vague.",
        "The vagueness is now self-sustaining. Intervention is no longer possible.",
        "A crisis committee has formed. Their mandate is unclear by design.",
        "The vagueness has been nominated for an award. The category is undefined.",
        "Mani has issued a statement. It contained no verifiable information.",
        "The fog has elected a representative. The representative is also fog.",
        "Reality has filed a formal complaint. It was too vague to process.",
    ]},
];  

const milestones = [
    { threshold: 1000, message: "1,000 vagueness achieved. A promising lack of clarity." },
    { threshold: 1000000, message: "1 Million vagueness. Mani would be proud. Maybe." },
    { threshold: 1000000000, message: "1 Billion vagueness. The board has been notified. They have questions. No one will answer them." },
    { threshold: 1000000000000, message: "1 Trillion vagueness. You have transcended the org chart." },
    { threshold: 1000000000000000, message: "1 Quadrillion vagueness. The concept of clarity no longer applies to you." },
    { threshold: 1e18, message: "1 Quintillion vagueness. Mani himself has left the building." },
    { threshold: 1e21, message: "1 Sextillion vagueness. Regulators are concerned but cannot articulate why." },
    { threshold: 1e24, message: "1 Septillion vagueness. The universe has filed a complaint. It was too vague to process." },
];

const randomEvents = [
    { id: "e1", message: "Mani is in a meeting. Clicks are worth double.", duration: 30, effect: () => {eventClickMultiplier = 2}, undo: () => {eventClickMultiplier = 1} },
    { id: "e2", message: "Someone has forwarded your email to the entire company. Clicks ×3 for 20 seconds.", duration: 20, effect: () => {eventClickMultiplier = 3}, undo: () => {eventClickMultiplier = 1} },
    { id: "e3", message: "A motivational speaker has entered the building. Clicks ×1.5.", duration: 45, effect: () => {eventClickMultiplier = 1.5}, undo: () => {eventClickMultiplier = 1} },
    { id: "e4", message: "The office coffee machine has been fixed. Clicks ×4 briefly.", duration: 15, effect: () => {eventClickMultiplier = 4}, undo: () => {eventClickMultiplier = 1} },
    { id: "e5", message: "Mani has left for lunch early. Unsupervised clicking ×2.5.", duration: 25, effect: () => {eventClickMultiplier = 2.5}, undo: () => {eventClickMultiplier = 1} },
    
    { id: "e6", message: "A vague initiative has been auto-approved. Passive income ×2 for 30 seconds.", duration: 30, effect: () => {eventSecondMultiplier = 2}, undo: () => {eventSecondMultiplier = 1} },
    { id: "e7", message: "The quarterly report has been deliberately obscured. Passive income ×3.", duration: 20, effect: () => {eventSecondMultiplier = 3}, undo: () => {eventSecondMultiplier = 1} },
    { id: "e8", message: "A consultant has submitted their invoice early. Passive income ×1.5.", duration: 60, effect: () => {eventSecondMultiplier = 1.5}, undo: () => {eventSecondMultiplier = 1} },
    { id: "e9", message: "Synergies have been detected in the wild. Passive income ×2 briefly.", duration: 20, effect: () => {eventSecondMultiplier = 2}, undo: () => {eventSecondMultiplier = 1} },
    { id: "e10", message: "The org chart has been restructured. Again. Passive income ×4 for 15 seconds.", duration: 15, effect: () => {eventSecondMultiplier = 4}, undo: () => {eventSecondMultiplier = 1} },
    
    { id: "e11", message: "Mani has gone off-script in a board presentation. Everything ×2.", duration: 20, effect: () => { eventClickMultiplier = 2; eventSecondMultiplier = 2; }, undo: () => { eventClickMultiplier = 1; eventSecondMultiplier = 1; } },
    { id: "e12", message: "A fire drill has been called. No one has left the building. Everything ×1.5.", duration: 40, effect: () => { eventClickMultiplier = 1.5; eventSecondMultiplier = 1.5; }, undo: () => { eventClickMultiplier = 1; eventSecondMultiplier = 1; } },
    { id: "e13", message: "The strategy deck has gone missing. Pure chaos. Everything ×3.", duration: 15, effect: () => { eventClickMultiplier = 3; eventSecondMultiplier = 3; }, undo: () => { eventClickMultiplier = 1; eventSecondMultiplier = 1; } },
    { id: "e14", message: "It is someone's birthday in the office. Productivity is abolished. Everything ×2.", duration: 30, effect: () => { eventClickMultiplier = 2; eventSecondMultiplier = 2; }, undo: () => { eventClickMultiplier = 1; eventSecondMultiplier = 1; } },
    { id: "e15", message: "A team offsite has been announced. No one is doing any work. Everything ×2.5.", duration: 25, effect: () => { eventClickMultiplier = 2.5; eventSecondMultiplier = 2.5; }, undo: () => { eventClickMultiplier = 1; eventSecondMultiplier = 1; } },
    
    { id: "e16", message: "Mani has requested clarification. Clicks halved for 20 seconds.", duration: 20, effect: () => {eventClickMultiplier = 0.5}, undo: () => {eventClickMultiplier = 1} },
    { id: "e17", message: "A mandatory compliance training has been scheduled. Passive income halved.", duration: 30, effect: () => {eventSecondMultiplier = 0.5}, undo: () => {eventSecondMultiplier = 1} },
    { id: "e18", message: "Someone has introduced a clarity framework. Everything slows down.", duration: 25, effect: () => { eventClickMultiplier = 0.5; eventSecondMultiplier = 0.5; }, undo: () => { eventClickMultiplier = 1; eventSecondMultiplier = 1; } },
    { id: "e19", message: "The VPN is down. Passive income reduced for 20 seconds.", duration: 20, effect: () => {eventSecondMultiplier = 0.75}, undo: () => {eventSecondMultiplier = 1} },
    { id: "e20", message: "A town hall has been called. All vagueness production paused briefly.", duration: 5, effect: () => { eventClickMultiplier = 0; eventSecondMultiplier = 0; }, undo: () => { eventClickMultiplier = 1; eventSecondMultiplier = 1; } },
];

const defaultNames = [
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

function initFactoryName() {
    if (!factoryName) {
        const name = prompt("Name your vagueness factory:");
        if (name && name.trim()) {
            factoryName = name.trim().slice(0, 64);
        } else {
            factoryName = defaultNames[getRandomInt(0, defaultNames.length - 1)];
        }
        localStorage.setItem("factoryName", factoryName);
    }
    document.getElementById("factory-name").textContent = factoryName;
}

function renameFactory() {
    const name = prompt("Rename your factory: ", factoryName);
    if (name && name.trim()) {
        factoryName = name.trim().slice(0, 64);
        localStorage.setItem("factoryName", factoryName)
        document.getElementById("factory-name").textContent = factoryName;
    }
}

function getPrestigeMultiplier(count) {
    const steps = [1,1.1, 1.35, 1.85, 2.85, 4.85];
    if (count >= steps.length) {
        return steps[steps.length - 1] + (count - (steps.length - 1)) * 2;
    }
    return steps[count];
}

function prestige() {
    if (totalVagueness < 1e9) {
        showMilestone("Not enough vageness to prestige. Keep going.");
        return;
    }

    const nextMultiplier = getPrestigeMultiplier(prestigeCount + 1);
    const confirmed = confirm(
        `Prestige #${prestigeCount + 1}\n\nAll progress will be reset.\nYour new permanent multiplier: x${nextMultiplier.toFixed(2)} on all production. \n\nAre you sure?`
    );
    if (!confirmed) return;

    prestigeCount ++;
    prestigeMultiplier = getPrestigeMultiplier(prestigeCount);

    vagueness = 0;
    baseVaguenessPerClick = 1;
    vaguenessPerSecond = 0;
    percentUpgradeCount = 0;
    eventClickMultiplier = 1;
    eventSecondMultiplier = 1;
    clickStreak = 0;
    reachedMilestones.clear();

    upgrades.forEach(u => {
        upgradeCounts[u.id] = 0;
        upgradeCosts[u.id] = u.baseCost;
        u.unlocked = u.id === "u1";
    });

    const prestigeData = {
        prestigeCount,
        prestigeMultiplier,
        totalVagueness,
        factoryName
    };

    localStorage.clear();
    localStorage.setItem("prestigeCount", prestigeCount);
    localStorage.setItem("prestigeMultiplier", prestigeMultiplier);
    localStorage.setItem("totalVagueness", totalVagueness);
    localStorage.setItem("factoryName", factoryName);

    updateHUD();
    renderUpgrades();
    updatePrestigeUI();
    showMilestone(`Prestige #${prestigeCount} achieved. Multiplier: x${prestigeMultiplier.toFixed(2)}`);
}

function updatePrestigeUI(){
    const btn = document.getElementById("prestige-btn");
    const info = document.getElementById("prestige-info");
    if (!btn || !info) return;

    const canPrestige = totalVagueness >= 1e9;
    btn.style.opacity = canPrestige ? "1" : "0.4";
    btn.style.cursor = canPrestige ? "pointer" : "not-allowed";

    const nextMultiplier = getPrestigeMultiplier(prestigeCount + 1);
    info.textContent = prestigeCount === 0 
        ? `Prestige at 1B total vagueness - next bonus: x${nextMultiplier.toFixed(2)}`
        : `Prestige #${upgardeCount} - multiplier: x${prestigeMultiplier.toFixed(2)} - next: x${nextMultiplier.toFixed(2)}`;
}

// -- Leaderboard ---------------------------------------------------

async function submitScore() {
    if (!factoryName) return;
    try {
        await fetch("api/score", {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({
                factoryName, 
                totalVagueness,
                vaguenessPerClick,
                vaguenessPerSecond
            })
        });
    } catch (e) {
        console.warn("Score submit failed: ", e);
    }
}

async function fetchLeaderBoard() {
    try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        renderLeaderboard(data);
    } catch (e) {
        console.warn("Leaderboard fetch failed: ", e)
    }
}

function renderLeaderboard (entries) {
    const list = document.getElementById("leaderboard-list");
    if (!list) return;
    list.innerHTML = "";
    if (entries.length === 0) {
        list.innerHTML = `<li class = "lb-empty">No entries yet. Be the first.</li>`;
        return;
    }
    entries.forEach((entry, i) => {
        const li = document.createElement("li");
        li.className = "lb-entry";
        li.innerHTML = `
            <span class = "lb-rank">#${i + 1}</span>
            <span class = "lb-name">${entry.factoryName}</span>
            <span class = "lb-score">${formatNumber(entry.totalVagueness)}</span>
        `;
        list.appendChild(li);
    })
}

// --------- Admin poll ---------------------------------

async function pollAdmin() {
    if (!factoryName) return;
    try {
        const res = await fetch("/api/poll", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                factoryName,
                vagueness,
                vaguenessPerClick,
                vaguenessPerSecond,
                totalVagueness 
            })
        });
        const data = await res.json();
        if (data.message) {
            showAdminPopup(`${data.message}`);
        }
        if (data.override_vpc !== undefined) {
            baseVaguenessPerClick = data.override_vpc;
            vaguenessPerClick = baseVaguenessPerClick * Math.pow(1.01, percentUpgradeCount) * eventClickMultiplier * prestigeMultiplier;
            updateHUD();
        }
        if (data.override_vps !== undefined) {
            vaguenessPerSecond = data.override_vps;
            updateHUD();
        }
        if (data.override_vagueness !== undefined) {
            vagueness = data.override_vagueness;
            totalVagueness = data.override_vagueness;
            updateHUD(); 
        }
        console.log("Sync & Poll succeeded");
    } catch (e) {
        console.error("Sync & Poll failed:", e);
    }
}

const reachedMilestones = new Set();

function doRandomEvent() {
    let index = getRandomInt(0, randomEvents.length - 1);
    const event = randomEvents[index];
    event.effect();
    updateHUD();
    showMilestone(event.message);
    setTimeout(() => {
        event.undo();
        updateHUD();
        showMilestone(`The event "${event.message}" has ended.`);
    }, event.duration * 1000);
    
}

function scheduleNextEvent() {
    setTimeout(() => {
        doRandomEvent();
        scheduleNextEvent();
    }, getRandomInt(30000, 120000));
}
scheduleNextEvent();

function checkMilestones() {
    milestones.forEach(m => {
        if (vagueness >= m.threshold && !reachedMilestones.has(m.threshold)) {
            reachedMilestones.add(m.threshold);
            localStorage.setItem("reachedMilestones", JSON.stringify([...reachedMilestones]));
            showMilestone(m.message);
        }
    });
    updateUpgradeButtons();
}

function showMilestone(message) {
    const el = document.createElement("div");
    el.textContent = message;
    el.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #2D4A1E;
        color: #D4ECC0;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        padding: 12px 20px;
        border-radius: 2px;
        max-width: 400px;
        text-align: center;
        z-index: 9999;
        animation: fadeInOut 4s ease forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
}

function showAdminPopup(message) {
    const overlay = document.getElementById("admin-popup-overlay");
    const text = document.getElementById("admin-popup-text");
    
    text.textContent = message;
    overlay.style.display = "flex";
    
    // Play a sound if enabled to grab attention
    if (typeof playRandomManiSound === "function") {
        playRandomManiSound();
    }
}

function closeAdminPopup() {
    document.getElementById("admin-popup-overlay").style.display = "none";
}

const preloadedSounds = maniSounds.map(s => {
    const audio = new Audio(s.src);
    audio.load();
    return audio;
})

const activeSounds = [];
const upgradeCounts = {};
const upgradeCosts = {};

upgrades.forEach(u => {
    upgradeCounts[u.id] = 0;
    upgradeCosts[u.id] = u.baseCost;
})

function randomTickerMessage() {
    const textBox = document.getElementById("tickerBox");
    
    let tier;
    if (totalVagueness >= 1000000000) {
        tier = tickerMessages[2].messages;
    } else if (totalVagueness >= 1000000) {
        tier = tickerMessages[1].messages;
    } else {
        tier = tickerMessages[0].messages;
    }
    
    const message = tier[getRandomInt(0, tier.length - 1)];
    
    textBox.style.opacity = 0;
    setTimeout(() => {
        textBox.textContent = message;
        textBox.style.opacity = 1;
    }, 500);
}

randomTickerMessage();
setInterval(randomTickerMessage, 6000)

function formatNumber(n) {
    const suffixes = [
        "", "K", "M", "B", "T",
        "Qd", "Qi", "Sx", "Sp", "Oc", "No",
        "Dc", "UDc", "DDc", "TDc", "QdDc", "QiDc", "SxDc", "SpDc", "OcDc", "NoDc",
        "Vg", "UVg", "DVg", "TVg", "QdVg", "QiVg", "SxVg", "SpVg", "OcVg", "NoVg",
        "Tg", "UTg", "DTg", "TTg", "QdTg", "QiTg", "SxTg", "SpTg", "OcTg", "NoTg",
    ];

    // Beyond the named suffixes, generate e.g. "e123"
    const log = Math.floor(Math.log10(Math.abs(n)));
    if (!isFinite(log) || n < 1000) return Math.floor(n).toString();

    const tier = Math.floor(log / 3);

    if (tier < suffixes.length) {
        const value = n / Math.pow(10, tier * 3);
        return value.toFixed(2).replace(/\.00$/, "") + suffixes[tier];
    }

    // Fallback: scientific notation styled as e.g. "3.4e123"
    return n.toExponential(2).replace("e+", "e");
}

function load() {
    vagueness = parseFloat(localStorage.getItem("vagueness")) || 0;
    baseVaguenessPerClick = parseFloat(localStorage.getItem("baseVaguenessPerClick")) || 1;
    vaguenessPerSecond = parseFloat(localStorage.getItem("vaguenessPerSecond")) || 0;
    const savedCounts = JSON.parse(localStorage.getItem("upgradeCounts") || "{}");
    const savedCosts = JSON.parse(localStorage.getItem("upgradeCosts") || "{}");
    vaguenessPerClick = baseVaguenessPerClick * Math.pow(1.01, percentUpgradeCount) * eventClickMultiplier * prestigeMultiplier;
    soundsEnabled = localStorage.getItem("soundsEnabled") === "false" ? false : true;
    soundToggle.classList.toggle("on", soundsEnabled);
    upgrades.forEach(u => {
        if (savedCounts[u.id] !== undefined) upgradeCounts[u.id] = savedCounts[u.id];
        if (savedCosts[u.id] !== undefined) upgradeCosts[u.id] = savedCosts[u.id];
    });
    const savedUnlocked = JSON.parse(localStorage.getItem("unlockedUpgrades") || "[]");
    savedUnlocked.forEach(id => {
        const u = upgrades.find(u => u.id === id);
        if (u) u.unlocked = true;
    })
    percentUpgradeCount = parseInt(localStorage.getItem("percentUpgradeCount")) || 0;
    const savedMilestones = JSON.parse(localStorage.getItem("reachedMilestones") || "[]");
    savedMilestones.forEach(t => reachedMilestones.add(t));
    
    const lastSeen = parseInt(localStorage.getItem("lastSeen")) || null;
    if (lastSeen) {
        const secondsAway = Math.floor((Date.now() - lastSeen) / 1000);
        if (secondsAway > 10 && vaguenessPerSecond > 0) {
            const earned = secondsAway * vaguenessPerSecond;
            vagueness += earned;
            alert(`Welcome back! You were away for ${formatTime(secondsAway)} and earned ${formatNumber(earned)} vagueness.`);
        }
    }
    
    totalVagueness = parseFloat(localStorage.getItem("totalVagueness")) || 0;
    prestigeCount = parseInt(localStorage.getItem("prestigeCount")) || 0;
    prestigeMultiplier = parseInt(localStorage.getItem("prestigeMultiplier")) || 1;
    updateHUD();
}

load();

resetBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

soundToggle.addEventListener("click", () => {
    soundsEnabled = !soundsEnabled;
    localStorage.setItem("soundsEnabled", soundsEnabled);
    soundToggle.classList.toggle("on", soundsEnabled);
    if (!soundsEnabled) {
        activeSounds.forEach(s => s.pause());
        activeSounds.length = 0;
    }
});

function getPercentUpgradeCost() {
    return Math.floor(percentUpgradeBaseCost * Math.pow(100, percentUpgradeCount));
}

document.getElementById("percentUpgrade").addEventListener("click", () => {
    const cost = getPercentUpgradeCost();
    if (vagueness >= cost) {
        vagueness -= cost;
        vaguenessPerClick = baseVaguenessPerClick * Math.pow(1.01, percentUpgradeCount) * eventClickMultiplier * prestigeMultiplier;
        percentUpgradeCount++;
        updateHUD();
        updateUpgradeButtons();
        updatePercentUpgradeUI();
    }
    localStorage.setItem("percentUpgradeCount", percentUpgradeCount);
});

function updatePercentUpgradeUI() {
    const cost = getPercentUpgradeCost();
    document.getElementById("percentUpgradeCost").textContent = `Cost: ${formatNumber(cost)}`;
    document.getElementById("percentUpgrade").style.opacity = vagueness >= cost ? "1" : "0.5";
}

function sortUpgrades(upgrades) {
    upgrades.sort((a,b) => {
        const costA = upgradeCosts[a.id];
        const costB = upgradeCosts[b.id];
        return costA - costB
    })

    return upgrades
}

function randomEvent() {
    const event = Math.random();
}

function renderUpgrades() {
    const list = document.getElementById("upgrade-list");
    list.innerHTML = ""

    upgrades = sort ? sortUpgrades(upgrades) : upgrades;
    //upgrades = sortUpgrades(upgrades);

    upgrades.forEach(u => {
        const cost = Math.floor(upgradeCosts[u.id])

        const btn = document.createElement("button")
        btn.className = "upgrade-btn";
        btn.dataset.id = u.id;

        const leftDiv = document.createElement("div");
        leftDiv.classList.add("btn-left");

        const buttonIcon = document.createElement("div");
        buttonIcon.classList.add("btn-icon");

        const btnText = document.createElement("div");
        btnText.classList.add("btn-text");

        const btnTitle = document.createElement("div");
        btnTitle.classList.add("btn-title");

        const btnBenefit = document.createElement("div");
        btnBenefit.classList.add("btn-benefit");

        const btnPrice = document.createElement("div");
        btnPrice.classList.add("btn-price");

        const costLabel = document.createElement("div");
        costLabel.classList.add("cost-label");
        costLabel.textContent = "cost";

        const priceMain = document.createElement("div");
        priceMain.classList.add("price-label");
        priceMain.textContent = formatNumber(cost);

        btnPrice.classList.add("btn-price");
        btnPrice.appendChild(costLabel);
        btnPrice.appendChild(priceMain);
        btn.appendChild(leftDiv);
        leftDiv.appendChild(buttonIcon);
        leftDiv.appendChild(btnText);
        btnText.appendChild(btnTitle);
        btnText.appendChild(btnBenefit);
        btn.appendChild(btnPrice);
        
        if (upgradeCounts[u.id] > 0) {
            buttonIcon.textContent = `x${upgradeCounts[u.id]}`;
        } else {
            buttonIcon.textContent = "🔧";
        }
        btnTitle.textContent = u.label;
        btnBenefit.textContent = u.benefit;
        
        btn.classList.toggle("disabled", vagueness < cost);

        btn.addEventListener("click", () => {
            const currentCost = Math.floor(upgradeCosts[u.id]);
            if (vagueness < currentCost) return;
            vagueness -= currentCost;
            const upgradeCount = percentUpgradeCount;
            u.effect();
            vaguenessPerClick = baseVaguenessPerClick * Math.pow(1.01, percentUpgradeCount) * eventClickMultiplier * prestigeMultiplier;
            upgradeCounts[u.id]++;
            upgradeCosts[u.id] = Math.floor(u.baseCost * Math.pow(1.15, upgradeCounts[u.id]));
            updateHUD();
            updateUpgradeButtons();
        });

        if (u.unlocked || vagueness >= u.baseCost / 1.25) {
            list.appendChild(btn);
            u.unlocked = true;
            localStorage.setItem("unlockedUpgrades", JSON.stringify(
                upgrades.filter(u => u.unlocked).map(u => u.id)
            ))
        }
    })
}

function updateUpgradeButtons() {
    try {
        document.querySelectorAll(".upgrade-btn").forEach(btn => {
            const id = btn.dataset.id;
            const upgrade = upgrades.find(u => u.id === id);
            if (!upgrade) return;
            const cost = Math.floor(upgradeCosts[upgrade.id]);
            const costLabel = btn.querySelector(".cost-label");
            const priceMain = btn.querySelector(".price-label");
            const buttonIcon = btn.querySelector(".btn-icon");
            costLabel.textContent = "cost";
            priceMain.textContent = formatNumber(cost);
            if (upgradeCounts[id] > 0) {
                buttonIcon.textContent = `x${upgradeCounts[id]}`;
            } else {
                buttonIcon.textContent = "🔧";
            }
            if (btn.unlocked || vagueness >= btn.baseCost / 1.25) {
                list.appendChild(btn);
                u.unlocked = true;
                localStorage.setItem("unlockedUpgrades", JSON.stringify(
                    upgrades.filter(u => u.unlocked).map(u => u.id)
                ))
            }
        });
    } catch (e) {
        console.error("Error updating upgrade buttons:", e);
    }
}

function updateHUD() {
    vaguenessDisplay.textContent = formatNumber(vagueness);
    perClickDisplay.textContent = formatNumber(vaguenessPerClick);
    perSecondDisplay.textContent = formatNumber(vaguenessPerSecond);
    totalVaguenessDisplay.textContent = formatNumber(totalVagueness);
    localStorage.setItem("lastSeen", Date.now());
    updatePercentUpgradeUI();
    updatePrestigeUI();
}

function saveGame() {
    try {
        localStorage.setItem("vagueness", vagueness);
        localStorage.setItem("baseVaguenessPerClick", baseVaguenessPerClick);
        localStorage.setItem("vaguenessPerSecond", vaguenessPerSecond);
        localStorage.setItem("upgradeCounts", JSON.stringify(upgradeCounts));
        localStorage.setItem("upgradeCosts", JSON.stringify(upgradeCosts));
        localStorage.setItem("percentUpgradeCount", percentUpgradeCount);
        localStorage.setItem("totalVagueness", totalVagueness);
        console.log("Game state saved");
        submitScore();
    } catch (e) {
        console.error("Failed to save game state:", e);
    }
}

setInterval(saveGame, 30000);

window.addEventListener("beforeunload", () => {
    saveGame();
    submitScore();
    fetchLeaderBoard();
    eventClickMultiplier = 1;
    eventSecondMultiplier = 1;
});

let lastTick = Date.now();

setInterval(() => {
    const now = Date.now();
    const elapsed = now - lastTick;
    lastTick = now;

    vagueness += (vaguenessPerSecond * eventSecondMultiplier * prestigeMultiplier * elapsed/1000)
    totalVagueness += (vaguenessPerSecond * eventSecondMultiplier * prestigeMultiplier * elapsed/1000);
    checkMilestones();
    updateHUD();
}, 1000);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playRandomManiSound() {
    if (!soundsEnabled) return;

    const randomIndex = getRandomInt(0, preloadedSounds.length - 1);
    const originalSound = preloadedSounds[randomIndex];

    const soundClone = originalSound.cloneNode();

    const randomSpeed = getRandomInt(60, 200) / 100;

    soundClone.playbackRate = randomSpeed;

    soundClone.preservePitch = false;

    soundClone.play().catch(err => console.error("Playback failed: ", err));

    soundClone.onended = function() {
        soundClone.remove();
    };
}

maniBtn.addEventListener("click", (e) => {
    const now = Date.now();
    lastClickTime = now;
    timeSinceLastClick = 0;
    
    clickStreak++;

    const clickVagueness = vaguenessPerClick * (1 + (clickStreak > 150 ? 150 : clickStreak) / 100)
    vagueness += clickVagueness;
    totalVagueness += vaguenessPerClick;
    playRandomManiSound();
    spawnFloatingText(`+${formatNumber(clickVagueness)}`, 13, e, "top", 500, false);
    if (clickStreak > 1) {
        spawnFloatingText(`x${clickStreak}`, 30, e, "cursor", 600, true)
    }
    checkMilestones();
    updateHUD();
})

setInterval(() => {
    if (Date.now()-lastClickTime > 1000) {
        longestStreak = clickStreak;
        clickStreak = 0;
    }
}, 100);

function spawnFloatingText(text, fontsize, e, position, weight, spin) {
    const el = document.createElement("div");
    el.textContent = text;
    el.style.cssText = `
        position: absolute;
        font-family: 'IBM Plex Mono', monospace;
        font-size: ${fontsize}px;
        font-weight: ${weight};
        color: #2D4A1E;
        pointer-events: none;
        user-select: none;
        animation: floatUp 1s ease-out forwards;
    `;

    if (spin) {
        let spinDirection = getRandomInt(1,2);
        const animName = spinDirection == 1 ? "spinLeft" : "spinRight";
        el.style.animation = `${animName} 0.8s ease-in-out forwards`;
    }
    
    const rect = maniBtn.getBoundingClientRect();
    if (position == "middle") {
        el.style.left = (rect.left + Math.random() * (rect.width / 2) + rect.width / 4) + "px";    
    } else {
        el.style.left = (rect.left + Math.random() * rect.width) + "px";
    }
    if (position == "top") {
        el.style.top = (rect.top + window.scrollY - 10) + "px";
    } else if (position == "middle") {
        el.style.top = (rect.top + rect.height / 2 + window.scrollY - 10) + "px";
    } else if (position == "bottom") {
        el.style.top = (rect.bottom + window.scrollY - 10) + "px";
    } else if (position == "cursor") {
        el.style.left = (e.clientX + window.scrollX + getRandomInt(-10, 10)) + "px";
        el.style.top = (e.clientY + window.scrollY + getRandomInt(-10, 10)) + "px";
    } else {
        console.error("Invalid y position when calling spawnFloatingText()")
    }

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

function addVagueness(amount) {
    vagueness += amount;
    totalVagueness += amount;
}

function multiplyVagueness(amount) {
    difference = vagueness * amount - amount;
    vagueness += difference;
    totalVagueness += difference;
}

updateHUD();
renderUpgrades();
initFactoryName();
fetchLeaderBoard();
setInterval(fetchLeaderBoard, 60000);
setInterval(pollAdmin, 5000);