const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#00ff00';
ctx.lineWidth = 2;

const faceCanvas = document.querySelector('.face-detection');
const faceCtx = faceCanvas.getContext('2d');
const faceDetectorAPI = window.faceapi;

async function startWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720},
    });
    video.srcObject = stream;
    await video.play();

    // sizing canvas to be same as video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.faceCanvas = video.videoWidth;
    canvas.faceCanvas = video.videoHeight;
}

async function loadModels() {
        // Use a working CDN path for the models
        const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
        
        // Load only the tiny face detector model first
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    
}

async function detect() {
    await loadModels();

    const faces = await faceDetectorAPI.detectAllFaces(video, 
        new faceDetectorAPI.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
    );

    faces.forEach(detectAndDrawFace);
    requestAnimationFrame(detect);
}

async function detectAndDrawFace(face) {
    const { width, height, x, y } = face.box;
    ctx.strokeRect(x, y, width, height);

}

startWebcam().then(detect);

console.log(faceDetectorAPI);