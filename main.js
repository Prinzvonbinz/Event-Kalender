"use strict";

// Jahr oben anzeigen
const yearElement = document.getElementById("year");
const today = new Date();
const currentYear = today.getFullYear();
yearElement.textContent = currentYear;

// Kalender erstellen
const calendar = document.getElementById("calendar");
const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

// Inhalte-Pool
const contents = [
  "Heute ist der perfekte Tag für einen Neuanfang.",
  "Kaffee macht dich nicht wach – er macht dich nur weniger müde.",
  "Wer aufhört, besser zu werden, hat aufgehört, gut zu sein.",
  "✨ Heute bist du genial! ✨",
  "Witz des Tages: Warum können Skelette so schlecht lügen? – Weil man durch sie hindurchsieht!",
  "Emoji des Tages: 🌞",
  "Emoji des Tages: 🎉",
  "Emoji des Tages: 🐧",
  "Emoji des Tages: 🍀",
  "Fun Fact: Bananen sind Beeren, Erdbeeren nicht!",
  "Wusstest du? Honig verdirbt nie.",
  "Wusstest du? Ein Flamingo kann nur essen, wenn sein Kopf auf dem Kopf steht.",
  "Challenge: Sag heute jemandem ein Kompliment 💕",
  "Challenge: Mach 5 Kniebeugen 💪",
  "Challenge: Trink ein Glas Wasser mehr als sonst 🚰",
  "🎲 Du hast eine  " + (Math.floor(Math.random() * 6) + 1) + " gewürfelt!",
  "🎁 Dein virtuelles Geschenk: 🎂",
  "Glücksrad Ergebnis: " + ["🍎","🍌","🍇","🍉"][Math.floor(Math.random()*4)],
  "☃️ Winter-Grüße: Heute schneit es digital ❄️",
  "🌸 Frühlings-Überraschung: Blumen blühen 🌷",
  "🎃 Happy Halloween mit einem Kürbis!",
  "🎆 Silvester: Feuerwerk überall!"
];

// Modal
const modal = document.getElementById("modal");
const contentDiv = document.getElementById("content");
const closeBtn = document.getElementById("close");

// localStorage für geöffnete Türchen
let openedDays = JSON.parse(localStorage.getItem("openedDays")) || [];

// Funktion zum Erstellen eines Türchens
function createDoor(day) {
  const dayDiv = document.createElement("div");
  dayDiv.classList.add("day");
  dayDiv.textContent = day + "." + (today.getMonth() + 1);

  // Sperre für zukünftige Tage
  if (day > today.getDate()) {
    dayDiv.classList.add("locked");
  }

  // Sperre für bereits geöffnete Tage
  if (openedDays.includes(day)) {
    dayDiv.classList.add("locked");
  } else if (day <= today.getDate()) {
    const handler = () => openDoor(day, dayDiv);
    dayDiv.addEventListener("click", handler);
    dayDiv.handler = handler;
  }

  calendar.appendChild(dayDiv);
}

// Alle Tage erstellen
for (let i = 1; i <= daysInMonth; i++) {
  createDoor(i);
}

// Tür öffnen
function openDoor(day, dayDiv) {
  const randomContent = contents[Math.floor(Math.random() * contents.length)];
  contentDiv.innerHTML = `<h2>${day}.${today.getMonth() + 1}.${today.getFullYear()}</h2><p>${randomContent}</p>`;
  modal.classList.remove("hidden");

  // Tür sperren
  dayDiv.classList.add("locked");
  dayDiv.removeEventListener("click", dayDiv.handler);

  // localStorage aktualisieren
  if (!openedDays.includes(day)) {
    openedDays.push(day);
    localStorage.setItem("openedDays", JSON.stringify(openedDays));
  }
}

// Modal schließen
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
