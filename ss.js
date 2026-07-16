const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        navItems.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 18, 22, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid #1c2630';
        navbar.style.padding = '15px 5%';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = 'none';
        navbar.style.padding = '30px 5%';
    }
});

const words = ["Computer Science Student", "Web Developer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 150;
const erasingDelay = 100;
const newWordDelay = 1500;
const typingSpan = document.getElementById("typing");

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, newWordDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (typingSpan) setTimeout(type, newWordDelay);
});

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(button => button.classList.remove("active"));
        btn.classList.add("active");
        
        const filterValue = btn.getAttribute("data-filter");
        
        projectCards.forEach(card => {
            const category = card.getAttribute("data-category");
            if (filterValue === "all" || category === filterValue) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }
        });
    });
});

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < triggerBottom) {
            reveal.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        const centerX = cardRect.left + cardWidth / 2;
        const centerY = cardRect.top + cardHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (+15 * mouseY / (cardHeight / 2)).toFixed(2);
        const rotateY = (-15 * mouseX / (cardWidth / 2)).toFixed(2);
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    });
    
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
});