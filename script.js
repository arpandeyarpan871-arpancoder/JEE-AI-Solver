function solve() {

let question = document.getElementById("question").value;
let subject = document.getElementById("subject").value;

if(question == ""){
    document.getElementById("answer").innerHTML = 
    "Please enter a question";
    return;
}

document.getElementById("answer").innerHTML =
"Solving your " + subject + " problem...<br><br>" +
"AI solution will be connected here soon.";

}
