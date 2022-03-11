const update = document.querySelector('.votes');
const foodName = document.getElementsByClassName('card-title');
const image = document.getElementById('burger');
const button = document.getElementsByClassName('btn1');

const update2 = document.querySelector('.votes2');
const foodName2 = document.getElementsByClassName('card-title2');
const image2 = document.getElementById('sushi');
const button2 = document.getElementsByClassName('btn2');

const messageHeader = document.getElementsByClassName('messageHeading')
const message = document.getElementsByClassName('message')

let bothButtons = document.getElementsByClassName('btn-primary');
let hasVoted = localStorage.getItem("food photo");


if(!hasVoted) {
    update.addEventListener('click', _ => {
        fetch('/votes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: foodName[0].innerHTML,    
            srcUrl: image.src,
            altText:  image.alt,
            votes: parseInt(button[0].getAttribute('value')) + 1
        })
        })
        .then(response => response.json())
        .then(() => localStorage.setItem("food photo", "voted"))
        .then(() => messageHeader[0].innerHTML= "Mmm..Burgers *gulp*")
        .then(() => message[0].innerHTML = "+1 Burger");
        
    })


    update2.addEventListener('click', _ => {
        fetch('/votes', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: foodName2[0].innerHTML,    
                srcUrl: image2.src,
                altText:  image2.alt,
                votes: parseInt(button2[0].getAttribute('value')) + 1
            })
        })
        .then(response => response.json())
        .then(() => localStorage.setItem("food photo", "voted"))
        .then(() =>  messageHeader[0].innerHTML= "Arigato!")
        .then(() => message[0].innerHTML = "+1 Sushi");
    })

} else {
    bothButtons.disabled = true;
}