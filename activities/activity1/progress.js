const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = 0;

function setProgress(percent) {
   let offset; 
    if(!percent) offset = 0;
    else{
        offset = (percent / 100) * circumference + 18.85;
    }
  circle.style.strokeDashoffset = offset;
}