document.addEventListener('DOMContentLoaded', () => {
  const elementoTexto = document.getElementById('boot-up-text');
  const textoCarga = [
    '[BOOT SEQUENCE INITIATED]',
    '[CHECKING SYSTEM STATUS]',
    '  - CPU: [OK]',
    '  - RAM: [OK]',
    '  - STORAGE: [OK]',
    '  - NETWORK: [OK]',
    '',
    '[LOADING CORE MODULES]',
    '  - SECURITY MODULE: [INITIALIZED]',
    '  - ENCRYPTION MODULE: [INITIALIZED]',
    '  - DECRYPTION MODULE: [INITIALIZED]',
    '  - UI MODULE: [LOADED]',
    '',
    '[FINALIZING SETUP]',
    '  - CONFIGURING USER INTERFACE',
    '  - LOADING USER PREFERENCES',
    '  - APPLYING SETTINGS',
    '',
    '[LOADING APPLICATION]',
    '  - APP NAME: RATSL',
    '  - VERSION: 1.0',
    '  - MODE: ENCRYPTION/DECRYPTION',
    '',
    '[SYSTEM READY]',
    '',
  ];

  let lineaActual = 0;

  function typeWriter(text, index = 0) {
    if (index < text.length) {
      elementoTexto.textContent += text.charAt(index);
      index++;
      setTimeout(() => typeWriter(text, index), 10);
      cursor.innerHTML = '_';
    } else {
      elementoTexto.textContent += '\n';
      lineaActual++;
      if (lineaActual < textoCarga.length) {
        setTimeout(() => typeWriter(textoCarga[lineaActual]), 50);
      } else {
        cursor.innerHTML = ' '
        let conteoPuntos = 0;
        setInterval(() => {
          elementoTexto.textContent = textoCarga.join('\n') + '\nSTARTING APPLICATION' + '.'.repeat(conteoPuntos % 4);
          conteoPuntos++;
        }, 500);
        setTimeout(iniciarApp, 6000);
      }
    }
  }

  function iniciarApp() {
    window.location.href = 'encriptador.html';
  }

  typeWriter(textoCarga[lineaActual]);
});
