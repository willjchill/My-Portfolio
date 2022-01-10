// General Variables

const body = document.querySelector("body");
const homeBtn = document.querySelector(".home-button");
var canHoverOut = true;
const sec = document.querySelectorAll("section");

// Section Type Objects 

const about = {
    card: sec[1],
    animPeek: "enterCard-left 0.3s forwards",
    animReset: "exitCard-left 0.3s forwards",
    animSet: "setCard-left 1s forwards",
    animHome: "resetCard-left 1s forwards",
    transPeek: "translateX(-96%)",
    transReset: "translateX(-100%)"
}

const project = {
    card: sec[2],
    animPeek: "enterCard-right 0.3s forwards",
    animReset: "exitCard-right 0.3s forwards",
    animSet: "setCard-right 1s forwards",
    animHome: "resetCard-right 1s forwards",
    transPeek: "translateX(96%)",
    transReset: "translateX(100%)"
}

var currentSection = null; 

// Note:
// RequestAnimationFrame greatly improves performance!
// (makes the eventlistener only activate when there is a graphics loop)

function peek(sectionType) {
    if(canHoverOut) {
        window.requestAnimationFrame(() => {
            let myCard = sectionType.card;
            myCard.style.animation = sectionType.animPeek;
            myCard.style.transform = sectionType.transPeek;
        });
    }
}

function reset(sectionType) {
    if(canHoverOut) {
        window.requestAnimationFrame(() => {
            let myCard = sectionType.card;
            myCard.style.animation = sectionType.animReset;
            myCard.style.transform = sectionType.transReset;
        });
    }
}

function set(sectionType, target) {
    if(canHoverOut) {
        async function setting() {
            await sweep(sectionType);
            await smoothScroll(target);
        }
        setting(); 
        currentSection = sectionType; 
    }
}

// smooth scrolling to target AND sweeping card

function sweep(sectionType) {
    window.requestAnimationFrame(() => {
        let myCard = sectionType.card;
        myCard.style.animation = sectionType.animSet;
        body.style.overflowY = "auto";
        canHoverOut = false;
    });
}

function smoothScroll(target) {
    setTimeout(() => {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
        homeBtn.style.display = "flex";
    }, 1000);
}

// going back to home :) 

function toHome() {
    body.scrollTop = 0;
    window.requestAnimationFrame(() => {
        let myCard = currentSection.card;
        myCard.style.animation = currentSection.animHome;
        myCard.style.transform = currentSection.transReset;
        body.style.overflowY = "hidden";
        homeBtn.style.display = "none";
        setTimeout(() => {
            canHoverOut = true; // give animation some time to complete before resetting
        }, 1000);
    });
}

// Rotating Buttons on Academics
const orbital = document.querySelector("#orbital");
const cards = document.querySelectorAll(".bubble");
const resumeBtn = document.querySelector("#resume-btn");

var currentDegree = 0;

// make two sides low opacity if it's a mobile port 
var select = {
    // index1 and index2 are for setting low opacity
    index1: 1,
    index2: 2,
    // index3 and index4 are for setting high opacity
    index3: 3,
    index4: 0,
    // switching
    switch: () => {
        let temp = select.index1;
        select.index1 = select.index3;
        select.index3 = temp;
        temp = select.index2;
        select.index2 = select.index4;
        select.index4 = temp;
    },
}

var c = window.matchMedia("(max-width: 1100px)");
function opaque(c) {
    if (c.matches) { // If media query matches
        cards[select.index1].style.opacity = "0.2";
        cards[select.index2].style.opacity = "0.2";
        cards[select.index3].style.opacity = "1";
        cards[select.index4].style.opacity = "1";
    } else {
        cards[select.index1].style.opacity = "1";
        cards[select.index2].style.opacity = "1";
    }
}
opaque(c);
c.addListener(opaque);

function rotateCard() {
    // yes, the user can technically break the program by rotating like a billion times
    // but the likelihood of that is low so we won't talk about that :c
    // i tried using mod but that made the fourth animation go backwards so... 
    // i could also technically use animation instead of transition but yawn
    currentDegree += 90;
    orbital.style.transform = "rotate3d(0, 0, 1, " + currentDegree.toString() +"deg)"; 
    orbital.style.transition = "transform 1s";
    cards.forEach(x => {
        x.style.transform = "rotate3d(0, 0, 1, " + (-1 * currentDegree).toString() +"deg)";
        x.style.transition = "transform 1s";
    });
    resumeBtn.style.transform = "rotate3d(0, 0, 1, " + (-1 * currentDegree).toString() +"deg)";;
    resumeBtn.style.transition = "transform 1s";
    select.switch();
    opaque(c);
}

/*

Opening user's mail client to send message on submit

*/
const myEmail = 'willjdesueza@gmail.com';
const inputSubject = document.querySelector("#subject");
const inputMessage = document.querySelector("#message");

function submit() {
    let mySubject = inputSubject.value;
    let myMessage = inputMessage.value; 
    window.open(`mailto:${myEmail}?subject=${mySubject}&body=${myMessage}`);
}