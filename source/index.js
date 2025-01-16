



let ul = document.querySelector("ul");



//plan : have an input ready somewhere on the screen that asks the user to set their weekly goal, and then based on how many days are left of the week, it should tell you how many hours you need to code each day of the remaining week to hit the target. you only should let the user hit the start button after they set a target. on the backend, when user selects a weekly goal, the local storage is utilized, the things that will be saved there, will be obj = {day, numofhours}; when coding is done for the day, you click the save button, and it will add your daily hours to the local storage, and the target should be updated on the screen too. the user should only be able to change a target at the start of the week, which is monday, the user shouldn't be able to change their weekly target midweek. if you don't hit your weekly target, the number of hours left will be added to your next week, but the program should specify between hours that need to be completed for the new week and hours that are from the previous weeks. for this, i need to set up the form using html, i will probably only need one js file that handles all logic of the program and one css file to style a bit. might be able to use an api, to get random background images and random inspiration quotes to serve to motivate the programmer whenever they enter the website.