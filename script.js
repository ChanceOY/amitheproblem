const resultsPool = [
  {
    title: "Yes. Unfortunately, it is you.",
    badge: "Certified pattern recognition",
    subtext: "The quiz considered nuance, context, and your best intentions, then chose comedy over denial.",
    metrics: {
      "Deflection Rate": "11/10",
      "Mixed Signals": "industrial strength",
      "Apology Timing": "post-chaos",
      "Main Character Drift": "visible from space"
    }
  },
  {
    title: "Babe... it's looking incredibly you-shaped.",
    badge: "Soft launch of accountability",
    subtext: "Even under flattering lighting, the evidence kept outlining your silhouette with alarming precision.",
    metrics: {
      "Emotional Plot Twists": "hourly",
      "Vague Posting Index": "severe",
      "Receipt Review Habit": "forensic",
      "Closure Urgency": "red carpet"
    }
  },
  {
    title: "We checked twice. It's still you.",
    badge: "Double-verified disturbance",
    subtext: "A second opinion was requested, but sadly the second opinion also has eyes.",
    metrics: {
      "Conflict Replay Speed": "instant",
      "Selective Amnesia": "elite",
      "Text Tone Distortion": "cinematic",
      "Self-Editing": "declined"
    }
  },
  {
    title: "Respectfully, yes - you are the problem.",
    badge: "Luxury humility edition",
    subtext: "The site wanted to be gracious. Your answer choices wanted to be loud.",
    metrics: {
      "Passive Aggression Shine": "mirror finish",
      "Mind Reading Demand": "premium tier",
      "Dramatic Timing": "award-season",
      "Growth Arc": "loading"
    }
  },
  {
    title: "The algorithm did not hesitate.",
    badge: "Immediate concern detected",
    subtext: "Your selections moved with the confidence of someone who fully planned to blame the moon later.",
    metrics: {
      "Suspicious Timing": "immaculate",
      "Accountability Buffer": "3-5 business days",
      "Indirect Communication": "wireless",
      "Red Flag Styling": "glossy"
    }
  },
  {
    title: "It's giving... your fault.",
    badge: "Aestheticized responsibility",
    subtext: "Not in a harsh way. In a beautifully packaged, screenshot-worthy, statistically embarrassing way.",
    metrics: {
      "Petty Efficiency": "optimized",
      "Reply Delay Strategy": "committed",
      "Emotional Subtweet Energy": "unmistakable",
      "Pattern Awareness": "decorative"
    }
  },
  {
    title: "We regret to inform you that it was, in fact, your doing.",
    badge: "Formal notice of nonsense",
    subtext: "This conclusion arrived stamped, sealed, and carrying a folder labeled 'repeated behaviors.'",
    metrics: {
      "Excuse Inventory": "fully stocked",
      "Spiral Justification": "creative",
      "Healthy Communication": "misplaced",
      "Witness Credibility": "compromised by your texts"
    }
  },
  {
    title: "This could have been avoided by you.",
    badge: "Preventable incident report",
    subtext: "The tragedy here is not confusion. It is consistency.",
    metrics: {
      "Conflict Reboot Rate": "weekly finale",
      "Intuition vs Spiral": "blurred",
      "Being Normal Online": "temporary outage",
      "Lesson Retention": "symbolic"
    }
  },
  {
    title: "You may not love this result, but yes.",
    badge: "Emotionally inconvenient data",
    subtext: "The findings are tender, glossy, and still somehow dragging you with excellent posture.",
    metrics: {
      "Defensive Monologue": "pre-written",
      "Chaos Attraction": "magnetic",
      "Indirect Messaging": "fluently bilingual",
      "Personal Growth": "conceptual"
    }
  },
  {
    title: "In a shocking twist to absolutely nobody, it's you.",
    badge: "Publicly available secret",
    subtext: "The surprise element was explored thoroughly and then ruled out for lack of supporting evidence.",
    metrics: {
      "Self-Awareness Styling": "high gloss",
      "Blame Redirection": "Olympic level",
      "Reply Draft Count": "42",
      "Peace Tolerance": "critically low"
    }
  }
];

const instantTriggerBannerOptions = [
  "Early detection complete",
  "The system had enough information",
  "Two answers in and the verdict was unavoidable",
  "Behavioral sparkle scan complete"
];

const submitBanner = "Full analysis complete";

const state = {
  answers: {
    communicationStyle: "",
    conflictStyle: "",
    datingBehavior: "",
    textingHabits: "",
    accountabilityLevel: "",
    selfPerception: ""
  },
  locked: false,
  resultShown: false
};

const instantTriggerCombos = [
  { communicationStyle: "mind_reading", conflictStyle: "do_what_you_want" },
  { datingBehavior: "testing_people", accountabilityLevel: "feedback_disrespect" },
  { textingHabits: "post_indirectly", selfPerception: "thats_just_how_i_am" },
  { conflictStyle: "cry_first", datingBehavior: "spiraling_intuition" },
  { communicationStyle: "on_read", accountabilityLevel: "business_days" },
  { textingHabits: "delay_replies", datingBehavior: "lose_interest" }
];

const form = document.getElementById("quiz-form");
const resultSection = document.getElementById("result-section");
const resultBannerText = document.getElementById("result-banner-text");
const resultBadge = document.getElementById("result-badge");
const resultTitle = document.getElementById("result-title");
const resultSubtext = document.getElementById("result-subtext");
const probabilityScore = document.getElementById("probability-score");
const meterFill = document.getElementById("meter-fill");
const metricsGrid = document.getElementById("metrics-grid");
const resetTopButton = document.getElementById("reset-top-button");
const resetResultButton = document.getElementById("reset-result-button");
const quizStatus = document.getElementById("quiz-status");
const submitButton = document.getElementById("submit-button");

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomProbability() {
  return Math.floor(Math.random() * 8) + 93;
}

function getAnsweredCount() {
  return Object.values(state.answers).filter(Boolean).length;
}

function updateSelectStyles() {
  const selects = form.querySelectorAll("select");
  selects.forEach((select) => {
    select.classList.toggle("has-value", Boolean(select.value));
  });
}

function setQuizLocked(locked) {
  state.locked = locked;
  form.classList.toggle("is-locked", locked);

  const selects = form.querySelectorAll("select");
  selects.forEach((select) => {
    select.disabled = locked;
  });

  submitButton.disabled = locked;
}

function renderMetrics(metrics) {
  metricsGrid.innerHTML = "";

  Object.entries(metrics).forEach(([label, value]) => {
    const metric = document.createElement("div");
    metric.className = "metric-card";

    const labelElement = document.createElement("span");
    labelElement.textContent = label;

    const valueElement = document.createElement("strong");
    valueElement.textContent = value;

    metric.append(labelElement, valueElement);
    metricsGrid.appendChild(metric);
  });
}

function showResult(result, bannerText) {
  state.resultShown = true;
  setQuizLocked(true);

  const probability = getRandomProbability();
  resultBannerText.textContent = bannerText;
  resultBadge.textContent = result.badge;
  resultTitle.textContent = result.title;
  resultSubtext.textContent = result.subtext;
  probabilityScore.textContent = `${probability}%`;
  meterFill.style.width = `${probability}%`;

  renderMetrics(result.metrics);
  resultSection.classList.remove("hidden");
  resultSection.classList.remove("reveal");
  void resultSection.offsetWidth;
  resultSection.classList.add("reveal");
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  resultSection.focus();
}

function comboMatches(combo) {
  return Object.entries(combo).every(([key, value]) => state.answers[key] === value);
}

function checkInstantTrigger() {
  if (state.locked || state.resultShown) {
    return false;
  }

  const matchedCombo = instantTriggerCombos.find(comboMatches);
  if (!matchedCombo) {
    return false;
  }

  quizStatus.textContent = "Verdict reached early. Additional testimony has been suspended.";
  showResult(getRandomItem(resultsPool), getRandomItem(instantTriggerBannerOptions));
  return true;
}

function handleAnswerChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement)) {
    return;
  }

  state.answers[target.name] = target.value;
  updateSelectStyles();

  if (!checkInstantTrigger()) {
    const answeredCount = getAnsweredCount();
    quizStatus.textContent = answeredCount
      ? `${answeredCount} of 6 categories selected.`
      : "";
  }
}

function allQuestionsAnswered() {
  return Object.values(state.answers).every(Boolean);
}

function handleSubmit(event) {
  event.preventDefault();

  if (state.locked || state.resultShown) {
    return;
  }

  if (!allQuestionsAnswered()) {
    quizStatus.textContent = "Choose one answer in all six categories before running the full analysis.";
    return;
  }

  quizStatus.textContent = "Analysis complete. The findings remain devastating.";
  showResult(getRandomItem(resultsPool), submitBanner);
}

function resetQuiz() {
  state.answers = {
    communicationStyle: "",
    conflictStyle: "",
    datingBehavior: "",
    textingHabits: "",
    accountabilityLevel: "",
    selfPerception: ""
  };
  state.resultShown = false;

  form.reset();
  updateSelectStyles();
  setQuizLocked(false);
  resultSection.classList.add("hidden");
  resultSection.classList.remove("reveal");
  resultBannerText.textContent = "Verdict loading";
  quizStatus.textContent = "Selections cleared. Your reputation has been temporarily restored.";
  meterFill.style.width = "0";
}

form.addEventListener("change", handleAnswerChange);
form.addEventListener("submit", handleSubmit);
resetTopButton.addEventListener("click", resetQuiz);
resetResultButton.addEventListener("click", resetQuiz);

updateSelectStyles();
