
      //! This is for the Hint Button Event
      document.getElementById("hint").addEventListener(
        "click",
        (e) => {
          let contain = document.getElementsByClassName("container")[0];
          contain.classList.add("container-hover");
          setTimeout(() => {
            contain.classList.remove("container-hover");
          }, 5000);
        },
        { once: true }
      );
      //Here the Hint Button Ends



//! MCQ Fetching

document.addEventListener("DOMContentLoaded", () => {
   task();   
});

let task = async()=>{
  let data = await fetch("./Database/html_mcq_questions.json")
  let result = await data.json();
  console.log(result)
  
startQuizz(result); // Make sure this function runs only after the DOM loads
return result
}
let questions;
//This is the variable which will be assigned data to 
const questionEle = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuizz(result)
{
    questions = result;
    currentQuestionIndex = 0;
    score = 0;
    console.log("hit")
    nextBtn.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
  resetState();
    console.log(questions)
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
   questionEle.innerHTML = questionNo + ". " + currentQuestion.question;
// console.log(   currentQuestion.question)
    document.getElementById("hint-text-para").innerText=`${currentQuestion.hint}`
   currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    console.log(answer.text)
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if(answer.correct)
    {
      button.dataset.correct=answer.correct;
    }
    button.addEventListener("click", selectAnswer);
   });

}
function resetState()
{
  nextBtn.style.display='none';
  while(answerBtn.firstChild)
  {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e)
{
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if(isCorrect)
  {
    score++;
    selectedBtn.classList.add("correct");
  }
  else
  {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach(button=>{
    if(button.dataset.correct === "true")
    {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}


nextBtn.addEventListener('click',()=>{
  if(currentQuestionIndex < questions.length)
  {
    handleNextBtn();
  }
  else{
    startQuizz();
  }
})

// function showScore()
// {
//   resetState();
//   questionEle.innerHTML= `You Scored ${score} out of ${questions.length} `
//   nextBtn.innerHTML='Play Again';
//   nextBtn.style.display = "block";
// }

function handleNextBtn()
{
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length)
  {
    showQuestion();
  }
  else
  {
    showScore();
  }
}


