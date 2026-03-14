document.addEventListener("DOMContentLoaded", () => {
  const musicaInicio = document.getElementById("musica-inicio");
  const guardianNameEl = document.getElementById("guardian-name");
  const guardianTitleEl = document.getElementById("guardian-title");
  const guardianImageContainerEl = document.querySelector(".guardian-portrait-container");
  const dialogueTextEl = document.getElementById("dialogue-text");
  const continueBtn = document.getElementById("continuar-jornada-btn");

  const mascotesBasePath = "assets/mascote/";

  const guardiansData = {
    Flora: {
      name: "Flora",
      title: "Guardiã da Força",
      image: `${mascotesBasePath}flora.1.png`,
      dialogue: [
        "Jovem aprendiz, o meu nome é Flora, e tu foste escolhido para caminhar ao meu lado.",
        "Eu sou a guardiã do corpo, da vitalidade, e te guiarei a cuidar de teu templo físico.",
        "Mas cuidado, pois o Sedentarion espreita. Ele é a sombra que invade a clareira quando negligencias o teu corpo.",
        "Lembre-se: 'O corpo fala. Mas tu estás disposto a escutar?'",
        "Vamos, a jornada pelo Grimório te espera!"
      ]
    },
    Mentis: {
      name: "Mentis",
      title: "Guardião do Conhecimento",
      image: `${mascotesBasePath}mentis.1.png`,
      dialogue: [
        "Saudações, novo buscador. Eu sou Mentis, o guardião da sabedoria.",
        "Tua mente é um jardim. Eu te ajudarei a cultivá-la e a afastar o Procrastinax, a erva daninha que surge ao ignorar as metas mentais.",
        "Não esqueças: 'Tua mente é um jardim. Cultivas ou deixas ervas daninhas?'",
        "O conhecimento é a maior das armas. Juntos, iremos forjá-lo!"
      ]
    },
    Ordus: {
      name: "Ordus",
      title: "Guardião da Ordem",
      image: `${mascotesBasePath}ordus.1.png`,
      dialogue: [
        "Finalmente, chegaste. Eu sou Ordus, e meu templo protege a ordem que nasce do caos.",
        "Eu sou o guardião dos hábitos e da rotina. Juntos, transformaremos as tuas repetições em atos de poder.",
        "O Desordem Primeva é nosso inimigo, a sombra que cresce conforme os maus hábitos se acumulam.",
        "Mas lembra: não há caos sem ordem. E não há ordem sem coragem."
      ]
    },
    Lumen: {
      name: "Lumen",
      title: "Guardiã Interior",
      image: `${mascotesBasePath}lumen.1.png`,
      dialogue: [
        "Seja bem-vindo, alma curiosa. Eu sou Lumen, a guardiã da Caverna Interior.",
        "Minha missão é guiar-te na jornada do autoconhecimento e do autocuidado, para que tu encontres a tua própria luz.",
        "Os Devoradores de Tempo que nos ameaçam são as sombras da procrastinação e os pensamentos sabotadores.",
        "Estou aqui para iluminar o caminho. Juntos, faremos com que a tua luz interior brilhe mais forte."
      ]
    },
    Lux: {
      name: "Lux",
      title: "Guardião da Aurora Digital",
      image: `${mascotesBasePath}lux.1.png`,
      dialogue: [
        "Bem-vindo à nova era, aprendiz. Eu sou Lux, o guardião da Aurora Digital.",
        "Eu te ajudarei a navegar pelas tecnologias e a construir a tua carreira, transformando o virtual em teu aliado.",
        "Os Devoradores de Tempo, nesta área, são as distrações digitais e o sedentarismo virtual.",
        "Concentre-se, e faremos de tua carreira um farol de sucesso!"
      ]
    },
    Lucros: {
      name: "Lucros",
      title: "Guardião das Finanças",
      image: `${mascotesBasePath}lucros.1.png`,
      dialogue: [
        "Olá, novo viajante. Meu nome é Lucros, guardião da Câmara das Moedas.",
        "Eu te ajudarei a dominar as finanças. Não planejar é o mesmo que aceitar perder.",
        "O nosso inimigo é o Consumptus, que consome tuas metas quando teus gastos se descontrolam.",
        "Lembra-te: tu gastas mais com teus impulsos do que com teus sonhos?"
      ]
    }
  };

  const chosenGuardian = localStorage.getItem("guardiao");

  if (!chosenGuardian || !guardiansData[chosenGuardian]) {
    window.location.href = "login.html";
    return;
  }

  const guardian = guardiansData[chosenGuardian];

  guardianNameEl.textContent = guardian.name;
  guardianTitleEl.textContent = guardian.title;
  guardianImageContainerEl.innerHTML = `
    <img src="${guardian.image}" alt="${guardian.name}" class="guardian-image" />
  `;

  let currentDialogueIndex = 0;
  let typingTimeout = null;
  let nextDialogueTimeout = null;
  const typingSpeed = 38;
  const dialoguePause = 1400;

  function clearTimers() {
    clearTimeout(typingTimeout);
    clearTimeout(nextDialogueTimeout);
  }

  function typeWriter(text, element, callback) {
    let charIndex = 0;
    element.textContent = "";
    clearTimeout(typingTimeout);

    function type() {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
        typingTimeout = setTimeout(type, typingSpeed);
      } else if (callback) {
        callback();
      }
    }

    type();
  }

  function showContinueButton() {
    continueBtn.classList.remove("hidden");
  }

  function showNextDialogue() {
    if (currentDialogueIndex >= guardian.dialogue.length) {
      showContinueButton();
      return;
    }

    const currentText = guardian.dialogue[currentDialogueIndex];

    typeWriter(currentText, dialogueTextEl, () => {
      currentDialogueIndex++;
      nextDialogueTimeout = setTimeout(showNextDialogue, dialoguePause);
    });
  }

  window.addEventListener("pageshow", () => {
    if (musicaInicio) {
      musicaInicio.volume = 0.1;
      musicaInicio.play().catch(() => {
        console.log("Música não pôde ser reproduzida automaticamente.");
      });
    }
  });

  showNextDialogue();

  continueBtn.addEventListener("click", () => {
    clearTimers();

    if (musicaInicio && !musicaInicio.paused) {
      musicaInicio.pause();
      musicaInicio.currentTime = 0;
    }

    window.location.href = "mapa.html";
  });
});