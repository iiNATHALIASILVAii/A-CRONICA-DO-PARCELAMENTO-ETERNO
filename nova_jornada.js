document.addEventListener("DOMContentLoaded", () => {
  const dialogos = [
    "O tempo escapando pelos dedos, a lista de afazeres crescendo como trepadeiras selvagens...",
    "Sim, jovem aprendiz. Você foi convocado(a). Não pelo acaso, mas pelo chamamento do Grimório das Tarefas Esquecidas.",
    "Seu mundo está em desequilíbrio. A procrastinação é uma criatura astuta... e o Tempo, uma entidade que não perdoa.",
    "Mas há esperança!", // Este terá um tratamento especial
    "Juntos, resgataremos tarefas perdidas, converteremos esforços em energia, e reconstruiremos sua historia - Uma realização de cada vez.",
    "Respire fundo, jovem. A jornada começa agora. O Grimório aguarda sua mão firme e seu coração decidido.",
  ];

  const paragrafosOraculo = document.querySelectorAll(".dialogo-oraculo");
  const avancarBtn = document.getElementById("avancar-btn");
  const esperancaTexto = document.getElementById("esperanca-texto");
  const introScreen = document.querySelector(".intro-screen");
  const oraculoIntro = document.querySelector(".oraculo-intro"); // Adicionado: Seleciona a seção do oráculo
  const iniciarJornadaBtn = document.getElementById("iniciar-jornada-btn");

  let currentIndex = 0;
  let typingTimeout;
  const typingSpeed = 50; // Velocidade de "digitação" (ms por caractere)
  const paragraphDelay = 1500; // Atraso entre parágrafos (ms)

  // Função para exibir o texto com efeito de digitação
  function typeWriter(text, element, callback) {
    let charIndex = 0;
    element.textContent = "";

    function type() {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
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
    // Limpa quaisquer timeouts de digitação pendentes antes de iniciar um novo
    if (typingTimeout) clearTimeout(typingTimeout);

    if (currentIndex < dialogos.length) {
      const currentParagraphElement = paragrafosOraculo[currentIndex];
      const currentText = dialogos[currentIndex];

      // Remove a classe 'visible' de todos os parágrafos para garantir que apenas o atual esteja animado
      // Isso pode ser ajustado se você quiser que os parágrafos anteriores permaneçam animados
      paragrafosOraculo.forEach((p) => p.classList.remove("visible"));

      currentParagraphElement.classList.add("visible"); // Torna o parágrafo visível para a animação CSS

      if (currentParagraphElement === esperancaTexto) {
        esperancaTexto.classList.add("visible");
        esperancaTexto.textContent = currentText; // Preenche o texto instantaneamente para o destaque
        setTimeout(() => {
          currentIndex++;
          showNextParagraph();
        }, paragraphDelay * 1.5);
      } else {
        typeWriter(currentText, currentParagraphElement, () => {
          currentIndex++;
          setTimeout(showNextParagraph, paragraphDelay);
        });
      }
    } else {
      // Todos os parágrafos foram exibidos, mostra o botão "Avançar"
      avancarBtn.style.display = "block"; // Garante que esteja block
      avancarBtn.style.opacity = 0; // Inicia opacidade 0 para o fade-in
      setTimeout(() => {
        avancarBtn.style.transition = "opacity 0.5s ease-in-out";
        avancarBtn.style.opacity = 1;
      }, 100);
    }
  }

  // === Lógica de Transição entre Telas ===

  // 1. Torna a tela de introdução visível logo no carregamento
  // (O CSS já lida com opacity: 0 e active class para transição)
  introScreen.classList.add("active");

  // 2. Event Listener para o botão "Iniciar Jornada"
  iniciarJornadaBtn.addEventListener("click", () => {
    // Esconde a tela de introdução com um fade out
    introScreen.style.opacity = 0;
    introScreen.style.pointerEvents = "none"; // Desabilita interações

    // Após o tempo da transição da tela de introdução
    setTimeout(() => {
      introScreen.classList.remove("active"); // Remove a classe 'active' após o fade out

      // Ativa a tela do oráculo com um fade in
      oraculoIntro.classList.add("active"); // Adiciona a classe 'active'
      oraculoIntro.style.opacity = 0; // Inicia com opacidade 0 para a transição
      oraculoIntro.style.pointerEvents = "auto"; // Habilita interações

      setTimeout(() => {
        oraculoIntro.style.opacity = 1; // Faz o fade in do oráculo
        showNextParagraph(); // Inicia a digitação do texto do oráculo
      }, 50); // Pequeno atraso para garantir que a transição de opacidade do oráculo seja aplicada
    }, 1000); // Espera o tempo da transição de opacidade da intro-screen (1s)
  });

  // Evento para o botão "Avançar"
  avancarBtn.addEventListener("click", () => {
    alert("Jornada Avançando!"); // Placeholder
    // window.location.href = "proxima_pagina.html";
  });
});
