
async function solve(){

let question = document.getElementById("question").value;
let subject = document.getElementById("subject").value;

if(question==""){
document.getElementById("answer").innerHTML="Enter a question";
return;
}

document.getElementById("answer").innerHTML =
"AI is solving your "+subject+" problem...";

}
