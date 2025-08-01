document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('image-input');
    const originalImage = document.getElementById('original-image');
    const resultImage = document.getElementById('result-image');
    const downloadBtn = document.getElementById('download-btn');
    const apiKey = 'zixqRmA4MPbSLVSS17sDMgqs'; // <-- IMPORTANT: Replace with your remove.bg API key

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Prepare the form data to send to the API
        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('size', 'auto');

        // Make the API request
        fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(JSON.stringify(err));
                });
            }
            return response.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            resultImage.src = url;
            downloadBtn.href = url;
            downloadBtn.style.visibility = 'visible';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to remove background. Please check the console for details.');
        });
    });
});
