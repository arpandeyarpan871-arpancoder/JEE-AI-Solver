async function solve(){

let question = document.getElementById("question").value;
let subject = document.getElementById("subject").value;

if(question==""){
document.getElementById("answer").innerHTML="Enter a question";
return;
}

document.getElementById("answer").innerHTML="AI is solving...";

let response = await fetch("https://jee-ai-solver.onrender.com/solve",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
question: subject + ": " + question
})
});

let data = await response.json();

document.getElementById("answer").innerHTML=data.answer;

}
