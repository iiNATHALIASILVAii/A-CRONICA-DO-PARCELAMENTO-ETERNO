document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("novo-jogo-btn")
    .addEventListener("click", function () {
      window.location.href = "NOVA_JORNADA.html"; // tela nova jornada
    });

  document
    .getElementById("continuar-btn")
    .addEventListener("click", function () {
      window.location.href ="login.html"; // tela login
    });

  document
    .getElementById("grimorio-btn")
    .addEventListener("click", function () {
      alert("Abrindo Grimório!"); // Lógica para mostrar o grimório, exemplo: // window.location.href = 'tela_grimorio.html';
    });

  document.getElementById("sair-btn").addEventListener("click", function () {
    alert("Obrigado por jogar! Até a próxima!"); // Lógica ao sair, como: // window.close(); // Nota: Pode não funcionar em todos os navegadores por questões de segurança
  });
});
