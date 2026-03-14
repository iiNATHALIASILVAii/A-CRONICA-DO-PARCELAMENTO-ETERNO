document.addEventListener("DOMContentLoaded", () => {
  const hotspots = document.querySelectorAll(".hotspot");
  const guardiaoEscolhido = localStorage.getItem("guardiao");

  const actions = {
    "Oráculo": () => {
      alert("O Oráculo sussurra: ainda há muito a ser revelado...");
    },
    "Livro das Tarefas": () => {
      alert("Abrindo o Livro das Tarefas...");
    },
    "Clareira do Corpo": () => {
      alert("Entrando na Clareira do Corpo...");
    },
    "Torre do Conhecimento": () => {
      alert("Entrando na Torre do Conhecimento...");
    },
    "Templo do Caos": () => {
      alert("Entrando no Templo do Caos...");
    },
    "Caverna Interior": () => {
      alert("Entrando na Caverna Interior...");
    },
    "Aurora Digital": () => {
      alert("Entrando na Aurora Digital...");
    }
  };

  hotspots.forEach((spot) => {
    spot.addEventListener("click", () => {
      const areaName = spot.dataset.area;
      const action = actions[areaName];

      if (action) {
        action();
      }
    });
  });

  /* destaque do guardião escolhido */
  const guardianToAreaMap = {
    Flora: ".flora",
    Mentis: ".mentis",
    Ordus: ".ordus",
    Lumen: ".lumen",
    Lux: ".lux",
    Lucros: ".livro"
  };

  const selector = guardianToAreaMap[guardiaoEscolhido];
  if (selector) {
    const currentSpot = document.querySelector(selector);
    if (currentSpot) {
      currentSpot.classList.add("current-guardian-area");
    }
  }
});