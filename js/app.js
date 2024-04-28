function displayCards(elementId) {
    let cardId = elementId + "Card";
    let cardTags = document.getElementsByClassName(document.getElementById(elementId).classList[0]);
    let cards = document.getElementsByClassName('card');
    for (i = 0; i < cards.length; i++) {
        if (cards[i].id == cardId && cardTags[i].id == elementId) {
            cards[i].style.display = 'flex';
            cardTags[i].style.borderBottom = '4px solid #D7A37B'
        }
        else {
            cards[i].style.display = 'none';
            cardTags[i].style.borderBottom = '2px solid hsl(229, 8%, 60%)'
        }
    }
}

//Function for validating the form
let emailId = document.getElementById('emailId');
let contactUs = document.getElementById('contactUs');
contactUs.addEventListener('click', validateEmail);
emailId.addEventListener('blur', validateEmail);

//Validation of Email using regular expressions
function validateEmail() {
    console.log(emailId.value);
    let regex = /^([\_\-\%a-zA-Z0-9\.]+)\@([a-zA-Z0-9]+)\.([a-zA-Z]){3,10}$/;
    console.log(regex.exec(emailId.value));
    if (!regex.test(emailId.value)) {
        document.getElementById('errorImg').style.display = 'inline-block';
        emailId.style.boxShadow = '0px 25px hsl(0, 94%, 66%)';
        emailId.style.border = '3px solid hsl(0, 94%, 66%)';
        document.getElementById('errorMessage').style.display = 'block';
    }
    else {
        emailId.style.boxShadow = 'none';
        document.getElementById('errorImg').style.display = 'none';
        emailId.style.border = 'none';
        document.getElementById('errorMessage').style.display = 'none';
    }
}

function handler(element){
    element.classList.toggle('change');
    let navlist = document.querySelector('.navbar');
    navlist.classList.toggle('show');
}

let mediaRecorder;
let mediaStream; // Variable to hold the media stream
let chunks = [];
let isRecording = false; // Variable to track recording state

const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');

recordButton.addEventListener('mousedown', startRecording); // Start recording when mouse button is pressed down
document.addEventListener('mouseup', stopRecording); // Stop recording when mouse button is released anywhere on the page

function startRecording() {
    if (!isRecording) {
        isRecording = true;

        // Clear the chunks array before starting a new recording
        chunks = [];

        // Remove existing audio element if it exists
        const existingAudio = document.querySelector('audio');
        if (existingAudio) {
            existingAudio.parentNode.removeChild(existingAudio);
        }

        // Release media recorder and media stream if they exist
        if (mediaRecorder) {
            mediaRecorder.ondataavailable = null;
            mediaRecorder.onstop = null;
            mediaRecorder = null;
        }
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                mediaStream = stream; // Store the media stream
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = function(e) {
                    chunks.push(e.data);
                };
                mediaRecorder.onstop = function() {
                    const blob = new Blob(chunks, { 'type' : 'audio/wav' });
                    const url = URL.createObjectURL(blob);
                    const audio = new Audio(url);
                    audio.controls = true;
                    document.body.appendChild(audio);

                    // Automatically download the audio file
                    const downloadLink = document.createElement('a');
                    downloadLink.href = url;
                    downloadLink.download = 'recorded_audio.wav';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                };
                mediaRecorder.start();
                recordButton.disabled = true;
                stopButton.disabled = false;
            })
            .catch(function(err) {
                console.log('Error:', err);
            });
    }
}

function stopRecording() {
    if (isRecording && mediaRecorder && mediaStream) {
        mediaRecorder.stop();
        mediaStream.getTracks().forEach(track => track.stop()); // Stop the media stream (microphone)
        recordButton.disabled = false;
        stopButton.disabled = true;
        isRecording = false;
    }
}
