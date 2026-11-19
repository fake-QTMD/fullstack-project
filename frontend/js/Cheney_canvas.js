/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 首页 Canvas 粒子背景动画
 */
(function () {
    var Cheney_canvas = document.getElementById('Cheney_canvas');
    var Cheney_context = Cheney_canvas ? Cheney_canvas.getContext('2d') : null;
    var Cheney_particles = [];
    var Cheney_width = 0;
    var Cheney_height = 0;
    var Cheney_pixelRatio = 1;
    var Cheney_frameId = null;

    function Cheney_resizeCanvas() {
        if (!Cheney_canvas) {
            return;
        }

        Cheney_pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        Cheney_width = window.innerWidth;
        Cheney_height = window.innerHeight;
        Cheney_canvas.width = Cheney_width * Cheney_pixelRatio;
        Cheney_canvas.height = Cheney_height * Cheney_pixelRatio;
        Cheney_canvas.style.width = Cheney_width + 'px';
        Cheney_canvas.style.height = Cheney_height + 'px';
        Cheney_context.setTransform(Cheney_pixelRatio, 0, 0, Cheney_pixelRatio, 0, 0);
        Cheney_createParticles();
    }

    function Cheney_createParticles() {
        var Cheney_count = Math.max(34, Math.min(78, Math.floor(Cheney_width / 20)));
        Cheney_particles = [];

        for (var Cheney_i = 0; Cheney_i < Cheney_count; Cheney_i++) {
            Cheney_particles.push({
                Cheney_x: Math.random() * Cheney_width,
                Cheney_y: Math.random() * Cheney_height,
                Cheney_vx: (Math.random() - 0.5) * 0.35,
                Cheney_vy: (Math.random() - 0.5) * 0.35,
                Cheney_radius: Math.random() * 1.8 + 0.7
            });
        }
    }

    function Cheney_drawParticles() {
        if (!Cheney_context) {
            return;
        }

        Cheney_context.clearRect(0, 0, Cheney_width, Cheney_height);

        for (var Cheney_i = 0; Cheney_i < Cheney_particles.length; Cheney_i++) {
            var Cheney_particle = Cheney_particles[Cheney_i];

            Cheney_particle.Cheney_x += Cheney_particle.Cheney_vx;
            Cheney_particle.Cheney_y += Cheney_particle.Cheney_vy;

            if (Cheney_particle.Cheney_x < 0 || Cheney_particle.Cheney_x > Cheney_width) {
                Cheney_particle.Cheney_vx *= -1;
            }
            if (Cheney_particle.Cheney_y < 0 || Cheney_particle.Cheney_y > Cheney_height) {
                Cheney_particle.Cheney_vy *= -1;
            }

            Cheney_context.beginPath();
            Cheney_context.arc(
                Cheney_particle.Cheney_x,
                Cheney_particle.Cheney_y,
                Cheney_particle.Cheney_radius,
                0,
                Math.PI * 2
            );
            Cheney_context.fillStyle = 'rgba(125, 211, 252, 0.65)';
            Cheney_context.fill();

            for (var Cheney_j = Cheney_i + 1; Cheney_j < Cheney_particles.length; Cheney_j++) {
                var Cheney_other = Cheney_particles[Cheney_j];
                var Cheney_dx = Cheney_particle.Cheney_x - Cheney_other.Cheney_x;
                var Cheney_dy = Cheney_particle.Cheney_y - Cheney_other.Cheney_y;
                var Cheney_distance = Math.sqrt(Cheney_dx * Cheney_dx + Cheney_dy * Cheney_dy);

                if (Cheney_distance < 120) {
                    Cheney_context.beginPath();
                    Cheney_context.moveTo(Cheney_particle.Cheney_x, Cheney_particle.Cheney_y);
                    Cheney_context.lineTo(Cheney_other.Cheney_x, Cheney_other.Cheney_y);
                    Cheney_context.strokeStyle = 'rgba(56, 189, 248, ' + (0.12 * (1 - Cheney_distance / 120)) + ')';
                    Cheney_context.lineWidth = 0.6;
                    Cheney_context.stroke();
                }
            }
        }

        Cheney_frameId = window.requestAnimationFrame(Cheney_drawParticles);
    }

    function Cheney_initCanvas() {
        if (!Cheney_canvas || !Cheney_context) {
            return;
        }

        Cheney_resizeCanvas();
        Cheney_drawParticles();
        window.addEventListener('resize', Cheney_resizeCanvas);
    }

    Cheney_initCanvas();
})();
