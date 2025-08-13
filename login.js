document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro");
  const formPerguntas = document.getElementById("formPerguntas");
  const perguntasContainer = document.getElementById("perguntas-container");
  const cadastroContainer = document.getElementById("cadastro-container"); // Adicionado
  const voltarMenuBtn = document.getElementById("voltar-menu-btn"); // Adicionado

  // Lógica para o formulário de cadastro
  formCadastro.addEventListener("submit", (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Captura os dados inseridos
    const nome = document.getElementById("nome").value;
    const nickname = document.getElementById("nickname").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Salva as informações no localStorage
    localStorage.setItem("nomeUsuario", nome);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);

    // Oculta a tela de cadastro e exibe a de perguntas
    cadastroContainer.style.display = "none";
    perguntasContainer.style.display = "block";
  });

  // Lógica para o formulário de perguntas
  formPerguntas.addEventListener("submit", (event) => {
    event.preventDefault();

    const respostaTempo = formPerguntas.tempo.value;

    // Lógica para determinar o guardião baseado na resposta
    let guardiao;
    switch (respostaTempo) {
      case "atividades físicas":
        guardiao = "Flora";
        break;
      case "estudar":
        guardiao = "Mentis";
        break;
      case "organizar":
        guardiao = "Ordus";
        break;
      case "auto-cuidado":
        guardiao = "Lumen";
        break;
      case "tecnologia":
        guardiao = "Lux";
        break;
      case "finanças":
        guardiao = "Lucros";
        break;
    }

    // Salva a informação do guardião
    localStorage.setItem("guardiao", guardiao);

    // Redireciona para a tela do mapa (ou a próxima página)
    window.location.href = "mapa.html";
  });

  // Lógica para o botão de voltar
  if (voltarMenuBtn) {
    voltarMenuBtn.addEventListener("click", () => {
      window.location.href = "index.html"; // Redireciona para o menu principal
    });
  }
});
