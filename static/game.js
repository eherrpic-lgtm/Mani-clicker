let vagueness = 0;
let vaguenessPerClick = 1;
let vaguenessPerSecond = 0;
let soundsEnabled = true;
let percentUpgradeCount = 0;
let percentUpgradeBaseCost = 5000;

const vaguenessDisplay = document.getElementById("vagueness-count");
const perClickDisplay = document.getElementById("vpc");
const perSecondDisplay = document.getElementById("vps");
const maniBtn = document.getElementById("mani");
const resetBtn = document.getElementById("reset-button");
const soundToggle = document.getElementById("sound-toggle");
let upgrades = [
    { id: "u1", label: "Vague notion", benefit: "+1/click", baseCost: 50, effect: () => {vaguenessPerClick += 1; }, unlocked: true },
    { id: "u2", label: "Ambiguous memo", benefit: "+1/sec", baseCost: 100, effect: () => {vaguenessPerSecond += 1; }, unlocked: false },
    { id: "u3", label: "Unclear strategy", benefit: "+3/click", baseCost: 500, effect: () => {vaguenessPerClick += 3; }, unlocked: false },
    { id: "u4", label: "Vague roadmap", benefit: "+3/sec", baseCost: 800, effect: () => {vaguenessPerSecond += 3; }, unlocked: false },
    { id: "u5", label: "Mystery meeting", benefit: "+8/click", baseCost: 4000, effect: () => {vaguenessPerClick += 8; }, unlocked: false },
    { id: "u6", label: "Consultant", benefit: "+10/sec", baseCost: 6000, effect: () => {vaguenessPerSecond += 10; }, unlocked: false },
    { id: "u7", label: "Nebulous vision", benefit: "+25/click", baseCost: 30000, effect: () => {vaguenessPerClick += 25; }, unlocked: false },
    { id: "u8", label: "Vague enterprise", benefit: "+50/sec", baseCost: 50000, effect: () => {vaguenessPerSecond += 50; }, unlocked: false },
    { id: "u9", label: "Abstract synergy", benefit: "+100/click", baseCost: 250000, effect: () => {vaguenessPerClick += 100; }, unlocked: false },
    { id: "u10", label: "Mani himself", benefit: "+500/sec", baseCost: 1000000, effect: () => {vaguenessPerSecond += 500; }, unlocked: false },
    { id: "u11", label: "Fuzzy objective", benefit: "+250/click", baseCost: 500000, effect: () => {vaguenessPerClick += 250; }, unlocked: false },
    { id: "u12", label: "Indeterminate forecast", benefit: "+1K/sec", baseCost: 2000000, effect: () => {vaguenessPerSecond += 1000; }, unlocked: false },
    { id: "u13", label: "Cryptic directive", benefit: "+750/click", baseCost: 5000000, effect: () => {vaguenessPerClick += 750; }, unlocked: false },
    { id: "u14", label: "Shapeless initiative", benefit: "+3K/sec", baseCost: 12000000, effect: () => {vaguenessPerSecond += 3000; }, unlocked: false },
    { id: "u15", label: "Undisclosed pivot", benefit: "+2K/click", baseCost: 40000000, effect: () => {vaguenessPerClick += 2000; }, unlocked: false },
    { id: "u16", label: "Vague disruption", benefit: "+10K/sec", baseCost: 100000000, effect: () => {vaguenessPerSecond += 10000; }, unlocked: false },
    { id: "u17", label: "Elusive paradigm", benefit: "+7.5K/click", baseCost: 350000000, effect: () => {vaguenessPerClick += 7500; }, unlocked: false },
    { id: "u18", label: "Murky ecosystem", benefit: "+40K/sec", baseCost: 1000000000, effect: () => {vaguenessPerSecond += 40000; }, unlocked: false },
    { id: "u19", label: "Ambiguous singularity", benefit: "+25K/click", baseCost: 5000000000, effect: () => {vaguenessPerClick += 25000; }, unlocked: false },
    { id: "u20", label: "The vibe", benefit: "+200K/sec", baseCost: 20000000000, effect: () => {vaguenessPerSecond += 200000; }, unlocked: false },
    { id: "u21", label: "Borderline coherent", benefit: "+75K/click", baseCost: 60000000000, effect: () => {vaguenessPerClick += 75000; }, unlocked: false },
    { id: "u22", label: "Phantom KPI", benefit: "+750K/sec", baseCost: 200000000000, effect: () => {vaguenessPerSecond += 750000; }, unlocked: false },
    { id: "u23", label: "Implied consensus", benefit: "+250K/click", baseCost: 600000000000, effect: () => {vaguenessPerClick += 250000; }, unlocked: false },
    { id: "u24", label: "Hollow framework", benefit: "+3M/sec", baseCost: 2000000000000, effect: () => {vaguenessPerSecond += 3000000; }, unlocked: false },
    { id: "u25", label: "Unspoken alignment", benefit: "+800K/click", baseCost: 7000000000000, effect: () => {vaguenessPerClick += 800000; }, unlocked: false },
    { id: "u26", label: "Ghostwritten whitepaper", benefit: "+12M/sec", baseCost: 25000000000000, effect: () => {vaguenessPerSecond += 12000000; }, unlocked: false },
    { id: "u27", label: "Deliberate ambiguity", benefit: "+3M/click", baseCost: 80000000000000, effect: () => {vaguenessPerClick += 3000000; }, unlocked: false },
    { id: "u28", label: "Vague legislation", benefit: "+50M/sec", baseCost: 300000000000000, effect: () => {vaguenessPerSecond += 50000000; }, unlocked: false },
    { id: "u29", label: "Redacted report", benefit: "+10M/click", baseCost: 900000000000000, effect: () => {vaguenessPerClick += 10000000; }, unlocked: false },
    { id: "u30", label: "Undefined terms & conditions", benefit: "+200M/sec", baseCost: 3000000000000000, effect: () => {vaguenessPerSecond += 200000000; }, unlocked: false },
    { id: "u31", label: "Classified briefing", benefit: "+40M/click", baseCost: 10000000000000000, effect: () => {vaguenessPerClick += 40000000; }, unlocked: false },
    { id: "u32", label: "Theoretical department", benefit: "+800M/sec", baseCost: 40000000000000000, effect: () => {vaguenessPerSecond += 800000000; }, unlocked: false },
    { id: "u33", label: "Speculative org chart", benefit: "+150M/click", baseCost: 150000000000000000, effect: () => {vaguenessPerClick += 150000000; }, unlocked: false },
    { id: "u34", label: "Cosmic misunderstanding", benefit: "+3B/sec", baseCost: 600000000000000000, effect: () => {vaguenessPerSecond += 3000000000; }, unlocked: false },
    { id: "u35", label: "The fog itself", benefit: "+1B/click", baseCost: 2000000000000000000, effect: () => {vaguenessPerClick += 1000000000; }, unlocked: false },
    { id: "u36", label: "Someone's dream about work", benefit: "+2B/sec", baseCost: 8000000000000000000, effect: () => {vaguenessPerSecond += 2000000000; }, unlocked: false },
    { id: "u37", label: "A feeling in the room", benefit: "+5B/click", baseCost: 30000000000000000000, effect: () => {vaguenessPerClick += 5000000000; }, unlocked: false },
    { id: "u38", label: "Vibes-based governance", benefit: "+8B/sec", baseCost: 100000000000000000000, effect: () => {vaguenessPerSecond += 8000000000; }, unlocked: false },
    { id: "u39", label: "The concept of maybe", benefit: "+15B/click", baseCost: 400000000000000000000, effect: () => {vaguenessPerClick += 15000000000; }, unlocked: false },
    { id: "u40", label: "Prophecy written in fog", benefit: "+30B/sec", baseCost: 1500000000000000000000, effect: () => {vaguenessPerSecond += 30000000000; }, unlocked: false },
    { id: "u41", label: "God's unread notification", benefit: "+60B/click", baseCost: 6000000000000000000000, effect: () => {vaguenessPerClick += 60000000000; }, unlocked: false },
    { id: "u42", label: "The universe shrugging", benefit: "+120B/sec", baseCost: 25000000000000000000000, effect: () => {vaguenessPerSecond += 120000000000; }, unlocked: false },
    { id: "u43", label: "Schrödinger's deliverable", benefit: "+250B/click", baseCost: 100000000000000000000000, effect: () => {vaguenessPerClick += 250000000000; }, unlocked: false },
    { id: "u44", label: "A rumour whispered to a black hole", benefit: "+500B/sec", baseCost: 400000000000000000000000, effect: () => {vaguenessPerSecond += 500000000000; }, unlocked: false },
    { id: "u45", label: "Primordial vagueness", benefit: "+1T/click", baseCost: 2000000000000000000000000, effect: () => {vaguenessPerClick += 1000000000000; }, unlocked: false },
    { id: "u46", label: "The shadow of an idea's ghost", benefit: "+2T/sec", baseCost: 8000000000000000000000000, effect: () => {vaguenessPerSecond += 2000000000000; }, unlocked: false },
    { id: "u47", label: "Interdimensional maybe", benefit: "+5T/click", baseCost: 35000000000000000000000000, effect: () => {vaguenessPerClick += 5000000000000; }, unlocked: false },
    { id: "u48", label: "The part before the big bang", benefit: "+10T/sec", baseCost: 150000000000000000000000000, effect: () => {vaguenessPerSecond += 10000000000000; }, unlocked: false },
    { id: "u49", label: "Vagueness achieving sentience", benefit: "+25T/click", baseCost: 700000000000000000000000000, effect: () => {vaguenessPerClick += 25000000000000; }, unlocked: false },
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

const activeSounds = [];
const upgradeCounts = {};
const upgradeCosts = {};

upgrades.forEach(u => {
    upgradeCounts[u.id] = 0;
    upgradeCosts[u.id] = u.baseCost;
})

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
    vagueness = parseInt(localStorage.getItem("vagueness")) || 0;
    vaguenessPerClick = parseInt(localStorage.getItem("vaguenessPerClick")) || 1;
    vaguenessPerSecond = parseInt(localStorage.getItem("vaguenessPerSecond")) || 0;
    const savedCounts = JSON.parse(localStorage.getItem("upgradeCounts") || "{}");
    const savedCosts = JSON.parse(localStorage.getItem("upgradeCosts") || "{}");
    soundsEnabled = localStorage.getItem("soundsEnabled") === "false" ? false : true;
    soundToggle.classList.toggle("on", soundsEnabled);
    upgrades.forEach(u => {
        if (savedCounts[u.id] !== undefined) upgradeCounts[u.id] = savedCounts[u.id];
        if (savedCosts[u.id] !== undefined) upgradeCosts[u.id] = savedCosts[u.id];
    });
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
        vaguenessPerClick *= 1.01;
        percentUpgradeCount++;
        updatePercentUpgradeUI();
        updateHUD();
    }
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

        buttonIcon.textContent = "🔧";
        btnTitle.textContent = u.label;
        btnBenefit.textContent = u.benefit;
        
        btn.disabled = vagueness < cost;

        btn.addEventListener("click", () => {
            if (vagueness >= cost) {
                vagueness -= cost;
                const upgradeCount = percentUpgradeCount;
                vaguenessPerClick = vaguenessPerClick / Math.pow(1.01, upgradeCount);
                u.effect();
                vaguenessPerClick = vaguenessPerClick * Math.pow(1.01, upgradeCount);
                upgradeCounts[u.id]++;
                upgradeCosts[u.id] = Math.floor(u.baseCost * Math.pow(1.15, upgradeCounts[u.id]));
                updateHUD();
                renderUpgrades();
            }
        });

        if (u.unlocked || vagueness >= u.baseCost / 1.25) {
            list.appendChild(btn);
            u.unlocked = true;
        }
    })
}

function updateHUD() {
    vaguenessDisplay.textContent = formatNumber(vagueness);
    localStorage.setItem("vagueness", vagueness);
    perClickDisplay.textContent = formatNumber(vaguenessPerClick);
    localStorage.setItem("vaguenessPerClick", vaguenessPerClick);
    perSecondDisplay.textContent = formatNumber(vaguenessPerSecond);
    localStorage.setItem("vaguenessPerSecond", vaguenessPerSecond);
    localStorage.setItem("upgradeCounts", JSON.stringify(upgradeCounts));
    localStorage.setItem("upgradeCosts", JSON.stringify(upgradeCosts));
    renderUpgrades();
    updatePercentUpgradeUI();
}

setInterval(updatevaguenessPerSecond, 1000);

function updatevaguenessPerSecond() {
    vagueness += vaguenessPerSecond;
    updateHUD();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playRandomManiSound() {
    if (!soundsEnabled) return;
    const randomIndex = getRandomInt(0, maniSounds.length - 1);
    const sound = new Audio(maniSounds[randomIndex].src);
    sound.volume = 1;
    sound.currentTime = 0;
    activeSounds.push(sound);

    sound.addEventListener("ended", () => {
        const idx = activeSounds.indexOf(sound);
        if (idx !== -1) activeSounds.splice(idx, 1);
    });

    const playPromise = sound.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("Audio play failed:", error);
        });
    }
}

maniBtn.addEventListener("click", () => {
    vagueness += vaguenessPerClick;
    playRandomManiSound();
    updateHUD();
})

updateHUD();
renderUpgrades();