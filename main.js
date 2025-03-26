document.addEventListener('DOMContentLoaded', function() {
    console.log("📢 DOM이 완전히 로드되었습니다.");

    // AOS 초기화
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            offset: 120
        });
    }

    // 타이핑 효과
    try {
        if (document.querySelector('.typing-text')) {
            new Typed('.typing-text', {
                strings: ['코더', '프로그래머', '그리고 학생', '배재현입니다.'],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true,
                onStringTyped: (arrayPos, self) => {
                    if (self.strings[arrayPos] === '배재현입니다.') {
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

    // 기술 카드 애니메이션
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 100);
                    }
                }
            });
        }, { threshold: 0.5 });

        skillCards.forEach(card => observer.observe(card));
    }

    // GSAP 애니메이션
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

        // 섹션 진입 애니메이션 (위에서 아래로)
        gsap.utils.toArray("section").forEach(section => {
            if (section.id !== 'hero') {
                gsap.from(section, {
                    opacity: 0,
                    y: 100,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            }
        });

        // 아래에서 위로 스크롤할 때 반대 애니메이션
        ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "max",
            onUpdate: self => {
                if (self.direction === -1) { // 위로 스크롤
                    gsap.utils.toArray("section").forEach(section => {
                        if (section.id !== 'hero' && self.progress < 0.9) {
                            gsap.to(section, {
                                opacity: 0,
                                y: -100,
                                duration: 0.5,
                                ease: "power2.out"
                            });
                        }
                    });
                } else { // 아래로 스크롤
                    gsap.utils.toArray("section").forEach(section => {
                        if (section.id !== 'hero') {
                            gsap.to(section, {
                                opacity: 1,
                                y: 0,
                                duration: 1,
                                ease: "power2.out"
                            });
                        }
                    });
                }
            }
        });
    }
});