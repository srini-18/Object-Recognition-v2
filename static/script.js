const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

function sendFrame(video) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");

    fetch("/detect", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: imageData })
    })
    .then(res => res.json())
    .then(data => console.log(data));
}
function captureAndDetect() {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append('frame', blob, 'frame.jpg');
        fetch('http://localhost:5000/detect', { // Adjust if your backend is on a different port
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Detection error:", data.error);
                detectionResultsDiv.textContent = "Error during detection.";
            } else {
                displayDetectionResults(data);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            detectionResultsDiv.textContent = "Error connecting to detection server.";
        });
    }, 'image/jpeg');
}const video = document.getElementById("video");

navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
    video.srcObject = stream;
    video.play();
});

function captureAndSend() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");

    fetch("/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData })
    })
    .then(res => res.json())
    .then(data => console.log(data));
}

function displayDetectionResults(results) {
    let resultsText = "Detected Objects: ";
    for (const item in results) {
        resultsText += `${item} (${results[item].confidence.toFixed(2)}) `;
    }
    detectionResultsDiv.textContent = resultsText;
}
