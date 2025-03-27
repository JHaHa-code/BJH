document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500); // 0.5초 후 완전히 숨김
    }, 2000); // 2초 동안 유지
});
    // 타이핑 효과
    try {
        if (document.querySelector('.typing-text')) {
            new Typed('.typing-text', {
                strings: ['코더', '<br>프로그래머', '<br>그리고 학생', '<br>배재현입니다.'],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true,
                onStringTyped: (arrayPos, self) => {
                    if (self.strings[arrayPos] === '<br>배재현입니다.') {
                        self.stop();
                        setTimeout(() => self.start(), 2000);
                    }
                }
            });
        }
    } catch (e) {
        console.error("Typed.js 오류:", e);
    }

    // 네비게이션 토글
    const navToggle = document.getElementById('navToggle');
    const fullscreenNav = document.getElementById('fullscreenNav');
    const closeNav = document.getElementById('closeNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && fullscreenNav) {
        navToggle.addEventListener('click', () => {
            fullscreenNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeNav && fullscreenNav) {
        closeNav.addEventListener('click', () => {
            fullscreenNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            fullscreenNav?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 다크 모드 토글
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const setTheme = (isDark) => {
            document.body.classList.toggle('dark-mode', isDark);
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };

        const currentTheme = localStorage.getItem('theme');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            setTheme(true);
        }

        themeToggle.addEventListener('click', () => 
            setTheme(!document.body.classList.contains('dark-mode')));
    }

    // 스크롤 힌트 클릭 이벤트
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    // 방문자 카운터
    try {
        const visitorCountEl = document.getElementById('visitorCount');
        if (visitorCountEl) {
            let count = parseInt(localStorage.getItem('visitorCount')) || 0;
            visitorCountEl.textContent = ++count;
            localStorage.setItem('visitorCount', count);
        }
    } catch (e) {
        console.warn("방문자 카운터 오류:", e);
    }

    // 스크롤 업 버튼
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.classList.toggle('active', window.scrollY > 300);
        });
        scrollToTopBtn.addEventListener('click', () => 
            window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // GSAP 애니메이션 (패럴랙스 효과만 유지)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 헤더 배경색 변경
        gsap.to("header", {
            backgroundColor: "var(--nav-bg)",
            scrollTrigger: {
                trigger: "#hero",
                start: "bottom top",
                toggleActions: "play none none reverse"
            }
        });

        // 패럴랙스 배경 효과
        gsap.to(".parallax-bg", {
            y: 100,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
});
