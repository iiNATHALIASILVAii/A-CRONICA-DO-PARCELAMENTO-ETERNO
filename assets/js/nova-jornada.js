document.addEventListener("DOMContentLoaded", () => {
  const musicaInicio = document.getElementById("musica-inicio");
  const introScreen = document.querySelector(".intro-screen");
  const oraculoIntro = document.querySelector(".oraculo-intro");
  const dialogoTextoAtual = document.querySelector(".dialogo-texto-atual");

  const iniciarJornadaBtn = document.getElementById("iniciar-jornada-btn");
  const sairIntroBtn = document.getElementById("sair-intro-btn");
  const skipBtn = document.getElementById("skip-btn");
  const avancarBtn = document.getElementById("avancar-btn");
  const voltarMenuBtn = document.getElementById("voltar-menu-btn");

  const dialogos = [
    "O tempo escapando pelos dedos, a lista de afazeres crescendo como trepadeiras selvagens...",
    "Sim, jovem aprendiz. Você foi convocado. Não pelo acaso, mas pelo chamamento do Grimório das Tarefas Esquecidas.",
    "Seu mundo está em desequilíbrio. A procrastinação é uma criatura astuta... e o Tempo, uma entidade que não perdoa.",
    "Mas há esperança!",
    "Juntos, resgataremos tarefas perdidas, converteremos esforços em energia, e reconstruiremos sua história — uma realização de cada vez.",
    "Respire fundo, jovem. A jornada começa agora. O Grimório aguarda sua mão firme e seu coração decidido."
  ];

  let currentIndex = 0;
  let typingTimeout = null;
  let paragraphTimeout = null;

  const typingSpeed = 45;
  const paragraphDelay = 2200;

  function playMusic() {
    if (!musicaInicio) return;

    musicaInicio.volume = 0.1;
    musicaInicio.muted = false;

    musicaInicio.play().catch(() => {
      console.log("A música não pôde ser reproduzida automaticamente.");
    });
  }

  function stopMusic() {
    if (!musicaInicio) return;

    musicaInicio.pause();
    musicaInicio.currentTime = 0;
  }

  function clearTimers() {
    clearTimeout(typingTimeout);
    clearTimeout(paragraphTimeout);
  }

  function setActionButtonsVisibility(visible) {
    if (avancarBtn) {
      avancarBtn.style.visibility = visible ? "visible" : "hidden";
      avancarBtn.style.pointerEvents = visible ? "auto" : "none";
    }

    if (voltarMenuBtn) {
      voltarMenuBtn.style.visibility = visible ? "visible" : "hidden";
      voltarMenuBtn.style.pointerEvents = visible ? "auto" : "none";
    }
  }

  function setSkipVisibility(visible) {
    if (!skipBtn) return;

    skipBtn.style.visibility = visible ? "visible" : "hidden";
    skipBtn.style.pointerEvents = visible ? "auto" : "none";
  }

  function typeWriter(text, element, callback) {
    let charIndex = 0;
    element.innerHTML = "";
    clearTimeout(typingTimeout);

    function type() {
      if (charIndex < text.length) {
        element.innerHTML += text.charAt(charIndex);
        charIndex++;
        typingTimeout = setTimeout(type, typingSpeed);
      } else if (callback) {
        callback();
      }
    }

    type();
  }

  function renderHopeText(text) {
    dialogoTextoAtual.innerHTML = `<span class="destaque-esperanca">${text}</span>`;
    const destaqueSpan = dialogoTextoAtual.querySelector(".destaque-esperanca");

    if (destaqueSpan) {
      destaqueSpan.style.opacity = "0";
      destaqueSpan.style.transform = "scale(0.85)";

      setTimeout(() => {
        destaqueSpan.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        destaqueSpan.style.opacity = "1";
        destaqueSpan.style.transform = "scale(1)";
      }, 30);
    }
  }

  function finalizeDialog() {
    setActionButtonsVisibility(true);
    setSkipVisibility(false);
  }

  function showNextParagraph() {
    clearTimers();

    if (currentIndex >= dialogos.length) {
      finalizeDialog();
      return;
    }

    setActionButtonsVisibility(false);
    setSkipVisibility(true);

    const currentText = dialogos[currentIndex];

    if (currentText === "Mas há esperança!") {
      renderHopeText(currentText);
      currentIndex++;

      paragraphTimeout = setTimeout(() => {
        showNextParagraph();
      }, paragraphDelay);
      return;
    }

    typeWriter(currentText, dialogoTextoAtual, () => {
      currentIndex++;

      if (currentIndex < dialogos.length) {
        paragraphTimeout = setTimeout(() => {
          showNextParagraph();
        }, paragraphDelay);
      } else {
        finalizeDialog();
      }
    });
  }

  function skipDialogs() {
    clearTimers();
    currentIndex = dialogos.length;
    dialogoTextoAtual.innerHTML = dialogos[dialogos.length - 1];
    finalizeDialog();
  }

  function openOracleIntro() {
    playMusic();

    if (introScreen) {
      introScreen.classList.remove("active");
      introScreen.setAttribute("aria-hidden", "true");
    }

    if (oraculoIntro) {
      oraculoIntro.classList.add("active");
      oraculoIntro.setAttribute("aria-hidden", "false");
    }

    currentIndex = 0;
    dialogoTextoAtual.innerHTML = "";
    setActionButtonsVisibility(false);
    setSkipVisibility(true);

    showNextParagraph();
  }

  function exitToMenu() {
    clearTimers();
    stopMusic();
    window.location.href = "index.html";
  }

  function goToNextScreen() {
    clearTimers();
    stopMusic();
    window.location.href = "login.html";
  }

  window.addEventListener("pageshow", () => {
    if (musicaInicio) {
      musicaInicio.volume = 0.1;
    }
  });

  if (introScreen) {
    introScreen.classList.add("active");
    introScreen.setAttribute("aria-hidden", "false");
  }

  if (oraculoIntro) {
    oraculoIntro.setAttribute("aria-hidden", "true");
  }

  setActionButtonsVisibility(false);
  setSkipVisibility(false);

  if (iniciarJornadaBtn) {
    iniciarJornadaBtn.addEventListener("click", openOracleIntro);
  }

  if (sairIntroBtn) {
    sairIntroBtn.addEventListener("click", exitToMenu);
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", skipDialogs);
  }

  if (voltarMenuBtn) {
    voltarMenuBtn.addEventListener("click", exitToMenu);
  }

  if (avancarBtn) {
    avancarBtn.addEventListener("click", goToNextScreen);
  }
});