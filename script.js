document.addEventListener("DOMContentLoaded", function () {
  // Este bloco não é mais necessário, pois não temos o botão "start-btn"
  // const startButton = document.getElementById("start-btn");
  // startButton.style.opacity = 0;
  // startButton.style.pointerEvents = "none";
  // setTimeout(() => {
  //     startButton.style.opacity = 1;
  //     startButton.style.pointerEvents = "auto";
  //     startButton.classList.add("fade-in");
  // }, 2000);
  // startButton.addEventListener("click", () => {
  //     alert("O jogo vai começar!");
  // });

  document
    .getElementById("novo-jogo-btn")
    .addEventListener("click", function () {
      window.location.href = "NOVA_JORNADA.html";
    });

  document
    .getElementById("continuar-btn")
    .addEventListener("click", function () {
      alert("Continuando Jornada!");
      // Aqui vou colocar a lógica para carregar um jogo salvo
      // Exemplo: window.location.href = 'tela_continuar.html';
    });

  document
    .getElementById("grimorio-btn")
    .addEventListener("click", function () {
      alert("Abrindo Grimório!");
      // Aqui vou colocar a lógica para mostrar o grimório
      // Exemplo: window.location.href = 'tela_grimorio.html';
    });

  document.getElementById("sair-btn").addEventListener("click", function () {
    alert("Obrigado por jogar! Até a próxima!");
    // Aqui vou colocar alguma lógica ao sair
    // window.close(); // Nem sempre funciona por segurança do navegador
  });
});
