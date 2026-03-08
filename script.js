const quizData = [
  {
    q: "Atonalite icin en dogru tanim hangisidir?",
    options: [
      "Tonal merkezin olmadigi ya da belirleyici olmadigi muzik dili",
      "Sadece pentatonik dizi kullanan muzik",
      "Yalnizca Barok donemde gorulen armoni anlayisi",
      "Sadece vokal eserlerde kullanilan teknik"
    ],
    answer: 0
  },
  {
    q: "12 ton sisteminin kurumsallasmasinda en etkili isim kimdir?",
    options: ["Claude Debussy", "Arnold Schoenberg", "Maurice Ravel", "Igor Stravinsky"],
    answer: 1
  },
  {
    q: "Asagidakilerden hangisi Berg'in eseridir?",
    options: ["Wozzeck", "La Mer", "Pulcinella", "Kreuzspiel"],
    answer: 0
  },
  {
    q: "Neo-klasisizm icin hangisi dogrudur?",
    options: [
      "Klasik donem bicimlerini modern tekniklerle yeniden yorumlar",
      "Sadece elektronik enstruman kullanir",
      "Tum tonal yapilari reddeder",
      "Rastlantisal muzigi savunur"
    ],
    answer: 0
  },
  {
    q: "Integral serializm neyi seri hale getirmeyi amaclar?",
    options: [
      "Yalnizca melodik motifleri",
      "Perde disindaki parametreleri de (sure, dinamik vb.)",
      "Yalnizca ritmi",
      "Yalnizca orkestradaki yaylilari"
    ],
    answer: 1
  },
  {
    q: "Debussy'nin empresyonist diline dair hangisi daha uygundur?",
    options: [
      "Renk, atmosfer ve armonik belirsizlik odaklidir",
      "Keskin tonik-dominant gerilimi her zaman zorunludur",
      "Sadece geleneksel kadanslar kullanilir",
      "Ritim her zaman askeri marstir"
    ],
    answer: 0
  },
  {
    q: "Sembolizm akiminin muzikteki karsiligi nedir?",
    options: [
      "Dogrudan anlatim yerine cagrisim ve sezdirme",
      "Sadece program disi mutlak muzik",
      "Sadece dans muzigi yazimi",
      "Yalnizca tek sesli yapi"
    ],
    answer: 0
  },
  {
    q: "Disavurumculukta hangi ozellik sik gorulur?",
    options: [
      "Asiri duygusal gerilim ve disonans",
      "Sadece sade halk ezgileri",
      "Tonal kadanslara tam baglilik",
      "Yalnizca hafif eglence parcasi"
    ],
    answer: 0
  },
  {
    q: "'Retrograde' ne anlama gelir?",
    options: [
      "Dizinin araliklarini ters cevirme",
      "Diziyi sondan basa okuma",
      "Diziyi iki kat hizlandirma",
      "Diziyi transpoze etmeden tekrarlama"
    ],
    answer: 1
  },
  {
    q: "Prime, Inversion, Retrograde, Retrograde Inversion terimleri hangi sistemle ilgilidir?",
    options: ["Modal muzik", "12 ton sistemi", "Ronesans polifonisi", "Minimalizm"],
    answer: 1
  }
];

const quizForm = document.getElementById("quiz-form");
const submitButton = document.getElementById("submit-quiz");
const resetButton = document.getElementById("reset-quiz");
const resultBox = document.getElementById("quiz-result");

function renderQuiz() {
  quizForm.innerHTML = "";

  quizData.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "question";

    const question = document.createElement("p");
    question.textContent = `${index + 1}. ${item.q}`;
    wrapper.appendChild(question);

    item.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = optionIndex.toString();

      label.appendChild(input);
      label.append(` ${option}`);
      wrapper.appendChild(label);
    });

    quizForm.appendChild(wrapper);
  });
}

function gradeQuiz() {
  let correct = 0;
  let answered = 0;

  quizData.forEach((item, index) => {
    const selected = document.querySelector(`input[name='q${index}']:checked`);
    if (!selected) {
      return;
    }

    answered += 1;
    if (Number(selected.value) === item.answer) {
      correct += 1;
    }
  });

  resultBox.style.display = "block";
  resultBox.classList.remove("good", "bad");

  if (answered < quizData.length) {
    resultBox.classList.add("bad");
    resultBox.textContent = `Tum sorulari cevaplamadin. ${quizData.length} sorudan ${answered} tanesini isaretledin; dogru sayin ${correct}.`;
    return;
  }

  const percentage = Math.round((correct / quizData.length) * 100);
  if (percentage >= 70) {
    resultBox.classList.add("good");
    resultBox.textContent = `Skor: ${correct}/${quizData.length} (%${percentage}). Sinav provasi icin iyi durumdasin.`;
    return;
  }

  resultBox.classList.add("bad");
  resultBox.textContent = `Skor: ${correct}/${quizData.length} (%${percentage}). Konu ozetlerini bir kez daha tekrar et.`;
}

function resetQuiz() {
  quizForm.reset();
  resultBox.style.display = "none";
  resultBox.textContent = "";
  resultBox.classList.remove("good", "bad");
}

submitButton.addEventListener("click", gradeQuiz);
resetButton.addEventListener("click", resetQuiz);

renderQuiz();
