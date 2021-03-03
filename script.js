/*
note:const can be for ES6 instead of var
*/
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip =document.querySelector('.strip');
const snap =document.querySelector('.snap');

// var pixels;

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
        console.log(localMediaStream);
//         video.src =window.URL.createObjectURL(localMediaStream);
        video.srcObject = localMediaStream
        video.play();
    }).catch(err =>{
        console.error('oh why errors!!', err);
    });
//     .then(stream => video.srcObject = stream)
//   .catch(e => console.error(e));
}
function paintToCanvas() {
    const width =video.videoWidth;
    const height =video.videoHeight;
    canvas.width =width;
    canvas.height =height;

   return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        var pixels= ctx.getImageData(0, 0, width, height);

        // pixels =redEffect(pixels);
         pixels =rgbSplit(pixels); //for drowsy feel
        // ctx.globalAlpha =0.1;//for transparent effect

        //pixels =greenScreen(pixels);//for a white and black effect
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}
function takePhoto() {
    snap.currentTime =0;
    snap.play();

    //take the data from cavas
    const data = canvas.toDataURL('image/jpeg');
    
    const link = document.createElement('a');
    link.href =data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = '<img src="${data}" alt="Handsome" />';
    strip.insertBefore(link, strip.firstChild);
    
}
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i + 0] = pixels.data[i + 0] + 100; //Red
        pixels.data[i + 1] = pixels.data[i + 1] - 50;//Green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //Blue
    }
    return pixels;
}
function rgbSplit(params) {
    for (let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i - 150] = pixels.data[i + 0] + 100; //Red
        pixels.data[i + 500] = pixels.data[i + 1] - 50; //Green
        pixels.data[i - 550] = pixels.data[i + 2] * 0.5; //Blue
    }
    return pixels;
}
function greenScreen(pixels) {
    var levels = {};
    //const levels ={};
    [...document.querySelectorAll('.rgb input')].forEach((input)=>{
        levels[input.name] = input.value;
    });

    for (let i = 0; i < pixels.data.length; i+=4){
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}
getVideo();

video.addEventListener('canplay', paintToCanvas);
