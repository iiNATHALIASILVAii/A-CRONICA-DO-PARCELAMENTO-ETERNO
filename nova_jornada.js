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

  // **NOVOS BOTOES**
  const skipBtn = document.getElementById("skip-btn");
  const sairIntroBtn = document.getElementById("sair-intro-btn");
  const sairOraculoBtn = document.getElementById("sair-oraculo-btn");

  let currentIndex = 0;
  let typingTimeout;
  const typingSpeed = 70;
  const paragraphDelay = 2500;

  // Função para exibir o texto com efeito de digitação
  function typeWriter(text, element, callback) {
    let charIndex = 0;
    element.innerHTML = "";

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

  // Função para mostrar o próximo parágrafo
  function showNextParagraph() {
    if (typingTimeout) clearTimeout(typingTimeout);
    botoesOraculoContainer.classList.remove("visible"); // Esconde os botões no início de cada diálogo

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
          setTimeout(showNextParagraph, paragraphDelay);
        });
      }
    } else {
      // Todos os parágrafos foram exibidos, mostra os botões
      botoesOraculoContainer.classList.add("visible");
      // O botão "Skip" pode ser escondido aqui, se desejar que ele só funcione durante a digitação
      // skipBtn.style.display = 'none';
    }
  }

  // Função para PULAR todos os diálogos
  function skipDialogs() {
    if (typingTimeout) clearTimeout(typingTimeout); // Para a digitação atual
    dialogoTextoAtual.innerHTML = dialogos[dialogos.length - 1]; // Exibe o último diálogo instantaneamente
    // Aplica o estilo de destaque se o último for "Mas há esperança!"
    if (dialogos[dialogos.length - 1] === "Mas há esperança!") {
      dialogoTextoAtual.innerHTML = `<span class="destaque-esperanca">${
        dialogos[dialogos.length - 1]
      }</span>`;
      const destaqueSpan = dialogoTextoAtual.querySelector(
        ".destaque-esperanca"
      );
      if (destaqueSpan) {
        destaqueSpan.style.opacity = 1; // Já visível
        destaqueSpan.style.transform = "scale(1)"; // Já no tamanho normal
      }
    }
    currentIndex = dialogos.length; // Garante que a lógica saiba que todos foram exibidos
    botoesOraculoContainer.classList.add("visible"); // Mostra os botões de controle
  }

  // Função para SAIR do jogo (redireciona para a página inicial)
  function exitGame() {
    // Redireciona para a página inicial do seu jogo.
    // Substitua 'index.html' pelo nome do seu arquivo de página inicial, se for diferente.
    window.location.href = "index.html";
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

      setTimeout(() => {
        oraculoIntro.style.opacity = 1;
        showNextParagraph(); // Inicia a digitação do texto do oráculo
      }, 50);
    }, 1000);
  });

  // Event Listeners para os NOVOS botões
  skipBtn.addEventListener("click", skipDialogs); // Adiciona o evento ao botão Pular
  sairIntroBtn.addEventListener("click", exitGame); // Adiciona o evento ao botão Sair da introdução
  sairOraculoBtn.addEventListener("click", exitGame); // Adiciona o evento ao botão Sair do oráculo

  // Evento para o botão "Avançar"
  avancarBtn.addEventListener("click", () => {
    alert("Jornada Avançando!");
    // Lógica para a próxima fase do jogo
  });

  // Evento para o botão "Voltar ao Menu Principal" - CORRIGIDO
  voltarMenuBtn.addEventListener("click", () => {
    alert("Voltando ao Menu Principal!");
    // Redireciona para a página inicial do jogo
    window.location.href = "index.html"; // **CORREÇÃO AQUI**
  });
});
