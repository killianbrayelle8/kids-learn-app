/* ===================================================================
   KidLearn — logique (enfant + parents + quiz + abonnement freemium)
   Navigation : Âge -> Matière -> Vidéo
   Freemium : les vidéos marquées gratuit:false sont verrouillées sans abonnement.
   =================================================================== */

const AGES = window.APP_DATA.AGES;
const PREMIUM_KEY = "kidlearn_premium_v1"; // demo : true => toutes les vidéos débloquées

function isPremium() {
  try { return localStorage.getItem(PREMIUM_KEY) === "1"; }
  catch { return false; }
}
function setPremium(v) {
  localStorage.setItem(PREMIUM_KEY, v ? "1" : "0");
}

const STORAGE_KEY = "kidlearn_progress_v2";
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { stars: 0, watched: {} }; }
  catch { return { stars: 0, watched: {} }; }
}
function saveProgress(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

let progress = loadProgress();
let currentAge = null, currentMatiere = null, currentVideo = null;
let celebrationPending = false, pendingQuizAfterCelebration = null;

/* ---------- Étoiles + badge premium ---------- */
function updateStars() { document.getElementById("starCount").textContent = progress.stars; }
function updatePremiumBadge() {
  const b = document.getElementById("premiumBadge");
  if (isPremium()) { b.textContent = "⭐ VIP"; b.classList.add("vip"); }
  else { b.textContent = "🔓 Gratuit"; b.classList.remove("vip"); }
}
updateStars(); updatePremiumBadge();

/* ---------- ÉCRAN 1 : choix de l'âge ---------- */
const ageGrid = document.getElementById("ageGrid");
AGES.forEach((a) => {
  const btn = document.createElement("button");
  btn.className = "subject-card";
  btn.style.background = `linear-gradient(160deg, ${a.couleur}, ${a.couleurFoncee})`;
  btn.innerHTML = `<span class="emoji">${a.emoji}</span><span class="nom">${a.label}</span><span class="desc">${a.description}</span>`;
  btn.addEventListener("click", () => openAge(a));
  ageGrid.appendChild(btn);
});

/* ---------- ÉCRAN 2 : matières ---------- */
const screenHome = document.getElementById("screen-home");
const screenAge = document.getElementById("screen-age");
const screenMatiere = document.getElementById("screen-matiere");
const matiereGrid = document.getElementById("matiereGrid");

function matiereColor(key) {
  if (key === "maths") return ["#ff8787", "#c92a2a"];
  if (key === "francais") return ["#74c0fc", "#1864ab"];
  if (key === "anglais") return ["#69db7c", "#2b8a3e"];
  return ["#ffd43b", "#e67700"];
}

function openAge(a) {
  currentAge = a;
  document.getElementById("ageTitle").textContent = `${a.emoji} ${a.label}`;
  document.getElementById("ageDesc").textContent = a.description;
  matiereGrid.innerHTML = "";
  a.matieres.forEach((m) => {
    const btn = document.createElement("button");
    btn.className = "subject-card";
    const col = matiereColor(m.key);
    btn.style.background = `linear-gradient(160deg, ${col[0]}, ${col[1]})`;
    btn.innerHTML = `<span class="emoji">${m.emoji}</span><span class="nom">${m.nom}</span><span class="desc">${m.videos.length} vidéo(s)</span>`;
    btn.addEventListener("click", () => openMatiere(m));
    matiereGrid.appendChild(btn);
  });
  screenHome.classList.remove("active"); screenMatiere.classList.remove("active"); screenAge.classList.add("active");
  window.scrollTo(0, 0);
}
document.getElementById("backToAge").addEventListener("click", goAge);
function goAge() { screenMatiere.classList.remove("active"); screenAge.classList.add("active"); window.scrollTo(0, 0); }

/* ---------- ÉCRAN 3 : vidéos ---------- */
const videoGrid = document.getElementById("videoGrid");
function openMatiere(m) {
  currentMatiere = m;
  document.getElementById("matiereTitle").textContent = `${m.emoji} ${m.nom}`;
  videoGrid.innerHTML = "";
  m.videos.forEach((v) => {
    const done = !!progress.watched[v.id];
    const locked = !v.gratuit && !isPremium();
    const card = document.createElement("button");
    card.className = "video-card" + (locked ? " locked" : "");
    card.innerHTML = `
      <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="${v.titre}" loading="lazy" />
      <div class="info">
        <div class="titre">${v.titre}</div>
        <div class="meta">⏱ ${v.duree} · 👶 ${v.age} ${done ? '· <span class="done">✓ vu</span>' : ''} ${v.gratuit ? '' : '· 🔒 Premium'}</div>
        ${locked ? '<div class="lock-badge">🔒 Abonnement requis</div>' : (v.quiz ? '<button class="quiz-btn" type="button">🎯 Faire le quiz</button>' : '')}
      </div>`;
    if (locked) {
      card.addEventListener("click", openSubscribe);
    } else {
      card.addEventListener("click", (e) => { if (e.target.closest(".quiz-btn")) return; openVideo(v); });
      const quizBtn = card.querySelector(".quiz-btn");
      if (quizBtn) quizBtn.addEventListener("click", (e) => { e.stopPropagation(); openQuiz(v); });
    }
    videoGrid.appendChild(card);
  });
  screenAge.classList.remove("active"); screenMatiere.classList.add("active");
  window.scrollTo(0, 0);
}
document.getElementById("backHome").addEventListener("click", goHome);
function goHome() { screenAge.classList.remove("active"); screenMatiere.classList.remove("active"); screenHome.classList.add("active"); window.scrollTo(0, 0); }

/* ---------- Lecteur vidéo ---------- */
const playerOverlay = document.getElementById("playerOverlay");
const playerFrame = document.getElementById("playerFrame");
const playerTitle = document.getElementById("playerTitle");
function openVideo(v) {
  const wasWatched = !!progress.watched[v.id];
  currentVideo = v;
  playerTitle.textContent = v.titre;
  playerFrame.src = `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&playsinline=1&autoplay=1`;
  playerOverlay.classList.add("active");
  if (!wasWatched) {
    progress.watched[v.id] = true; progress.stars += 1; saveProgress(progress); updateStars();
    celebrationPending = true;
  }
}
function closeVideo() {
  playerFrame.src = ""; playerOverlay.classList.remove("active");
  if (currentMatiere) openMatiere(currentMatiere);
  if (celebrationPending) { celebration.classList.add("active"); celebrationPending = false; pendingQuizAfterCelebration = currentVideo && currentVideo.quiz ? currentVideo : null; }
  else if (currentVideo && currentVideo.quiz) openQuiz(currentVideo);
  currentVideo = null;
}
document.getElementById("playerClose").addEventListener("click", closeVideo);

/* ---------- Célébration ---------- */
const celebration = document.getElementById("celebration");
document.getElementById("celebrationOk").addEventListener("click", () => {
  celebration.classList.remove("active");
  if (pendingQuizAfterCelebration) { const v = pendingQuizAfterCelebration; pendingQuizAfterCelebration = null; openQuiz(v); }
});

/* ---------- QUIZ ---------- */
const screenQuiz = document.getElementById("screen-quiz");
const quizArea = document.getElementById("quizArea");
let quizState = null;
function openQuiz(v) {
  if (!v.quiz || !v.quiz.length) { alert("Pas de quiz pour cette vidéo pour l'instant !"); return; }
  quizState = { video: v, index: 0, score: 0, rewarded: false };
  screenMatiere.classList.remove("active"); screenAge.classList.remove("active"); screenHome.classList.remove("active");
  screenQuiz.classList.add("active"); window.scrollTo(0, 0); renderQuestion();
}
function renderQuestion() {
  const q = quizState.video.quiz[quizState.index];
  document.getElementById("quizTitle").textContent = `🎯 Quiz — ${quizState.video.titre}`;
  quizArea.innerHTML = `
    <p class="quiz-progress">Question ${quizState.index + 1} / ${quizState.video.quiz.length}</p>
    <p class="quiz-question">${q.question}</p>
    <div class="quiz-options"></div>
    <p class="quiz-feedback"></p>`;
  const opts = quizArea.querySelector(".quiz-options");
  q.options.forEach((opt, i) => {
    const b = document.createElement("button"); b.className = "quiz-option"; b.textContent = opt;
    b.addEventListener("click", () => handleAnswer(i, b, opts)); opts.appendChild(b);
  });
}
function handleAnswer(i, btn, opts) {
  const q = quizState.video.quiz[quizState.index];
  const feedback = quizArea.querySelector(".quiz-feedback");
  if (i === q.reponse) {
    btn.classList.add("correct"); feedback.textContent = "✅ Bravo !"; feedback.className = "quiz-feedback correct";
    opts.querySelectorAll("button").forEach((b) => (b.disabled = true)); quizState.score++;
    setTimeout(nextQuestion, 900);
  } else {
    btn.classList.add("wrong"); btn.disabled = true;
    feedback.textContent = "Pas tout à fait, réessaie ! 💡"; feedback.className = "quiz-feedback wrong";
  }
}
function nextQuestion() { quizState.index++; if (quizState.index >= quizState.video.quiz.length) finishQuiz(); else renderQuestion(); }
function finishQuiz() {
  const total = quizState.video.quiz.length;
  if (!quizState.rewarded) { quizState.rewarded = true; progress.stars += 1; saveProgress(progress); updateStars(); }
  quizArea.innerHTML = `
    <div class="quiz-finish">
      <div class="big-star">⭐</div><h2>Bravo !</h2>
      <p>Tu as eu <b>${quizState.score} / ${total}</b> bonnes réponses !</p>
      <p>🎁 +1 étoile</p>
      <button id="quizAgain" type="button">Rejouer</button>
      <button id="quizHome" type="button">Accueil</button>
    </div>`;
  document.getElementById("quizAgain").addEventListener("click", () => { quizState.index = 0; quizState.score = 0; renderQuestion(); });
  document.getElementById("quizHome").addEventListener("click", goHome);
}
document.getElementById("backFromQuiz").addEventListener("click", () => {
  screenQuiz.classList.remove("active");
  if (currentMatiere) openMatiere(currentMatiere); else goHome();
});

/* ---------- ABONNEMENT (freemium) ---------- */
const subscribeOverlay = document.getElementById("subscribeOverlay");
document.getElementById("subscribeBtn").addEventListener("click", openSubscribe);
document.getElementById("premiumBadge").addEventListener("click", openSubscribe);
function openSubscribe() { subscribeOverlay.classList; document.getElementById("subscribeOverlay").classList.add("active"); }
document.getElementById("subscribeClose").addEventListener("click", () => subscribeOverlay.classList.remove("active"));

// Paiement : ici, DEMO. Pour la prod, remplace par un appel à TON serveur Stripe
// (Checkout Session) puis setPremium(true) après confirmation du webhook.
document.getElementById("subscribePay").addEventListener("click", () => {
  // Demo : on simule un paiement réussi.
  // En production : window.location = '/create-checkout?plan=premium';  (ton back-end Stripe)
  setPremium(true);
  updatePremiumBadge();
  subscribeOverlay.classList.remove("active");
  if (currentMatiere) openMatiere(currentMatiere);
  alert("🎉 Merci ! Ton abonnement est actif. Toutes les vidéos sont débloquées.");
});

/* ---------- Verrou parental ---------- */
const parentGate = document.getElementById("parentGate");
const gateQuestion = document.getElementById("gateQuestion");
const gateAnswer = document.getElementById("gateAnswer");
const gateError = document.getElementById("gateError");
function randomGate() {
  const a = Math.floor(Math.random() * 9) + 1, b = Math.floor(Math.random() * 9) + 1;
  gateQuestion.dataset.answer = a + b; gateQuestion.textContent = `${a} + ${b} = ?`;
}
randomGate();
document.getElementById("parentEntry").addEventListener("click", () => {
  gateError.textContent = ""; gateAnswer.value = ""; randomGate(); parentGate.classList.add("active"); gateAnswer.focus();
});
document.getElementById("gateSubmit").addEventListener("click", checkGate);
gateAnswer.addEventListener("keydown", (e) => { if (e.key === "Enter") checkGate(); });
function checkGate() {
  if (parseInt(gateAnswer.value, 10) === parseInt(gateQuestion.dataset.answer, 10)) {
    parentGate.classList.remove("active"); openParentPanel();
  } else { gateError.textContent = "Réponse incorrecte, réessaie 😉"; randomGate(); gateAnswer.value = ""; }
}

/* ---------- Panneau parents ---------- */
const parentPanel = document.getElementById("parentPanel");
function openParentPanel() {
  document.getElementById("panelStars").textContent = progress.stars;
  document.getElementById("panelWatched").textContent = Object.keys(progress.watched).length;
  document.getElementById("panelPremium").textContent = isPremium() ? "Actif ⭐" : "Gratuit";
  parentPanel.classList.add("active");
}
document.getElementById("panelClose").addEventListener("click", () => parentPanel.classList.remove("active"));
document.getElementById("panelReset").addEventListener("click", () => {
  if (confirm("Effacer toutes les étoiles et vidéos vues ?")) {
    progress = { stars: 0, watched: {} }; saveProgress(progress); updateStars(); openParentPanel();
  }
});
// (Option parents) désactiver l'abonnement en démo
document.getElementById("panelCancel").addEventListener("click", () => {
  if (confirm("Résilier l'abonnement (démo) ?")) { setPremium(false); updatePremiumBadge(); openParentPanel(); }
});

/* ---------- Navigation accidentelle ---------- */
window.addEventListener("popstate", () => {
  if (playerOverlay.classList.contains("active")) { closeVideo(); history.pushState(null, "", location.href); }
});

/* ---------- PWA ---------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
