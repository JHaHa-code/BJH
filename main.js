document.addEventListener('DOMContentLoaded', function() {
    // AOS 초기화 (스크롤 애니메이션)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            offset: 120
        });
    } else {
        console.log('AOS 라이브러리가 로드되지 않았습니다.');
        // AOS 대체 애니메이션
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'none';
        });
    }

    // 타이핑 효과 초기화
    try {
        const typed = new Typed('.typing-text', {
            strings: ['배재현', '개발자', '프로그래머', '풀스택 엔지니어'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            onStringTyped: (arrayPos, self) => {
                if (self.strings[arrayPos] === '배재현') {
                    self.stop();
                    setTimeout(() => {
                        self.start();
                    }, 2000);
                }
            }
        });
    } catch (e) {
        console.error('Typed.js 오류:', e);
        document.querySelector('.typing-text').textContent = '배재현';
    }

    // 풀스크린 네비게이션 토글
    const navToggle = document.getElementById('navToggle');
    const fullscreenNav = document.getElementById('fullscreenNav');
    const closeNav = document.getElementById('closeNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && fullscreenNav) {
        navToggle.addEventListener('click', function() {
            fullscreenNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeNav && fullscreenNav) {
        closeNav.addEventListener('click', function() {
            fullscreenNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (fullscreenNav) {
                fullscreenNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // 다크 모드 토글
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        const setTheme = (isDark) => {
            document.body.classList.toggle('dark-mode', isDark);
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            try {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            } catch (e) {
                console.log('localStorage 접근 오류:', e);
            }
        };

        // 초기 테마 설정
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark' || (prefersDarkScheme.matches && !currentTheme)) {
            setTheme(true);
        }

        themeToggle.addEventListener('click', function() {
            setTheme(!document.body.classList.contains('dark-mode'));
        });
    }

    // 방문자 카운터
    try {
        const visitorCountEl = document.getElementById('visitorCount');
        if (visitorCountEl) {
            let count = parseInt(localStorage.getItem('visitorCount')) || 0;
            count++;
            visitorCountEl.textContent = count;
            localStorage.setItem('visitorCount', count);
        }
    } catch (e) {
        console.log('방문자 카운터 오류:', e);
        const visitorCountEl = document.getElementById('visitorCount');
        if (visitorCountEl) visitorCountEl.textContent = '100+';
    }

    // 연락처 복사 기능
    function copyToClipboard(text, message) {
            navigator.clipboard.writeText(text).then(() => {
                alert(message);
            }).catch(err => {
                console.error('복사 실패:', err);
            });
        }

        document.getElementById("phoneLink").addEventListener("click", function() {
            copyToClipboard("010-8430-0753", "전화번호가 복사되었습니다.");
        });

        document.getElementById("emailLink").addEventListener("click", function() {
            copyToClipboard("bjhcoding@naver.com", "이메일이 복사되었습니다.");
        });

    // 폼 제출 처리
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());
            console.log('폼 데이터:', formObject);
            
            alert('메시지가 성공적으로 전송되었습니다! (데모)');
            this.reset();
        });
    }

    // 스크롤 업 버튼
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            scrollToTopBtn.classList.toggle('active', window.scrollY > 300);
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // GSAP 애니메이션 (선택적)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 헤더 스크롤 효과
        gsap.to("header", {
            backgroundColor: "var(--nav-bg)",
            backdropFilter: "blur(10px)",
            scrollTrigger: {
                trigger: "#hero",
                start: "bottom top",
                toggleActions: "play none none reverse"
            }
        });

        // 파라랙스 효과 (기존 배경 애니메이션)
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

        // 섹션 등장 애니메이션
        gsap.utils.toArray("section").forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
    }

    // 섹션 간격 조정
    const aboutSection = document.querySelector('#about');
    const experienceSection = document.querySelector('#experience');
    
    if (aboutSection) aboutSection.style.margin = '50px auto';
    if (experienceSection) experienceSection.style.margin = '50px auto';
});
