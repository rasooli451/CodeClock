






//plan : have an input ready somewhere on the screen that asks the user to set their weekly goal, and then based on how many days are left of the week, it should tell you how many hours you need to code each day of the remaining week to hit the target. you only should let the user hit the start button after they set a target. on the backend, when user selects a weekly goal, the local storage is utilized, the things that will be saved there, will be obj = {day, numofhours}; when coding is done for the day, you click the save button, and it will add your daily hours to the local storage, and the target should be updated on the screen too. the user should only be able to change a target at the start of the week, which is monday, the user shouldn't be able to change their weekly target midweek. if you don't hit your weekly target, the number of hours left will be added to your next week, but the program should specify between hours that need to be completed for the new week and hours that are from the previous weeks. for this, i need to set up the form using html, i will probably only need one js file that handles all logic of the program and one css file to style a bit. might be able to use an api, to get random background images and random inspiration quotes to serve to motivate the programmer whenever they enter the website.

import "./style.css";

let main = document.querySelector(".main");
let weeklygoal = document.querySelector(".weeklygoal");
let daily = document.querySelector(".dailyhour");
let secondspan = document.querySelector(".dailyhour .second");
let minutespan = document.querySelector(".dailyhour .minute");
let hourspan = document.querySelector(".dailyhour .hour");
let startbtn = document.querySelector(".start");
let resetbtn = document.querySelector(".reset");
let savebtn = document.querySelector(".save");
let changebtn = document.querySelector(".change");
let closesign = document.querySelector(".closesign");
let form = document.querySelector(".form");

let sbmtbtn = document.querySelector(".form button");

let input = document.querySelector(".form input");


let second = 0;
let minute = 1;
let hour = 0;
let past = 0;
let starttime = 0;
let running = false;

if (localStorage.length === 0){
    startbtn.disabled = "true";
    pausebtn.disabled = "true";
    savebtn.disabled = "true";
    weeklygoal.textContent = "Not Set Yet";
    daily.textContent = "00:00:00";
}

else{

}


changebtn.addEventListener("click", ()=>{
    form.classList.remove("hidden");
    /*if (isMonday()){
        form.classList.remove("hidden");
    }
    else{
        console.error("Not Monday, you can't change your weekly target now!!");
    }*/
})

closesign.addEventListener("click", ()=>{
    form.classList.add("hidden");
})




sbmtbtn.addEventListener("click", ()=>{
    if (input.value > 0){
        form.classList.add("hidden");
        if (localStorage.length === 0){
            localStorage.setItem("Week", JSON.stringify([input.textContent, "0"]));
        }
        else{
            let arr = JSON.parse(localStorage.getItem("Week"));
            arr[0] = input.textContent;
            localStorage.setItem("Week", arr);
        }
        startbtn.removeAttribute("disabled");
        pausebtn.removeAttribute("disabled");
        savebtn.removeAttribute("disabled");
    }
})





function isMonday(){
    let d = new Date();
    if (d.getDay() === 1){
        return true;
    }
    return false;
}




startbtn.addEventListener("click", ()=>{
    if (running){
        running = false;
        startbtn.textContent = "Start";
        let now = new Date();
        past += now - starttime;
    }
    else{
        running = true;
        startbtn.textContent = "Pause";
        starttime = new Date();
    }
})

resetbtn.addEventListener("click", ()=>{
    past = 0;
    running = false;
    startbtn.textContent = "Start";
})





function starttimer(){
    setInterval(() => {
        if (second === 60){
            second = 0;
            if (minute === 60){
                minute = 0;
                hour += 1;
                hourspan.textContent = formatstring(hour);
            }
            minutespan.textContent = formatstring(minute);
            minute += 1;
        }
        secondspan.textContent = formatstring(second);
        second += 1;
    }, 1000);
}





function formatstring(num){
    if (num < 10){
        return "0" + num;
    }
    else{
        return num;
    }
}


setInterval(function(){
    let total=past;
    if(running){
      total += (new Date())- starttime;
    }
    let h=Math.floor(total/3600000);
    total-=h*3600000;
    let m=Math.floor(total/60000);
    total-=m*60000;
    hourspan.textContent = h;
    minutespan.textContent = ':'+m.toFixed(0).padStart(2,'0');
    secondspan.textContent = ':'+(total/1000).toFixed(2).padStart(5,'0');
  }, 70);



