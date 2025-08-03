document.addEventListener('DOMContentLoaded', () => {
    // --- Canvas Particle Animation ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particlesArray;

        class Particle {
            constructor(x, y, directionX, directionY, size) {
                this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                const bodyId = document.body.id;
                let particleColor = 'rgba(0, 170, 255, 0.5)'; // default blue
                if (bodyId === 'about-page') particleColor = 'rgba(0, 255, 195, 0.5)';
                if (bodyId === 'portfolio-page') particleColor = 'rgba(159, 112, 253, 0.5)';
                if (bodyId === 'achievements-page') particleColor = 'rgba(255, 201, 77, 0.5)';
                if (bodyId === 'contact-page') particleColor = 'rgba(255, 127, 80, 0.5)';
                ctx.fillStyle = particleColor;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX; this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * (innerWidth - size * 2)) + size * 2;
                let y = (Math.random() * (innerHeight - size * 2)) + size * 2;
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
            connect();
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        const bodyId = document.body.id;
                        let lineColor = `rgba(0, 170, 255, ${opacityValue})`; // default blue
                        if (bodyId === 'about-page') lineColor = `rgba(0, 255, 195, ${opacityValue})`;
                        if (bodyId === 'portfolio-page') lineColor = `rgba(159, 112, 253, ${opacityValue})`;
                        if (bodyId === 'achievements-page') lineColor = `rgba(255, 201, 77, ${opacityValue})`;
                        if (bodyId === 'contact-page') lineColor = `rgba(255, 127, 80, ${opacityValue})`;
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; init(); });
        init();
        animate();
    }

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // --- Animate on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // NOTE: The contact form javascript has been removed from here.
    // Formspree handles the submission automatically.
});
