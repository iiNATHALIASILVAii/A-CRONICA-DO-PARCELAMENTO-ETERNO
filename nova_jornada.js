// APLICAR AS CORREÇÕES E MELHORIAS NO SEU nova_jornada.js
document.addEventListener("DOMContentLoaded", () => {
  // Elementos DOM
  const musicaInicio = document.getElementById("musica-inicio");
  const introScreen = document.querySelector(".intro-screen");
  const oraculoIntro = document.querySelector(".oraculo-intro");
  const dialogoTextoAtual = document.querySelector(".dialogo-texto-atual");
  const avancarBtn = document.getElementById("avancar-btn");
  const voltarMenuBtn = document.getElementById("voltar-menu-btn");
  const iniciarJornadaBtn = document.getElementById("iniciar-jornada-btn");
  const botoesOraculoContainer = document.querySelector(".botoes-oraculo");
  const skipBtn = document.getElementById("skip-btn");
  const sairIntroBtn = document.getElementById("sair-intro-btn");

  // Configuração inicial da música
  if (musicaInicio) {
    // Verifica se o elemento de áudio existe
    musicaInicio.volume = 0.2; // Define o volume da música de fundo

    // Tentar tocar a música no carregamento com "muted", para contornar o autoplay policy
    // Se não funcionar, o play será disparado no primeiro clique do usuário
    musicaInicio.play().catch((error) => {
      console.warn(
        "Música inicial não pôde ser reproduzida automaticamente (autoplay policy).",
        error
      );
      // Aqui você pode adicionar lógica para informar o usuário a interagir
    });
  }

  const dialogos = [
    "O tempo escapando pelos dedos, a lista de afazeres crescendo como trepadeiras selvagens...",
    "Sim, jovem aprendiz. Você foi convocado. Não pelo acaso, mas pelo chamamento do Grimório das Tarefas Esquecidas.",
    "Seu mundo está em desequilíbrio. A procrastinação é uma criatura astuta... e o Tempo, uma entidade que não perdoa.",
    "Mas há esperança!",
    "Juntos, resgataremos tarefas perdidas, converteremos esforços em energia, e reconstruiremos sua historia - Uma realização de cada vez.",
    "Respire fundo, jovem. A jornada começa agora. O Grimório aguarda sua mão firme e seu coração decidido.",
  ];

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
    // Garante que os botões existam antes de manipular o estilo
    if (avancarBtn)
      avancarBtn.style.visibility = visible ? "visible" : "hidden";
    if (voltarMenuBtn)
      voltarMenuBtn.style.visibility = visible ? "visible" : "hidden";
  }

  // Função para mostrar o próximo parágrafo
  function showNextParagraph() {
    clearTimeout(typingTimeout);

    if (currentIndex < dialogos.length) {
      // Se ainda há diálogos para exibir, esconde os botões de ação e mostra o Pular Diálogos
      setActionButtonsVisibility(false);
      if (skipBtn) skipBtn.style.visibility = "visible";

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
            if (skipBtn) skipBtn.style.visibility = "hidden";
          }
        });
      }
    } else {
      // Já passou por todos os diálogos ou pulou, exibe os botões de ação e esconde o Pular Diálogos
      setActionButtonsVisibility(true);
      if (skipBtn) skipBtn.style.visibility = "hidden";
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
    if (skipBtn) skipBtn.style.visibility = "hidden";
  }

  // Função para SAIR do jogo (redireciona para a página inicial)
  function exitGame() {
    // Parar a música antes de sair, se estiver tocando
    if (musicaInicio && !musicaInicio.paused) {
      musicaInicio.pause();
      musicaInicio.currentTime = 0;
    }
    window.location.href = "index.html";
  }

  // === Lógica de Transição entre Telas ===

  // Garante que a tela de introdução esteja ativa ao carregar
  if (introScreen) {
    introScreen.classList.add("active");
  }

  if (iniciarJornadaBtn) {
    iniciarJornadaBtn.addEventListener("click", () => {
      // Se a música estiver mutada ou pausada, tentar desmutar e tocar aqui
      if (musicaInicio) {
        musicaInicio.muted = false; // Desmuta a música
        musicaInicio.play().catch((error) => {
          console.error("Erro ao reproduzir a música após interação:", error);
        });
      }

      if (introScreen) {
        introScreen.style.opacity = 0;
        introScreen.style.pointerEvents = "none";
      }

      setTimeout(() => {
        if (introScreen) introScreen.classList.remove("active");
        if (oraculoIntro) {
          oraculoIntro.classList.add("active");
          oraculoIntro.style.opacity = 0;
          oraculoIntro.style.pointerEvents = "auto";
        }

        // Garante que o container dos botões do oráculo esteja visível
        if (botoesOraculoContainer)
          botoesOraculoContainer.classList.add("visible");
        // Inicialmente, apenas o botão Pular Diálogos deve estar visível
        setActionButtonsVisibility(false); // Esconde Avançar e Voltar
        if (skipBtn) skipBtn.style.visibility = "visible"; // Mostra Pular Diálogos

        setTimeout(() => {
          if (oraculoIntro) oraculoIntro.style.opacity = 1;
          showNextParagraph(); // Inicia a digitação do texto do oráculo
        }, 50);
      }, 1000);
    });
  }

  // Event Listeners para os botões
  if (skipBtn) skipBtn.addEventListener("click", skipDialogs);
  if (sairIntroBtn) sairIntroBtn.addEventListener("click", exitGame);
  if (voltarMenuBtn) voltarMenuBtn.addEventListener("click", exitGame); // "Voltar ao Menu Principal" agora funciona como "Sair"

  // Evento para o botão "Avançar"
  if (avancarBtn) {
    avancarBtn.addEventListener("click", () => {
      alert("Jornada Avançando!");
      // Lógica para a próxima fase do jogo
      // Exemplo: mudar para outra música se for uma fase diferente
      // if (musicaInicio) {
      //   musicaInicio.src = 'soundtrack/musica_fase2.mp3'; // Supondo que você tenha outra música
      //   musicaInicio.load();
      //   musicaInicio.play().catch(e => console.error("Erro ao tocar música da fase 2:", e));
      // }
    });
  }
}); // Fim do DOMContentLoaded
