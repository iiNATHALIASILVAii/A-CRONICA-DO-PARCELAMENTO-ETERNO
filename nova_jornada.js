document.addEventListener("DOMContentLoaded", () => {
  const dialogos = [
    "O tempo escapando pelos dedos, a lista de afazeres crescendo como trepadeiras selvagens...",
    "Sim, jovem aprendiz. Você foi convocado(a). Não pelo acaso, mas pelo chamamento do Grimório das Tarefas Esquecidas.",
    "Seu mundo está em desequilíbrio. A procrastinação é uma criatura astuta... e o Tempo, uma entidade que não perdoa.",
    "Mas há esperança!",
    "Juntos, resgataremos tarefas perdidas, converteremos esforços em energia, e reconstruiremos sua historia - Uma realização de cada vez.",
    "Respire fundo, jovem. A jornada começa agora. O Grimório aguarda sua mão firme e seu coração decidido.",
  ];

  // Elementos DOM
  const dialogoTextoAtual = document.querySelector(".dialogo-texto-atual");
  const avancarBtn = document.getElementById("avancar-btn");
  const voltarMenuBtn = document.getElementById("voltar-menu-btn");
  const introScreen = document.querySelector(".intro-screen");
  const oraculoIntro = document.querySelector(".oraculo-intro");
  const iniciarJornadaBtn = document.getElementById("iniciar-jornada-btn");
  const botoesOraculoContainer = document.querySelector(".botoes-oraculo");

  // Botões de controle
  const skipBtn = document.getElementById("skip-btn");
  const sairIntroBtn = document.getElementById("sair-intro-btn");

  let currentIndex = 0;
  let typingTimeout;
  const typingSpeed = 70;
  const paragraphDelay = 2500;

  // Função para exibir o texto com efeito de digitação
  function typeWriter(text, element, callback) {
    let charIndex = 0;
    element.innerHTML = "";
    clearTimeout(typingTimeout); // Garante que qualquer digitação anterior seja interrompida

    function type() {
      if (charIndex < text.length) {
        element.innerHTML += text.charAt(charIndex);
        charIndex++;
        typingTimeout = setTimeout(type, typingSpeed);
      } else {
        if (callback) callback();
      }
    }
    type();
  }

  // Função para controlar a visibilidade dos botões de ação (Avançar, Voltar ao Menu)
  function setActionButtonsVisibility(visible) {
    avancarBtn.style.visibility = visible ? "visible" : "hidden";
    voltarMenuBtn.style.visibility = visible ? "visible" : "hidden";
  }

  // Função para mostrar o próximo parágrafo
  function showNextParagraph() {
    clearTimeout(typingTimeout);

    // No início de cada parágrafo (exceto o último), esconde os botões de ação e mostra o Pular Diálogos
    if (currentIndex < dialogos.length) {
      // Se ainda há diálogos para exibir
      setActionButtonsVisibility(false);
      skipBtn.style.visibility = "visible";
    }

    if (currentIndex < dialogos.length) {
      const currentText = dialogos[currentIndex];

      if (currentText === "Mas há esperança!") {
        dialogoTextoAtual.innerHTML = `<span class="destaque-esperanca">${currentText}</span>`;
        const destaqueSpan = dialogoTextoAtual.querySelector(
          ".destaque-esperanca"
        );
        if (destaqueSpan) {
          destaqueSpan.style.opacity = 0;
          destaqueSpan.style.transform = "scale(0.8)";
          setTimeout(() => {
            destaqueSpan.style.transition =
              "opacity 1s ease-out, transform 1s ease-out";
            destaqueSpan.style.opacity = 1;
            destaqueSpan.style.transform = "scale(1)";
          }, 50);
        }
        setTimeout(() => {
          currentIndex++;
          showNextParagraph();
        }, paragraphDelay * 1.8);
      } else {
        dialogoTextoAtual.innerHTML = "";
        typeWriter(currentText, dialogoTextoAtual, () => {
          currentIndex++;
          if (currentIndex < dialogos.length) {
            setTimeout(showNextParagraph, paragraphDelay);
          } else {
            // Se é o último diálogo, mostra os botões de ação e esconde o Pular Diálogos
            setActionButtonsVisibility(true);
            skipBtn.style.visibility = "hidden";
          }
        });
      }
    } else {
      // Já passou por todos os diálogos ou pulou, exibe os botões de ação e esconde o Pular Diálogos
      setActionButtonsVisibility(true);
      skipBtn.style.visibility = "hidden";
    }
  }

  // Função para PULAR todos os diálogos
  function skipDialogs() {
    clearTimeout(typingTimeout);
    dialogoTextoAtual.innerHTML = dialogos[dialogos.length - 1];

    if (dialogos[dialogos.length - 1] === "Mas há esperança!") {
      dialogoTextoAtual.innerHTML = `<span class="destaque-esperanca">${
        dialogos[dialogos.length - 1]
      }</span>`;
      const destaqueSpan = dialogoTextoAtual.querySelector(
        ".destaque-esperanca"
      );
      if (destaqueSpan) {
        destaqueSpan.style.opacity = 1;
        destaqueSpan.style.transform = "scale(1)";
      }
    }
    currentIndex = dialogos.length;

    // Mostra os botões de ação e esconde o Pular Diálogos
    setActionButtonsVisibility(true);
    skipBtn.style.visibility = "hidden";
  }

  // Função para SAIR do jogo (redireciona para a página inicial)
  function exitGame() {
    window.location.href = "cartalia.html";
  }

  // === Lógica de Transição entre Telas ===

  introScreen.classList.add("active");

  iniciarJornadaBtn.addEventListener("click", () => {
    introScreen.style.opacity = 0;
    introScreen.style.pointerEvents = "none";

    setTimeout(() => {
      introScreen.classList.remove("active");
      oraculoIntro.classList.add("active");
      oraculoIntro.style.opacity = 0;
      oraculoIntro.style.pointerEvents = "auto";

      // Garante que o container dos botões do oráculo esteja visível
      botoesOraculoContainer.classList.add("visible");
      // Inicialmente, apenas o botão Pular Diálogos deve estar visível
      setActionButtonsVisibility(false); // Esconde Avançar e Voltar
      skipBtn.style.visibility = "visible"; // Mostra Pular Diálogos

      setTimeout(() => {
        oraculoIntro.style.opacity = 1;
        showNextParagraph(); // Inicia a digitação do texto do oráculo
      }, 50);
    }, 1000);
  });

  // Event Listeners para os botões
  skipBtn.addEventListener("click", skipDialogs);
  sairIntroBtn.addEventListener("click", exitGame);
  voltarMenuBtn.addEventListener("click", exitGame); // "Voltar ao Menu Principal" agora funciona como "Sair"

  // Evento para o botão "Avançar"
  avancarBtn.addEventListener("click", () => {
    alert("Jornada Avançando!");
    // Lógica para a próxima fase do jogo
  });
});
