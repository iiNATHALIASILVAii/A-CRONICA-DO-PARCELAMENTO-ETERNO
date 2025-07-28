document.addEventListener("DOMContentLoaded", () => {
  const dialogos = [
    "O tempo escapando pelos dedos, a lista de afazeres crescendo como trepadeiras selvagens...",
    "Sim, jovem aprendiz. Você foi convocado(a). Não pelo acaso, mas pelo chamamento do Grimório das Tarefas Esquecidas.",
    "Seu mundo está em desequilíbrio. A procrastinação é uma criatura astuta... e o Tempo, uma entidade que não perdoa.",
    "Mas há esperança!", // Este terá um tratamento especial
    "Juntos, resgataremos tarefas perdidas, converteremos esforços em energia, e reconstruiremos sua historia - Uma realização de cada vez.",
    "Respire fundo, jovem. A jornada começa agora. O Grimório aguarda sua mão firme e seu coração decidido.",
  ];

  // Elementos DOM
  const dialogoTextoAtual = document.querySelector(".dialogo-texto-atual"); // Onde o texto atual será exibido
  const avancarBtn = document.getElementById("avancar-btn");
  const voltarMenuBtn = document.getElementById("voltar-menu-btn");
  const introScreen = document.querySelector(".intro-screen");
  const oraculoIntro = document.querySelector(".oraculo-intro");
  const iniciarJornadaBtn = document.getElementById("iniciar-jornada-btn");
  const botoesOraculoContainer = document.querySelector(".botoes-oraculo"); // Container dos botões

  let currentIndex = 0;
  let typingTimeout;
  const typingSpeed = 70; // Aumentado para mais lento
  const paragraphDelay = 2500; // Aumentado para mais lento

  // Função para exibir o texto com efeito de digitação
  function typeWriter(text, element, callback) {
    let charIndex = 0;
    element.innerHTML = ""; // Limpa o conteúdo antes de digitar a nova frase

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
    if (typingTimeout) clearTimeout(typingTimeout); // Limpa qualquer digitação anterior

    // Esconde os botões do oráculo enquanto o texto está sendo digitado/mostrado
    botoesOraculoContainer.classList.remove("visible");

    if (currentIndex < dialogos.length) {
      const currentText = dialogos[currentIndex];

      if (currentText === "Mas há esperança!") {
        // Para "Mas há esperança!", aplicamos a classe de destaque no span interno
        dialogoTextoAtual.innerHTML = `<span class="destaque-esperanca">${currentText}</span>`;

        // Adiciona animação de fade/scale para o destaque
        const destaqueSpan = dialogoTextoAtual.querySelector('.destaque-esperanca');
        if (destaqueSpan) {
            destaqueSpan.style.opacity = 0;
            destaqueSpan.style.transform = 'scale(0.8)';
            setTimeout(() => {
                destaqueSpan.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                destaqueSpan.style.opacity = 1;
                destaqueSpan.style.transform = 'scale(1)';
            }, 50); // Pequeno atraso para a transição iniciar
        }

        setTimeout(() => {
          currentIndex++;
          showNextParagraph();
        }, paragraphDelay * 1.8); // Atraso maior para o destaque
      } else {
        dialogoTextoAtual.innerHTML = ''; // Garante que o span anterior seja removido
        typeWriter(currentText, dialogoTextoAtual, () => {
          currentIndex++;
          setTimeout(showNextParagraph, paragraphDelay);
        });
      }
    } else {
      // Todos os parágrafos foram exibidos, mostra os botões "Avançar" e "Voltar"
      botoesOraculoContainer.classList.add("visible"); // Torna o container de botões visível
    }
  }

  // === Lógica de Transição entre Telas ===

  // Torna a tela de introdução visível logo no carregamento
  introScreen.classList.add("active");

  // Event Listener para o botão "Iniciar Jornada"
  iniciarJornadaBtn.addEventListener("click", () => {
    introScreen.style.opacity = 0;
    introScreen.style.pointerEvents = "none";

    setTimeout(() => {
      introScreen.classList.remove("active");

      oraculoIntro.classList.add("active");
      oraculoIntro.style.opacity = 0; // Prepara para o fade-in do oráculo
      oraculoIntro.style.pointerEvents = "auto";

      setTimeout(() => {
          oraculoIntro.style.opacity = 1; // Faz o fade-in do oráculo
          showNextParagraph(); // Inicia a digitação do texto do oráculo
      }, 50);

    }, 1000); // Espera o tempo da transição de fade-out da intro-screen
  });

  // Evento para o botão "Avançar" (para continuar ou avançar para próxima etapa)
  avancarBtn.addEventListener("click", () => {
    // Aqui você pode adicionar a lógica para a próxima fase do jogo
    alert("Jornada Avançando!");
    // Exemplo: window.location.href = "proxima_pagina.html";
  });

  // Evento para o botão "Voltar ao Menu Principal"
  voltarMenuBtn.addEventListener("click", () => {
    alert("Voltando ao Menu Principal!");

    // Esconde a tela do oráculo com fade-out
    oraculoIntro.style.opacity = 0;
    oraculoIntro.style.pointerEvents = "none";

    // Limpa qualquer digitação em andamento
    if (typingTimeout) clearTimeout(typingTimeout);
    dialogoTextoAtual.innerHTML = ''; // Limpa o texto visível

    setTimeout(() => {
        oraculoIntro.classList.remove('active'); // Remove a classe 'active' do oráculo

        // Mostra a tela de introdução com fade-in
        introScreen.classList.add('active');
        introScreen.style.opacity = 1;
        introScreen.style.pointerEvents = "auto";

        // Resetar o estado do oráculo para a próxima vez que for iniciado
        currentIndex = 0; // Volta para o primeiro diálogo
        botoesOraculoContainer.classList.remove("visible"); // Esconde os botões
    }, 1000); // Tempo para o fade-out do oráculo
  });
});