document.getElementById('openLink').onclick = async () => {
    const link = document.getElementById('linkInput').value.trim();

    if (!link) {
        alert('Please enter a valid link.');
        return;
    }

    try {
        const response = await fetch(link);

        if (!response.ok) {
            alert('Failed to fetch the link.');
            return;
        }

        const htmlContent = await response.text();
        const iframe = document.getElementById('resultFrame');

        const blob = new Blob([htmlContent], { type: 'text/html' });
        iframe.src = URL.createObjectURL(blob);
    } catch (error) {
        alert('Error processing link: ' + error.message);
    }
};
