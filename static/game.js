let vagueness = 0;
let baseVaguenessPerClick = 1;
let vaguenessPerClick = baseVaguenessPerClick;
let vaguenessPerSecond = 0;
let totalVagueness = 0;
let soundsEnabled = true;
let percentUpgradeCount = 0;
let percentUpgradeBaseCost = 5000;

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
    { id: "u1", label: "Vague notion", benefit: "+1/click", baseCost: 50, effect: () => {baseVaguenessPerClick += 1; }, unlocked: true },
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

const reachedMilestones = new Set();

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
    vaguenessPerClick = baseVaguenessPerClick * Math.pow(1.01, percentUpgradeCount);
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
        vaguenessPerClick = baseVaguenessPerClick * Math.pow(1.01, percentUpgradeCount);
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

function renderUpgrades() {
    const list = document.getElementById("upgrade-list");
    list.innerHTML = ""

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
            vaguenessPerClick = baseVaguenessPerClick * Math.pow(1.01, percentUpgradeCount);
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
            btn.classList.toggle("disabled", vagueness < cost);
            if (upgradeCounts[id] > 0) {
                buttonIcon.textContent = `x${upgradeCounts[id]}`;
            } else {
                buttonIcon.textContent = "🔧";
            }
            console.log("Made it here!")
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
    } catch (e) {
        console.error("Failed to save game state:", e);
    }
}

setInterval(saveGame, 30000);

window.addEventListener("beforeunload", saveGame);

let lastTick = Date.now();

setInterval(() => {
    const now = Date.now();
    const elapsed = now - lastTick;
    lastTick = now;

    console.log("tick", elapsed, vaguenessPerSecond);

    vagueness += (vaguenessPerSecond * elapsed/1000)
    totalVagueness += (vaguenessPerSecond * elapsed/1000);
    checkMilestones();
    updateHUD();
    console.log(totalVagueness)
}, 1000);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playRandomManiSound() {
    if (!soundsEnabled) return;
    const randomIndex = getRandomInt(0, preloadedSounds.length - 1);
    const sound = preloadedSounds[randomIndex];
    sound.currentTime = 0;
    sound.play().catch(err => console.error("Failed to play sound:", err));
}

maniBtn.addEventListener("click", () => {
    vagueness += vaguenessPerClick;
    totalVagueness += vaguenessPerClick;
    playRandomManiSound();
    spawnFloatingText(`+${formatNumber(vaguenessPerClick)}`);
    checkMilestones();
    updateHUD();
})

function spawnFloatingText(text) {
    const el = document.createElement("div");
    el.textContent = text;
    el.style.cssText = `
        position: absolute;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 13px;
        font-weight: 500;
        color: #2D4A1E;
        pointer-events: none;
        user-select: none;
        animation: floatUp 1s ease-out forwards;
    `;
    const rect = maniBtn.getBoundingClientRect();
    el.style.left = (rect.left + Math.random() * rect.width) + "px";
    el.style.top = (rect.top + window.scrollY - 10) + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

updateHUD();
renderUpgrades();