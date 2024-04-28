function displayCards(elementId) {
    let cardId = elementId + "Card";
    let cardTags = document.getElementsByClassName(document.getElementById(elementId).classList[0]);
    let cards = document.getElementsByClassName('card');
    for (i = 0; i < cards.length; i++) {
        if (cards[i].id == cardId && cardTags[i].id == elementId) {
            cards[i].style.display = 'flex';
            cardTags[i].style.borderBottom = '4px solid #D7A37B'
        }
        else {
            cards[i].style.display = 'none';
            cardTags[i].style.borderBottom = '2px solid hsl(229, 8%, 60%)'
        }
    }
}

//Function for validating the form
let emailId = document.getElementById('emailId');
let contactUs = document.getElementById('contactUs');
contactUs.addEventListener('click', validateEmail);
emailId.addEventListener('blur', validateEmail);

//Validation of Email using regular expressions
function validateEmail() {
    console.log(emailId.value);
    let regex = /^([\_\-\%a-zA-Z0-9\.]+)\@([a-zA-Z0-9]+)\.([a-zA-Z]){3,10}$/;
    console.log(regex.exec(emailId.value));
    if (!regex.test(emailId.value)) {
        document.getElementById('errorImg').style.display = 'inline-block';
        emailId.style.boxShadow = '0px 25px hsl(0, 94%, 66%)';
        emailId.style.border = '3px solid hsl(0, 94%, 66%)';
        document.getElementById('errorMessage').style.display = 'block';
    }
    else {
        emailId.style.boxShadow = 'none';
        document.getElementById('errorImg').style.display = 'none';
        emailId.style.border = 'none';
        document.getElementById('errorMessage').style.display = 'none';
    }
}

function handler(element){
    element.classList.toggle('change');
    let navlist = document.querySelector('.navbar');
    navlist.classList.toggle('show');
}