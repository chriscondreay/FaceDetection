# Face Detection & Censorship App 🕵🏻

#### Table Of Contents
[Description](#description) <br>
[Demo](#demo) <br>
[How It Works](#how-it-works) <br>
[Technologies Used](#technologies-used) <br>
[How To Use](#how-to-use)

## Description
This project is a face detection and censorship application that uses a webcam to detect people's faces and automatically censors them using a pixelation effect. It was built using HTML, JavaScript, and the face-api.js library for the face detection.

## Demo
When loading the application from the browser:
- The webcam feed starts
-  The app will detect any visible face
-  Each face is then automatically censored in real time

## How It Works
The project finds faces using the `tinyFaceDetector` model from the `face-api.js` library and overlays them using pixelation to censor them.
### Main Features:
- Real-time face detection using the webcam
- Pixelation for face censorship effect
- Responsive canvas that syncs with video feedback
- Async and await JavaScript features

## Technologies Used
- HTML
- JavaScript
- face-api.js
- Parcel bundler (dev/build)

## How To Use
1. Clone this repo:
   
 ```
 git clone https://github.com/chriscondreay/facedetection.git
 cd facedetection
 ```
   
2. Install dependencies:

 ```
 npm install
 ```

3. Start the server:

 ```
 npm start
 ```
4. Open the browser and visit `http://localhost:1234`
