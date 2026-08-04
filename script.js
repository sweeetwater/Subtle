document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Slider Logic ---
    const container = document.getElementById('wrapped-container');
    const nextButtons = document.querySelectorAll('.next-btn');
    const backButtons = document.querySelectorAll('.back-btn'); // Grab the back buttons
    let currentSlide = 0;

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentSlide++;
            container.style.transform = `translateX(-${currentSlide * 100}vw)`;
        });
    });

    // Back Button Logic
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Only go back if we aren't on the first slide
            if (currentSlide > 0) {
                currentSlide--;
                container.style.transform = `translateX(-${currentSlide * 100}vw)`;
            }
        });
    });

    // --- NEW: Entrance Animation Logic ---
    
    // Set up the observer
    const observerOptions = {
        root: null, // use the viewport
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the element enters the screen, add the visible class
                entry.target.classList.add('is-visible');
            } else {
                // Optional: Remove the class when it leaves the screen 
                // so it animates again if you decide to add a "Back" button later!
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Tell the observer to watch all elements with 'animate-on-enter'
    const animatedElements = document.querySelectorAll('.animate-on-enter, .animate-slide-in');
    animatedElements.forEach(el => observer.observe(el));
});