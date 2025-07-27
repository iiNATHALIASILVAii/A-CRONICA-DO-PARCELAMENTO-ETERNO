// script.js

// Espera até que a página esteja completamente carregada
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-btn");

  // Esconde o botão no começo (opcional se já estiver escondido via CSS)
  startButton.style.opacity = 0;
  startButton.style.pointerEvents = "none";

  // Simula um pequeno delay para exibir o botão com efeito
  setTimeout(() => {
    startButton.style.opacity = 1;
    startButton.style.pointerEvents = "auto";
    startButton.classList.add("fade-in");
  }, 2000); // 2 segundos de suspense antes do botão aparecer

  // Quando clicar no botão, pode ir para outra parte do jogo ou mudar a tela
  startButton.addEventListener("click", () => {
    alert("O jogo vai começar!"); // Aqui você pode trocar pra carregar o próximo conteúdo
    // window.location.href = "jogo.html"; ← exemplo de navegação
  });
});
