






//plan : have an input ready somewhere on the screen that asks the user to set their weekly goal, and then based on how many days are left of the week, it should tell you how many hours you need to code each day of the remaining week to hit the target. you only should let the user hit the start button after they set a target. on the backend, when user selects a weekly goal, the local storage is utilized, the things that will be saved there, will be obj = {day, numofhours}; when coding is done for the day, you click the save button, and it will add your daily hours to the local storage, and the target should be updated on the screen too. the user should only be able to change a target at the start of the week, which is monday, the user shouldn't be able to change their weekly target midweek. if you don't hit your weekly target, the number of hours left will be added to your next week, but the program should specify between hours that need to be completed for the new week and hours that are from the previous weeks. for this, i need to set up the form using html, i will probably only need one js file that handles all logic of the program and one css file to style a bit. might be able to use an api, to get random background images and random inspiration quotes to serve to motivate the programmer whenever they enter the website. whenever the website starts up, a few possibilites, 1- the user is still in the week and has a chance to code, in this case, user should be able to start the timestop and have progress. 2- the user is past the week, and the target hasn't been reached, we find this out by comparing the dates, in this case, if that day is a monday, then the user could set a new target for that week and work towards that and after that go for the leftover or it can just code for the leftover, if it's not a monday, then the user can't set a new target for the week, but should be able to start the timer for the leftover. So, how we going to store these in local storage, we make an object with attributes of date of the monday, target and leftovers if there's any whenver the user is setting weekly target. when user saves, we go to the localstorage and first if there's a weeklytarget, we reduce that, if that is 0, then we reduce the leftovers if there's any, if both are 0, then we subtract the weekly target which is going to be a negative number, in this case, when the user sets a new target, we will take that into account and reduce weekly goal accordingly.

import "./style.css";

import Week from "./Week";

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
let weektitle = document.querySelector(".week");
let input = document.querySelector(".form input");
let targetspan = document.querySelector(".weeklygoal .target");
let leftoverspan = document.querySelector(".weeklygoal .leftover");

let stillintheweek = false;
let weekwasted = false;



let past = 0;
let starttime = 0;
let running = false;

localStorage.clear();

if (localStorage.length === 0){
    startbtn.disabled = "true";
    resetbtn.disabled = "true";
    savebtn.disabled = "true";
    targetspan.textContent = "Not Set Yet";
    leftoverspan.textContent = "No Leftovers";
    changebtn.textContent = "Set Target";
    weektitle.textContent = "CodeClock:A tool to help you be consistent in coding";
}
else{
    let week = JSON.parse(localStorage.getItem("Week"));
    let lastmonday = week.Mondaydate;
    changebtn.textContent = "Change Target";
    let todaydate = new Date();
    let diff = dateDiffInDays(lastmonday, todaydate);
    if (diff >= 7){
        stillintheweek = false;
        if (week.target > 0){
            targetspan.textContent = "Week Wasted";
            let temp = Number(week.target) + week.leftover;
            week.leftover = temp;
            leftoverspan.textContent = temp;
            weekwasted = true;
        }
        else{
            targetspan.textContent = "Goal accomplished!";
            leftoverspan.textContent = (week.leftover === 0) ? "No Leftovers" : week.leftover + "hrs";
            weekwasted = false;
        }
    }
    else{
        targetspan.textContent = week.target + "hrs";
        leftoverspan.textContent = week.leftover + "hrs";
        stillintheweek = true;
    }
    //targetspan.textContent = arr[0] + "hrs";
    //leftoverspan.textContent = arr[1] + "hrs";
    //console.log(localStorage);
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
    const regex = new RegExp(/[^0-9]/, 'g');
    if (!input.value.match(regex) && input.value.length > 0){
        form.classList.add("hidden");
        if (localStorage.length === 0){
            localStorage.setItem("Week", JSON.stringify(new Week(new Date(), input.value, 0)));
            targetspan.textContent = input.value + "hrs";
            leftoverspan.textContent = "0hrs";
        }
        else{
            let week = JSON.parse(localStorage.getItem("Week"));
            week.target = input.value;
            week.Mondaydate = new Date();
            localStorage.setItem("Week", JSON.stringify(week));
            targetspan.textContent = week.target + "hrs";
            leftoverspan.textContent = week.leftover + "hrs";
        }
        input.value = "";
        startbtn.removeAttribute("disabled");
        resetbtn.removeAttribute("disabled");
        savebtn.removeAttribute("disabled");
    }
    else{
        console.log(false);
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
    hourspan.textContent = formatstring(h);
    minutespan.textContent = ':'+m.toFixed(0).padStart(2,'0');
    secondspan.textContent = ':'+(total/1000).toFixed(2).padStart(5,'0');
  }, 70);




//console.log(localStorage);


function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }



  
console.log(localStorage);



  