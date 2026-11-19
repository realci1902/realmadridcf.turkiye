// Sayfa İçi Arama
const searchBox = document.getElementById("site-search");
const searchableItems = document.querySelectorAll(".searchable-item");

if (searchBox && searchableItems.length > 0) {
    searchBox.addEventListener("input", () => {
        const term = searchBox.value.toLowerCase().trim();
        searchableItems.forEach(item => {
            const match = item.innerText.toLowerCase().includes(term);
            item.style.display = match ? "" : "none";
        });
    });
}

// Bilgi Testi (Sadece quiz.html'de çalışır)
const qTitle = document.getElementById("q-title");
if (qTitle) {
    const questions = [
        {
            q: "Real Madrid hangi yılda kurulmuştur?",
            options: ["1902", "1911", "1920", "1899"],
            correct: 0
        },
        {
            q: "Real Madrid'in iç saha stadyumu hangisidir?",
            options: ["Santiago Bernabéu", "Metropolitano", "San Mamés", "Mestalla"],
            correct: 0
        },
        {
            q: "Kulübün en bilinen sloganlarından biri hangisidir?",
            options: ["Força Barça", "Hala Madrid", "YNWA", "Mia San Mia"],
            correct: 1
        }
    ];

    let idx = 0;
    let score = 0;
    let answered = false;

    const qStep = document.getElementById("q-step");
    const qPoints = document.getElementById("q-points");
    const qChoices = document.getElementById("q-choices");
    const qMsg = document.getElementById("q-msg");
    const qNext = document.getElementById("q-next");

    function showQuestion() {
        answered = false;
        qMsg.textContent = "";
        qNext.classList.add("hidden");

        const item = questions[idx];
        qStep.textContent = `Soru ${idx + 1} / ${questions.length}`;
        qPoints.textContent = `Puan: ${score}`;
        qTitle.textContent = item.q;
        qChoices.innerHTML = "";

        item.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "opt-btn";
            btn.textContent = opt;
            btn.onclick = () => selectAnswer(i, btn);
            qChoices.appendChild(btn);
        });
    }

    function selectAnswer(i, btn) {
        if (answered) return;
        answered = true;

        const right = questions[idx].correct;
        if (i === right) {
            score += 10;
            btn.style.borderColor = "#22c55e";
            qMsg.textContent = "Doğru cevap! +10 puan";
        } else {
            btn.style.borderColor = "#ef4444";
            qMsg.textContent = `Yanlış! Doğru cevap: ${questions[idx].options[right]}`;
        }
        qPoints.textContent = `Puan: ${score}`;
        qNext.classList.remove("hidden");
    }

    qNext.addEventListener("click", () => {
        idx++;
        if (idx < questions.length) {
            showQuestion();
        } else {
            qStep.textContent = "Test Bitti";
            qTitle.textContent = `Toplam Skorun: ${score} / ${questions.length * 10}`;
            qChoices.innerHTML = "";
            qMsg.textContent = "Tekrar oynamak için butona bas.";
            qNext.textContent = "Yeniden Başla";
            qNext.classList.remove("hidden");
            qNext.onclick = () => {
                idx = 0;
                score = 0;
                qNext.textContent = "Sonraki Soru";
                qNext.onclick = null;
                showQuestion();
            };
        }
    });

    showQuestion();
}