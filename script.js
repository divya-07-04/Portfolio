
// =============================
// LOADING SCREEN
// =============================

window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);

  }, 1000);
});


// =============================
// TYPING EFFECT
// =============================

const roles = [
  "Software Developer",
  "Java Developer",
  "Spring Boot Developer",
  "Full Stack Developer",
  "Problem Solver",
  "ServiceNow CSA Certified"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

  const currentRole = roles[roleIndex];

  if (!deleting) {

    typingElement.textContent =
      currentRole.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentRole.length) {

      deleting = true;

      setTimeout(typeEffect, 1500);

      return;
    }

  } else {

    typingElement.textContent =
      currentRole.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      roleIndex++;

      if (roleIndex === roles.length) {
        roleIndex = 0;
      }
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 120);
}

typeEffect();


// =============================
// DARK MODE
// =============================

const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light");

  if(document.body.classList.contains("light")) {

    localStorage.setItem("theme","light");

    themeToggle.innerHTML =
      '<i class="fas fa-sun"></i>';

  } else {

    localStorage.setItem("theme","dark");

    themeToggle.innerHTML =
      '<i class="fas fa-moon"></i>';
  }

});

if(localStorage.getItem("theme") === "light"){

  document.body.classList.add("light");

  themeToggle.innerHTML =
      '<i class="fas fa-sun"></i>';
}


// =============================
// MOBILE MENU
// =============================

const hamburger =
document.querySelector(".hamburger");

const navLinks =
document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});


// =============================
// SCROLL TO TOP
// =============================

const scrollBtn =
document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

  if(window.scrollY > 300){

    scrollBtn.style.display = "block";

  }else{

    scrollBtn.style.display = "none";
  }

});

scrollBtn.addEventListener("click", () => {

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

});


// =============================
// GITHUB API
// =============================

fetch(
"https://api.github.com/users/divya-07-04/repos?sort=updated"
)

.then(response => response.json())

.then(data => {

  const repoList =
  document.getElementById("repo-list");

  repoList.innerHTML = "";

  data.slice(0,6).forEach(repo => {

    const li =
    document.createElement("li");

    li.innerHTML = `
      <a href="${repo.html_url}"
         target="_blank">
         ${repo.name}
      </a>
    `;

    repoList.appendChild(li);

  });

})

.catch(error => {

  console.log(error);

  document.getElementById("repo-list").innerHTML =
  "<li>Unable to load repositories</li>";

});


// =============================
// CONTACT FORM
// =============================

const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener("submit",(e)=>{

  e.preventDefault();

  alert(
    "Thank you for contacting me! I will get back to you soon."
  );

  contactForm.reset();

});


// =============================
// AOS ANIMATION
// =============================

AOS.init({

  duration:1000,
  once:true

});


// =============================
// PARTICLE BACKGROUND
// =============================

tsParticles.load("particles-js", {

  background:{
    color:{
      value:"transparent"
    }
  },

  particles:{

    number:{
      value:80
    },

    color:{
      value:"#38bdf8"
    },

    links:{
      enable:true,
      distance:150,
      color:"#38bdf8",
      opacity:0.4
    },

    move:{
      enable:true,
      speed:2
    },

    size:{
      value:3
    },

    opacity:{
      value:0.6
    }

  }

});


// =============================
// ACTIVE NAV LINK
// =============================

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
    section.offsetTop;

    if(scrollY >= sectionTop - 150){

      current =
      section.getAttribute("id");
    }

  });

  navItems.forEach(link => {

    link.classList.remove("active");

    if(
      link.getAttribute("href") ===
      `#${current}`
    ){

      link.classList.add("active");
    }

  });

});


// =============================
// SMOOTH SCROLL
// =============================

document
.querySelectorAll('a[href^="#"]')

.forEach(anchor => {

  anchor.addEventListener("click",

  function(e){

    e.preventDefault();

    document.querySelector(
      this.getAttribute("href")
    ).scrollIntoView({

      behavior:"smooth"

    });

  });

});


// =============================
// PROFILE IMAGE ANIMATION
// =============================

const profile =
document.querySelector(".profile-pic");

if(profile){

  profile.addEventListener("mouseenter",()=>{

    profile.style.transform =
    "scale(1.08)";

  });

  profile.addEventListener("mouseleave",()=>{

    profile.style.transform =
    "scale(1)";
  });

}
