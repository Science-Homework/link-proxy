const openLinkButton = document.getElementById('openLink');
const linkInput = document.getElementById('linkInput');
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const saveSettings = document.getElementById('saveSettings');

// SETTINGS STORAGE
let enableAboutBlank = false;
let backgroundImage = '';
let panicMatrix = '';
let panicRedirect = '';
let keysPressed = [];

// OPEN LINK
openLinkButton.onclick = () => {
    const link = linkInput.value.trim();
    if (!link) {
        alert('Please enter a valid link.');
        return;
    }

    if (enableAboutBlank) {
        const newTab = window.open('about:blank', '_blank');
        if (newTab) {
            newTab.document.write(`
                <html>
                    <head>
                        <style>
                            body { background: url('${backgroundImage}') no-repeat center center fixed; background-size: cover; margin: 0; height: 100vh; }
                        </style>
                    </head>
                    <body>
                        <iframe src="${link}" style="border: none; width: 100%; height: 100%;"></iframe>
                    </body>
                </html>
            `);
        } else {
            alert("Pop-up blocked. Enable pop-ups and try again.");
        }
    } else {
        window.open(link, '_blank');
    }
};

// SETTINGS BUTTON
settingsButton.onclick = () => {
    document.getElementById('enableAboutBlank').checked = enableAboutBlank;
    document.getElementById('backgroundImage').value = backgroundImage;
    document.getElementById('panicMatrix').value = panicMatrix;
    document.getElementById('panicRedirect').value = panicRedirect;
    settingsModal.style.display = 'block';
};

// CLOSE SETTINGS MODAL
closeSettings.onclick = () => settingsModal.style.display = 'none';

// SAVE SETTINGS
saveSettings.onclick = () => {
    enableAboutBlank = document.getElementById('enableAboutBlank').checked;
    backgroundImage = document.getElementById('backgroundImage').value;
    panicMatrix = document.getElementById('panicMatrix').value.toLowerCase();
    panicRedirect = document.getElementById('panicRedirect').value;
    settingsModal.style.display = 'none';
    alert('Settings saved.');
};

// PANIC MATRIX
document.addEventListener('keydown', (e) => {
    keysPressed.push(e.key.toLowerCase());
    if (keysPressed.join('+').includes(panicMatrix)) {
        if (panicRedirect) {
            window.location.href = panicRedirect;
        }
        keysPressed = [];
    }
});

// CLEAR KEYS ON KEYUP
document.addEventListener('keyup', () => {
    keysPressed = [];
});
