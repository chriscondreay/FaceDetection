const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face-detection');
const faceCtx = faceCanvas.getContext('2d');
const faceDetectorAPI = window.faceapi;

const controlInputs = document.querySelectorAll('.controls input[type="range"]');
console.log(controlInputs);


const controls = {
    SIZE: 10,
    SCALE: 1.35,
}

function handleControls(e) {
    const { value, name } = e.currentTarget;
    controls[name] = parseFloat(value);
}

controlInputs.forEach(input => input.addEventListener('input', handleControls));

async function startWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720},
    });
    video.srcObject = stream;
    await video.play();

    // sizing canvas to be same as video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;
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
    faces.forEach(censorFace);
    requestAnimationFrame(detect);
}

async function detectAndDrawFace(face) {
    const { width, height, x, y } = face.box;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'none';
    ctx.lineWidth = 2;

    ctx.strokeRect(x, y, width, height);

}

async function censorFace({ box: face }) {
    faceCtx.imageSmoothEnabled = false;
    faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
    faceCtx.drawImage(
        // 5 source args
        video,
        face.x,
        face.y,
        face.width,
        face.width,
        
        // 4 draw args
        face.x,
        face.y,
        controls.SIZE, 
        controls.SIZE
    );

    const width = face.width * controls.SCALE;
    const height = face.height * controls.SCALE;
    faceCtx.drawImage(
        faceCanvas,
        face.x,
        face.y,
        controls.SIZE,
        controls.SIZE,

        face.x - (width - face.width) / 2,
        face.y - (height - face.height) / 2.5,
        width,
        height
    );
}

startWebcam().then(detect);

console.log(faceDetectorAPI);