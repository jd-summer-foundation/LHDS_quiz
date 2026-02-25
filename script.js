const SIGNUP_URL = "https://www.summerfoundation.org.au/what-we-do/building-better-homes/";
const LOGO_PATH = "/assets/summer-foundation-logo.svg";

const QUESTIONS = [
  {
    id: "step_free_entry",
    areaLabel: "Step-free entry",
    prompt: "Can you go from the footpath into your home without having to navigate any steps?",
    options: [
      { label: "Yes - it's step-free.", points: 2 },
      { label: "There's one small step.", points: 1 },
      { label: "There are multiple steps.", points: 0 },
    ],
    feedbackByPoints: {
      2: "Level entry makes it easier for all to enter or exit a home.",
      1: "Fewer steps can make it easier and safer when entering or exiting.",
      0: "Multiple steps at the entrance can make it harder as balance or mobility worsens.",
    },
  },
  {
    id: "shower",
    areaLabel: "Level-entry shower",
    prompt: "Do you have a shower with level entry?",
    options: [
      { label: "Yes - it's level entry (no step or lip).", points: 2 },
      { label: "There's a small lip, edge, or step-down.", points: 1 },
      { label: "It's a shower over a bath.", points: 0 },
    ],
    feedbackByPoints: {
      2: "Level entry for a shower is ideal to create a safe environment.",
      1: "While better than an over-bath shower, level entry is even better to support ageing in place.",
      0: "Climbing over a bath edge to shower creates a fall risk.",
    },
  },
  {
    id: "doors_corridors",
    areaLabel: "Doors and corridors",
    prompt: "Are your doors and corridors wide enough for you?",
    options: [
      { label: "Yes - it's easy to move through my home, even if using a walker.", points: 2 },
      { label: "Some doors or corridors are tricky.", points: 1 },
      { label: "Most or all doors or corridors are tricky.", points: 0 },
    ],
    feedbackByPoints: {
      2: "Wider doors and corridors help make a home suitable for all ages and stages of life.",
      1: "The easier it is to move within your home, the more that home supports ageing in place.",
      0: "Narrow doors and corridors can make it harder to get around safely within a home.",
    },
  },
];

const RESULT_BANDS = [
  {
    min: 5,
    max: 6,
    title: "Strong foundation",
    messages: [
      "Your home already includes several features that support ageing in place.",
      "These features can make everyday life easier over time.",
    ],
  },
  {
    min: 3,
    max: 4,
    title: "Good start, with room to grow",
    messages: [
      "Your home has some helpful features.",
      "There may be a few areas that could become trickier over time.",
      "Thinking ahead can make a big difference.",
    ],
  },
  {
    min: 0,
    max: 2,
    title: "A few barriers today - and a chance to plan ahead",
    messages: [
      "Many homes include steps, narrow spaces or shower-over-bath designs.",
      "Small changes or future housing decisions can make life easier.",
      "It's never too early to think about what will suit you long term.",
    ],
  },
];

const appState = {
  screen: "welcome",
  questionIndex: 0,
  answers: Array(QUESTIONS.length).fill(null),
};

const quizCard = document.getElementById("quiz-card");
const mainContent = document.getElementById("main-content");
const logo = document.getElementById("brand-logo");

if (logo) {
  logo.src = LOGO_PATH;
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getScore() {
  return appState.answers.reduce((sum, answerIndex, questionIndex) => {
    if (answerIndex === null) return sum;
    return sum + QUESTIONS[questionIndex].options[answerIndex].points;
  }, 0);
}

function getResultBand(score) {
  return RESULT_BANDS.find((band) => score >= band.min && score <= band.max);
}

function resetQuiz(screen = "welcome") {
  appState.screen = screen;
  appState.questionIndex = 0;
  appState.answers = Array(QUESTIONS.length).fill(null);
}

function getStatusForPoints(points) {
  if (points === 2) {
    return { emoji: "🟢", label: "Strong", className: "score-green" };
  }

  if (points === 1) {
    return { emoji: "🟡", label: "Mixed", className: "score-yellow" };
  }

  return { emoji: "🔴", label: "May be challenging", className: "score-red" };
}

function renderWelcome() {
  quizCard.innerHTML = `
    <h2 class="welcome-title">Let's take a quick look at how your home supports you as you get older.</h2>
    <p class="intro">This isn't a test - just a few simple questions to help you think about what makes a home easier to live in over time.</p>
    <div class="button-row">
      <button id="start-btn" class="button-primary" type="button">Start <span class="button-icon" aria-hidden="true">&rarr;</span></button>
    </div>
  `;

  document.getElementById("start-btn")?.addEventListener("click", () => {
    appState.screen = "question";
    appState.questionIndex = 0;
    render();
  });
}

function renderQuestion() {
  const index = appState.questionIndex;
  const question = QUESTIONS[index];
  const selected = appState.answers[index];

  const optionsMarkup = question.options
    .map(
      (option, optionIndex) => `
        <label class="option-card" for="${question.id}_${optionIndex}">
          <input
            type="radio"
            name="${question.id}"
            id="${question.id}_${optionIndex}"
            value="${optionIndex}"
            ${selected === optionIndex ? "checked" : ""}
          />
          <span class="option-text">${escapeHtml(option.label)}</span>
        </label>
      `
    )
    .join("");

  quizCard.innerHTML = `
    <p class="progress">Question ${index + 1} of ${QUESTIONS.length}</p>
    <form id="question-form">
      <fieldset>
        <legend class="question-title">${escapeHtml(question.prompt)}</legend>
        <div class="options">${optionsMarkup}</div>
      </fieldset>
      <div class="button-row">
        ${
          index > 0
            ? '<button id="back-btn" class="button-secondary" type="button"><span class="button-icon" aria-hidden="true">&larr;</span> Back</button>'
            : ""
        }
        <button id="start-over-btn" class="button-secondary" type="button"><span class="button-icon" aria-hidden="true">&#x21bb;</span> Start over</button>
        <button id="next-btn" class="button-primary" type="submit" ${selected === null ? "disabled" : ""}>
          ${index === QUESTIONS.length - 1 ? 'See Results <span class="button-icon" aria-hidden="true">&rarr;</span>' : 'Next <span class="button-icon" aria-hidden="true">&rarr;</span>'}
        </button>
      </div>
    </form>
  `;

  quizCard.querySelectorAll(`input[name="${question.id}"]`).forEach((radio) => {
    radio.addEventListener("change", (event) => {
      appState.answers[index] = Number(event.target.value);
      const nextBtn = document.getElementById("next-btn");
      if (nextBtn) nextBtn.disabled = false;
    });
  });

  document.getElementById("back-btn")?.addEventListener("click", () => {
    appState.questionIndex -= 1;
    render();
  });

  document.getElementById("start-over-btn")?.addEventListener("click", () => {
    resetQuiz("welcome");
    render();
  });

  document.getElementById("question-form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (appState.answers[index] === null) {
      return;
    }

    if (index < QUESTIONS.length - 1) {
      appState.questionIndex += 1;
      render();
      return;
    }

    appState.screen = "results";
    render();
  });
}

function renderResults() {
  const score = getScore();
  const band = getResultBand(score);
  const areaResultsMarkup = QUESTIONS.map((question, questionIndex) => {
    const answerIndex = appState.answers[questionIndex];
    const points = answerIndex === null ? 0 : question.options[answerIndex].points;
    const status = getStatusForPoints(points);
    const feedbackText =
      answerIndex === null
        ? "No answer selected."
        : (question.feedbackByPoints?.[points] ?? question.options[answerIndex].label);

    return `
      <li class="area-result ${status.className}">
        <p class="area-result-title"><strong>${escapeHtml(question.areaLabel)}:</strong> ${status.emoji} ${escapeHtml(status.label)}</p>
        <p class="area-result-answer">${escapeHtml(feedbackText)}</p>
      </li>
    `;
  }).join("");

  if (!band) {
    quizCard.innerHTML = "<p>There was a problem showing your result. Please try again.</p>";
    return;
  }

  quizCard.innerHTML = `
    <h2 class="results-title">${escapeHtml(band.title)}</h2>
    <p class="score-line"><strong>Area-by-area results</strong></p>
    <ul class="area-results">${areaResultsMarkup}</ul>
    <p class="score-line"><strong>Total score: ${score}/6</strong></p>
    <ul class="band-message">
      ${band.messages.map((message) => `<li>${escapeHtml(message)}</li>`).join("")}
    </ul>

    <h3>What these features can help with</h3>
    <ul>
      <li><strong>Step-free entry:</strong> easier groceries, prams, visitors, mobility changes, and fewer trip risks.</li>
      <li><strong>Level-entry shower:</strong> safer as balance changes, easier transfers, and simpler support if needed.</li>
      <li><strong>Wider doors and corridors:</strong> easier use of walkers, temporary injuries, and future flexibility.</li>
    </ul>

    <aside class="info-note" aria-label="Victoria context note">
      <p class="small-note">In Victoria, new homes are now built to minimum accessibility standards. This quiz isn't a compliance check - it's just a quick way to think about what makes a home easier to live in over time.</p>
      <p class="small-note">The Livable Housing Design Standard mainly applies to new homes, not retrofitting existing homes.</p>
    </aside>

    <h3>Want updates on Building Better Homes?</h3>
    <div class="results-actions">
      <a class="cta-link" href="${SIGNUP_URL}" target="_blank" rel="noopener noreferrer">Join the mailing list</a>
      <button id="restart-btn" class="button-secondary" type="button"><span class="button-icon" aria-hidden="true">&#x21bb;</span> Start again</button>
    </div>
  `;

  document.getElementById("restart-btn")?.addEventListener("click", () => {
    resetQuiz("welcome");
    render();
  });
}

function render() {
  if (appState.screen === "welcome") {
    renderWelcome();
  } else if (appState.screen === "question") {
    renderQuestion();
  } else {
    renderResults();
  }

  mainContent?.focus();
}

render();
