document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("novo-jogo-btn").addEventListener("click", function () {
    window.location.href = "nova-jornada.html";
  });

  document.getElementById("continuar-btn").addEventListener("click", function () {
    window.location.href = "login.html";
  });

  document.getElementById("grimorio-btn").addEventListener("click", function () {
    alert("Abrindo Grimório!");
  });

  document.getElementById("sair-btn").addEventListener("click", function () {
    alert("Obrigado por jogar! Até a próxima!");
  });
});