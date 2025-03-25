// 문서 로드 후 실행되는 초기화 함수
document.addEventListener('DOMContentLoaded', function() {
    // AOS 초기화 (애니메이션 라이브러리)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false
    });

    // 타이핑 효과 설정
    if (document.querySelector('.typing-text')) {
        const typed = new Typed('.typing-text', {
            strings: ['배재현', '개발자', '프로그래머', '풀스택 엔지니어'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            onStringTyped: (arrayPos, self) => {
                if (self.strings[arrayPos] === '배재현') {
                    self.stop();
                    setTimeout(() => self.start(), 2000);
                }
            }
        });
    }

    // Lottie 애니메이션 로드 (선택적)
    const animationContainer = document.getElementById('lottie-animation');
    if (animationContainer) {
        try {
            lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://assets5.lottiefiles.com/packages/lf20_iv4dsqx3.json'
            });
        } catch (error) {
            console.error('Lottie 애니메이션 로드 실패:', error);
        }
    }

    // 풀스크린 네비게이션 토글
    const navToggle = document.getElementById('navToggle');
    const fullscreenNav = document.getElementById('fullscreenNav');
    const closeNav = document.getElementById('closeNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && fullscreenNav && closeNav) {
        navToggle.addEventListener('click', () => {
            fullscreenNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeNav.addEventListener('click', () => {
            fullscreenNav.classList.remove('active');
            document.body.style.overflow = '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                fullscreenNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 다크 모드 토글
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        const setTheme = (isDark) => {
            document.body.classList.toggle('dark-mode', isDark);
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };

        if (localStorage.getItem('theme') === 'dark' || (prefersDarkScheme.matches && !localStorage.getItem('theme'))) {
            setTheme(true);
        }

        themeToggle.addEventListener('click', () => {
            setTheme(!document.body.classList.contains('dark-mode'));
        });
    }

    // 방문자 카운터
    const visitorCount = document.getElementById('visitorCount');
    if (visitorCount) {
        let count = parseInt(localStorage.getItem('visitorCount')) || 0;
        visitorCount.textContent = ++count;
        localStorage.setItem('visitorCount', count);
    }

    // 연락처 복사 기능
    const copyToClipboard = (text, message) => {
        navigator.clipboard.writeText(text)
            .then(() => alert(message))
            .catch(err => console.error('복사 실패:', err));
    };

    const phoneLink = document.getElementById('phoneLink');
    const emailLink = document.getElementById('emailLink');

    if (phoneLink) {
        phoneLink.addEventListener('click', () => {
            copyToClipboard('010-8430-0753', '전화번호가 복사되었습니다: 010-8430-0753');
        });
    }

    if (emailLink) {
        emailLink.addEventListener('click', () => {
            copyToClipboard('bjhcoding@naver.com', '이메일이 복사되었습니다: bjhcoding@naver.com');
        });
    }

    // 폼 제출 처리
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            console.log('폼 데이터:', Object.fromEntries(formData));
            alert('메시지가 성공적으로 전송되었습니다! (데모)');
            this.reset();
        });
    }

    // 스크롤 업 버튼
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.classList.toggle('active', window.scrollY > 300);
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // GSAP 애니메이션 (선택적)
    if (window.gsap && gsap.registerPlugin) {
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

        // 파라랙스 효과
        gsap.to(".parallax-bg", {
            y: 100,
            ease: "none",
            scrollTrigger: {
                scrub: true,
                start: "top bottom",
                end: "bottom top"
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
                    start: "top 80%"
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