
// getting all necessary elements to be used 
const enterbutton = document.querySelector("#userbutton");
const homecontainer = document.querySelector(".home_container");
const quizbox = document.querySelector(".quiz_container");
const resultbox = document.querySelector(".result_container");
const timetext = document.querySelector(".timer");
const question_options = document.querySelector(".que_options");
const timeCount = document.querySelector(".timecount");
const score = document.querySelector(".score");
const usernameof = document.getElementById("userap");
const subject_title = document.getElementById("subject");

// after clicking enter button
enterbutton.onclick = ()=>{
    var radio= document.getElementsByName('categ');
    var x = document.getElementById("username").value;
    for (i = 0; i < radio.length; i++){
        if(radio[i].checked){                       //check which option is selected
            var checkedop = true;
            var selected_category = radio[i].value; //store selected option
        }
    }
    if(checkedop && x==""){ //check if username is entered while category is selected               
        alert("ennter name");
    }
    else if(!checkedop && x!=""){ //check if usrname is entered but category not selected
        alert("select category");
    }
    else if(checkedop && x!=""){ //if both username and category is selected
        console.log(selected_category); //check
        homecontainer.classList.add("deactivehome"); //hide home container
        quizbox.classList.add("activequiz"); //show quiz container
        subject_title.innerHTML = selected_category;
        usernameof.innerHTML = '<b>'+x+'</b> your result is :';
        showQuetions(0,selected_category); //calling showQestions function
        queCounter(1); //passing 1 parameter to queCounter
        startTimer(10); //calling startTimer function
    }
    else{
        alert("enter name and select category"); //message to enter name and select category
    }
    
}


let timeValue =  10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// buttons at the results page

const startagain = document.querySelector("#startagain");
const gotohome = document.querySelector("#go_to_home");

// if clicked on start again

startagain.onclick = ()=>{
    quizbox.classList.add("activequiz"); //show quiz container
    resultbox.classList.remove("activeresult"); //hide result container
    timeValue = 10; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    startTimer(timeValue); //calling startTimer function
    next_button.classList.remove("show"); //hide the next button
}

const next_button = document.querySelector(".next_que");
const question_counter = document.querySelector(".question_no")

// if go to home is clicked
gotohome.onclick = ()=>{
    window.location.reload(); //reload the current window
}

// if Next Question button is clicked
next_button.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        timerbox.style.color = "#1fa8e7";
        timerbox.style.borderColor = "#1fa8e7";
        next_button.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index,sel_cat){
    console
    if(sel_cat == "Pipes And Cisterns"){
        questions = questions_type1;
    }
    else if(sel_cat == "Probability"){
        questions = questions_type2;
    }
    else if(sel_cat == "Problem On Ages"){
        questions = questions_type3;
    }
    else{
        questions = questions_type4;
    }
    const que_text = document.querySelector(".question");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    question_options.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = question_options.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


var attempted=0;
//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    // clearInterval(counterLine); //clear counterLine
    attempted++;
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = question_options.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        score.innerHTML = 'SCORE:'+ '<b>'+userScore+'<b>';
        answer.classList.add("correct"); //adding green color to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(question_options.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                question_options.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        question_options.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_button.classList.add("show"); //show the next button if user selected any option
}


// for showing results
const totaltimetaken = document.getElementById("timetaken");
const attemptedquestion = document.getElementById("attempted");
const totalquestions = document.getElementById("totalquestions");
const correctquestions = document.getElementById("correct");
const wrongquestions = document.getElementById("wrong");
const percentages = document.getElementById("percentage");
function showResult(){
    homecontainer.classList.add("deactivehome"); //hide home container
    quizbox.classList.remove("activequiz"); //hide quiz container
    resultbox.classList.add("activeresult"); //show result
    totaltimetaken.innerHTML = 'Total time taken :<b>'+ totaltime + ' seconds';
    attemptedquestion.innerHTML = 'Attempted :<b>' + attempted +'<b>';
    correctquestions.innerHTML = 'Correct :<b>'+userScore+'</b>';
    wrongquestions.innerHTML = 'Wrong :<b>'+(questions.length - userScore)+'</b>';
    totalquestions.innerHTML = 'Total Questions :<b>'+questions.length+'</b>';
    percentages.innerHTML = 'Percentage :<b>'+(userScore/questions.length)*100+'%</b>'

    console.log(totaltime);
}

const timerbox = document.querySelector(".timer");
// for timer
var totaltime=0;
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        totaltime++;
        time--; //decrement the time value
        
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 5){
            timerbox.style.color = "red"; //change color as red
            timerbox.style.borderColor = "red";
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeCount.textContent = "00"; //change the time text to 00
            const allOptions = question_options.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(question_options.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    question_options.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                question_options.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_button.classList.add("show"); //show the next button if user selected any option
        }
    }
}

// question counter
function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag =  '<b>'+index +'/'+ questions.length+'</b>';
    question_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}