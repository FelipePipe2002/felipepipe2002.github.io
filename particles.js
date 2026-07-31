// ============================================
// PARTICLE ANIMATION CONFIGURATION
// ============================================

const PARTICLE_CONFIG = {
    // Desktop configuration
    desktop: {
        particleCount: 70,
        connectionDistance: 120
    },

    // Mobile configuration (automatically used on screens <= 768px)
    mobile: {
        particleCount: 24,
        connectionDistance: 80
    },

    // Particle speed (pixels per frame)
    speed: 0.35,

    // Cap the background animation to reduce CPU/GPU work
    fps: 30,

    // Particle size
    particleRadius: 2,

    // Colors (orange theme)
    particleColor: 'rgba(255, 140, 66, 0.6)',
    lineColor: 'rgba(255, 140, 66, 0.2)',

    // Helper function to get current config based on screen size
    getCurrent() {
        const isMobile = window.innerWidth <= 768;
        return isMobile ? this.mobile : this.desktop;
    }
};

// ============================================
// PARTICLE ANIMATION CLASS
// ============================================

class ParticleAnimation {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationFrame = null;
        this.lastFrameTime = 0;
        this.frameInterval = 1000 / PARTICLE_CONFIG.fps;
        this.resizeTimeout = null;

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
                this.createParticles();
            }, 150);
        });

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && !this.animationFrame) {
                this.animate();
            }
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];

        // Automatically adjusts particle count based on screen size
        const config = PARTICLE_CONFIG.getCurrent();

        for (let i = 0; i < config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                // Random direction (angle in radians)
                angle: Math.random() * Math.PI * 2,
                // Speed variation (50% to 100% of base speed)
                speed: PARTICLE_CONFIG.speed * (0.5 + Math.random() * 0.5)
            });
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Move particle in its direction
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;

            // Wrap around edges (seamless loop)
            // When a particle exits one side, it reappears on the opposite side
            if (particle.x < 0) {
                particle.x = this.canvas.width;
            } else if (particle.x > this.canvas.width) {
                particle.x = 0;
            }

            if (particle.y < 0) {
                particle.y = this.canvas.height;
            } else if (particle.y > this.canvas.height) {
                particle.y = 0;
            }
        });
    }

    drawParticles() {
        this.ctx.fillStyle = PARTICLE_CONFIG.particleColor;

        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(
                particle.x,
                particle.y,
                PARTICLE_CONFIG.particleRadius,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        });
    }

    drawConnections() {
        const config = PARTICLE_CONFIG.getCurrent();
        const maxDistance = config.connectionDistance;

        this.ctx.strokeStyle = PARTICLE_CONFIG.lineColor;
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distanceSquared = dx * dx + dy * dy;
                const maxDistanceSquared = maxDistance * maxDistance;

                if (distanceSquared < maxDistanceSquared) {
                    const distance = Math.sqrt(distanceSquared);
                    // Calculate opacity based on distance (closer = more opaque)
                    const opacity = 1 - (distance / maxDistance);
                    this.ctx.strokeStyle = `rgba(255, 140, 66, ${opacity * 0.2})`;

                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate(timestamp = 0) {
        if (document.hidden) {
            this.animationFrame = null;
            return;
        }

        if (timestamp - this.lastFrameTime < this.frameInterval) {
            this.animationFrame = requestAnimationFrame((time) => this.animate(time));
            return;
        }

        this.lastFrameTime = timestamp;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();

        // Continue animation
        this.animationFrame = requestAnimationFrame((time) => this.animate(time));
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Initialize particle animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleAnimation();
});
