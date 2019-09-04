// navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
// const video = document.querySelector('.player');
// const canvas = document.querySelector('.photo');
// const ctx = canvas.getContext('2d');
// const strip =document.querySelector('.strip');
// const snap =document.querySelector('.snap');
var video = document.querySelector('.player');
var canvas = document.querySelector('.photo');
var ctx = canvas.getContext('2d');
var strip =document.querySelector('.strip');
var snap =document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.src =window.URL.createObjectURL(localMediaStream);
        video.play();
    }).catch(err =>{
        console.error('oh why errors!!', err);
    });
//     .then(stream => video.srcObject = stream)
//   .catch(e => console.error(e));
}
function paintToCanvas() {
    var width =video.videoWidth;
    var height =video.videoHeight;
    // const width =video.videoWidth;
    // const height =video.videoHeight;
    canvas.height =width;
    canvas.height =height;

   return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}
function takePhoto() {
    snap.currentTime =0;
    snap.play();

    //take the data from cavas
    var data = canvas.toDataURL('image/jpeg');
    // const data
    console.log(data);
}
getVideo();

video.addEventListener('canplay', paintToCanvas);