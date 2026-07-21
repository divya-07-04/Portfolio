/*==========================================
        LOADING SCREEN
==========================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loading-screen");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1000);

});

/*==========================================
        TYPING EFFECT
==========================================*/

const roles = [

"Software Developer",

"Full Stack Developer",

"Python Developer",

"Data Analyst",

"Machine Learning Engineer",

"AI Enthusiast"

];

const typing = document.getElementById("typing");

let roleIndex = 0;

let charIndex = 0;

let deleting = false;

function typeEffect(){

    let current = roles[roleIndex];

    if(!deleting){

        typing.textContent = current.substring(0,charIndex+1);

        charIndex++;

        if(charIndex===current.length){

            deleting=true;

            setTimeout(typeEffect,1800);

            return;

        }

    }

    else{

        typing.textContent=current.substring(0,charIndex-1);

        charIndex--;

        if(charIndex===0){

            deleting=false;

            roleIndex++;

            if(roleIndex===roles.length){

                roleIndex=0;

            }

        }

    }

    setTimeout(typeEffect,deleting?45:100);

}

typeEffect();

/*==========================================
        THEME TOGGLE
==========================================*/

const themeToggle=document.getElementById("themeToggle");

function setTheme(theme){

    if(theme==="light"){

        document.body.classList.add("light");

        themeToggle.innerHTML='<i class="fas fa-sun"></i>';

    }

    else{

        document.body.classList.remove("light");

        themeToggle.innerHTML='<i class="fas fa-moon"></i>';

    }

    localStorage.setItem("theme",theme);

}

const savedTheme=localStorage.getItem("theme")||"dark";

setTheme(savedTheme);

themeToggle.addEventListener("click",()=>{

    if(document.body.classList.contains("light")){

        setTheme("dark");

    }

    else{

        setTheme("light");

    }

});

/*==========================================
        MOBILE MENU
==========================================*/

const hamburger=document.querySelector(".hamburger");

const navLinks=document.querySelector(".nav-links");

hamburger.addEventListener("click",()=>{

    navLinks.classList.toggle("active");

});

document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });

});

/*==========================================
        SMOOTH SCROLL
==========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/*==========================================
        SCROLL TO TOP
==========================================*/

const scrollBtn=document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        scrollBtn.style.display="block";

    }

    else{

        scrollBtn.style.display="none";

    }

});

scrollBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==========================================
        ACTIVE NAVBAR
==========================================*/

const sections=document.querySelectorAll("section");

const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        const height=section.clientHeight;

        if(scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

/*==========================================
        AOS ANIMATION
==========================================*/

AOS.init({

duration:1000,

once:true,

offset:100

});
/*==========================================
        ANIMATED COUNTERS
==========================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;
            let current = 0;

            const increment = target / 100;

            const updateCounter = () => {

                if (current < target) {

                    current += increment;
                    counter.textContent = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => counterObserver.observe(counter));

/*==========================================
        CURSOR GLOW
==========================================*/

const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

/*==========================================
        GITHUB API
==========================================*/

async function loadRepositories() {

    const container = document.getElementById("repo-list");

    if (!container) return;

    container.innerHTML = "<p>Loading repositories...</p>";

    try {

        const response = await fetch(
            "https://api.github.com/users/divya-07-04/repos?sort=updated"
        );

        const repos = await response.json();

        container.innerHTML = "";

        repos
            .filter(repo => !repo.fork)
            .slice(0, 6)
            .forEach(repo => {

                container.innerHTML += `

<div class="repo-card" data-aos="zoom-in">

<h3>${repo.name}</h3>

<p>${repo.description || "No description available."}</p>

<p>⭐ ${repo.stargazers_count} &nbsp; 🍴 ${repo.forks_count}</p>

<a href="${repo.html_url}" target="_blank">
View Repository
</a>

</div>

`;

            });

    }

    catch (error) {

        container.innerHTML =
            "<p>Unable to load GitHub repositories.</p>";

        console.error(error);

    }

}

loadRepositories();

/*==========================================
        PARTICLES
==========================================*/

tsParticles.load("particles-js", {

    background: {
        color: "transparent"
    },

    fpsLimit: 60,

    particles: {

        number: {
            value: 80
        },

        color: {
            value: "#38bdf8"
        },

        links: {

            enable: true,

            distance: 150,

            color: "#38bdf8",

            opacity: 0.35,

            width: 1

        },

        move: {

            enable: true,

            speed: 2

        },

        opacity: {
            value: 0.5
        },

        size: {
            value: {
                min: 2,
                max: 5
            }
        }

    },

    interactivity: {

        events: {

            onHover: {

                enable: true,

                mode: "repulse"

            }

        },

        modes: {

            repulse: {

                distance: 120

            }

        }

    }

});

/*==========================================
        PROFILE IMAGE TILT
==========================================*/

const profile = document.querySelector(".profile-pic");

if (profile) {

    profile.addEventListener("mousemove", (e) => {

        const rect = profile.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 20;
        const rotateX = ((y / rect.height) - 0.5) * -20;

        profile.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.05)`;

    });

    profile.addEventListener("mouseleave", () => {

        profile.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

    });

}

/*==========================================
        PROJECT CARD TILT
==========================================*/

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 10;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});
/*==========================================
        CONTACT FORM VALIDATION
==========================================*/

const contactForm = document.querySelector("#contact form");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = contactForm.querySelector("input[name='name']");
        const email = contactForm.querySelector("input[name='email']");
        const subject = contactForm.querySelector("input[name='subject']");
        const message = contactForm.querySelector("textarea[name='message']");

        if (
            !name.value.trim() ||
            !email.value.trim() ||
            !subject.value.trim() ||
            !message.value.trim()
        ) {

            alert("Please fill in all fields.");

            return;

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value)) {

            alert("Please enter a valid email address.");

            return;

        }

        alert("Thank you! Your message is ready to be sent.");

        contactForm.reset();

    });

}

/*==========================================
        SCROLL REVEAL
==========================================*/

const revealItems = document.querySelectorAll(
".project-card,.skill-card,.repo-card,.cert-card,.achievement-card,.timeline-item"
);

const revealObserver = new IntersectionObserver(

(entries) => {

entries.forEach(entry => {

if (entry.isIntersecting) {

entry.target.classList.add("show");

}

});

},

{

threshold:0.15

}

);

revealItems.forEach(item=>{

item.classList.add("hidden");

revealObserver.observe(item);

});

/*==========================================
        LAZY IMAGE LOADING
==========================================*/

const images=document.querySelectorAll("img");

const imageObserver=new IntersectionObserver(

(entries,observer)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=entry.target;

if(img.dataset.src){

img.src=img.dataset.src;

img.removeAttribute("data-src");

}

observer.unobserve(img);

}

});

},

{

rootMargin:"100px"

}

);

images.forEach(img=>{

if(img.dataset.src){

imageObserver.observe(img);

}

});

/*==========================================
        REDUCED MOTION SUPPORT
==========================================*/

if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){

document.documentElement.style.scrollBehavior="auto";

}

/*==========================================
        KEYBOARD ACCESSIBILITY
==========================================*/

document.querySelectorAll("a,button").forEach(el=>{

el.addEventListener("keyup",(e)=>{

if(e.key==="Enter"){

el.click();

}

});

});

/*==========================================
        THROTTLED SCROLL
==========================================*/

function throttle(fn,wait){

let timeout=null;

return function(){

if(!timeout){

timeout=setTimeout(()=>{

fn();

timeout=null;

},wait);

}

};

}

window.addEventListener(

"scroll",

throttle(()=>{

document.body.classList.toggle(

"scrolled",

window.scrollY>80

);

},100)

);

/*==========================================
        CURRENT YEAR
==========================================*/

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

/*==========================================
        IMAGE HOVER EFFECT
==========================================*/

document.querySelectorAll(".project-card img").forEach(img=>{

img.addEventListener("mouseenter",()=>{

img.style.filter="brightness(110%)";

});

img.addEventListener("mouseleave",()=>{

img.style.filter="brightness(100%)";

});

});

/*==========================================
        CONSOLE MESSAGE
==========================================*/

console.log("%cWelcome to Divya Keerthi's Portfolio 🚀",
"color:#38bdf8;font-size:18px;font-weight:bold;");

console.log(
"Built using HTML • CSS • JavaScript • AOS • tsParticles"
);
