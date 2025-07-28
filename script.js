document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("novo-jogo-btn")
    .addEventListener("click", function () {
      window.location.href = "NOVA_JORNADA.html"; // Certifique-se que o nome do arquivo HTML está correto
    });

  document
    .getElementById("continuar-btn")
    .addEventListener("click", function () {
      alert("Continuando Jornada!"); // Lógica para carregar um jogo salvo, exemplo: // window.location.href = 'tela_continuar.html';
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
