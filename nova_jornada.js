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

  let currentIndex = 0;
  let typingTimeout;
  const typingSpeed = 50; // Velocidade de "digitação" (ms por caractere)
  const paragraphDelay = 1500; // Atraso entre parágrafos (ms)

  // Função para exibir o texto com efeito de digitação
  function typeWriter(text, element, callback) {
    let charIndex = 0;
    element.textContent = ""; // Limpa o conteúdo antes de digitar

    function type() {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
        typingTimeout = setTimeout(type, typingSpeed);
      } else {
        if (callback) callback(); // Chama o callback quando a digitação terminar
      }
    }
    type();
  }

  // Função para mostrar o próximo parágrafo
  function showNextParagraph() {
    if (currentIndex < dialogos.length) {
      const currentParagraphElement = paragrafosOraculo[currentIndex];
      const currentText = dialogos[currentIndex];

      currentParagraphElement.classList.add("visible"); // Torna o parágrafo visível para a animação CSS

      // Se for o parágrafo "Mas há esperança!", aplica a classe de destaque
      if (currentParagraphElement === esperancaTexto) {
        esperancaTexto.classList.add("visible"); // Ativa a animação de destaque
        // Para "Mas há esperança!", não há efeito de digitação, apenas aparece
        currentParagraphElement.textContent = currentText;
        setTimeout(() => {
          currentIndex++;
          showNextParagraph();
        }, paragraphDelay * 1.5); // Um pouco mais de atraso para o destaque
      } else {
        typeWriter(currentText, currentParagraphElement, () => {
          // Quando a digitação terminar
          currentIndex++;
          setTimeout(showNextParagraph, paragraphDelay); // Espera um pouco antes do próximo
        });
      }
    } else {
      // Todos os parágrafos foram exibidos, mostra o botão "Avançar"
      avancarBtn.style.display = "block";
      avancarBtn.classList.add("visible"); // Adiciona classe para possível animação do botão
      // Adiciona uma pequena animação de fade-in para o botão se desejar
      avancarBtn.style.opacity = 0;
      setTimeout(() => {
        avancarBtn.style.transition = "opacity 0.5s ease-in-out";
        avancarBtn.style.opacity = 1;
      }, 100);
    }
  }

  // Iniciar a exibição dos parágrafos quando a página carregar
  showNextParagraph();

  // Evento para o botão "Avançar"
  avancarBtn.addEventListener("click", () => {
    alert("Jornada Avançando!"); // Placeholder: substitua pela lógica de avanço do jogo
    // Por exemplo: window.location.href = "proxima_pagina.html";
  });
});
