window.addEventListener('load', () => {
        // 해시가 있다면 제거
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
    // 강제로 맨 위로 이동
    window.scrollTo(0, 0);
});


document.addEventListener("DOMContentLoaded", () => {
  console.log("📢 DOM이 완전히 로드되었습니다.");

  // AOS 초기화
  AOS.init({ duration: 800, once: true });

  // 스크롤 프로그레스 바
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + "%";
  });

  // 타이핑 효과
  try {
    if (document.querySelector(".typing-text")) {
      new Typed(".typing-text", {
        strings: ["코더", "<br>프로그래머", "<br>그리고 학생", "<br>배재현입니다."],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        onStringTyped: (arrayPos, self) => {
          if (self.strings[arrayPos] === "<br>배재현입니다.") {
            self.stop();
            setTimeout(() => self.start(), 2000);
          }
        },
      });
    }
  } catch (e) {
    console.error("Typed.js 오류:", e);
  }

  // 네비게이션 토글
  const navToggle = document.getElementById("navToggle");
  const fullscreenNav = document.getElementById("fullscreenNav");
  const closeNav = document.getElementById("closeNav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && fullscreenNav) {
    navToggle.addEventListener("click", () => {
      fullscreenNav.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeNav && fullscreenNav) {
    closeNav.addEventListener("click", () => {
      fullscreenNav.classList.remove("active");
      document.body.style.overflow = ""; // overflow 복원
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
      fullscreenNav?.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // 다크 모드 토글
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const setTheme = (isDark) => {
      document.body.classList.add("dark-mode-transition");
      document.body.classList.toggle("dark-mode", isDark);
      themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", isDark ? "dark" : "light");
      setTimeout(() => document.body.classList.remove("dark-mode-transition"), 500);
    };

    const currentTheme = localStorage.getItem("theme");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
      setTheme(true);
    }

    themeToggle.addEventListener("click", () => setTheme(!document.body.classList.contains("dark-mode")));
  }

  // 스크롤 힌트 클릭 이벤트
  const scrollHint = document.querySelector(".scroll-hint");
  if (scrollHint) {
    scrollHint.addEventListener("click", () => {
      document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
    });
  }

  // 방문자 카운터
  try {
    const visitorCountEl = document.getElementById("visitorCount");
    if (visitorCountEl) {
      let count = Number.parseInt(localStorage.getItem("visitorCount")) || 0;
      visitorCountEl.textContent = ++count;
      localStorage.setItem("visitorCount", count);
    }
  } catch (e) {
    console.warn("방문자 카운터 오류:", e);
  }

  // 스크롤 업 버튼
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      scrollToTopBtn.classList.toggle("active", window.scrollY > 300);
    });
    scrollToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // 파티클 배경 효과
  if (typeof particlesJS !== "undefined") {
    particlesJS("heroParticles", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#4361ee" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#4361ee",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 },
        },
      },
    });
  }

  // 프로젝트 상세 모달
  const projectModal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const projectModalBody = document.getElementById("projectModalBody");
  const projectDetailButtons = document.querySelectorAll(".project-detail-btn");

  const projectDetails = {
    1: {
      title: "저작권 침해 확인 프로그램",
      technologies: ["Python", "PyQt5", "PyTorch"],
      description: `
        <p>이 프로젝트는 원본 문서와 저작권 침해 의심 문서 간의 유사성을 분석하여 저작권 침해 여부를 확인하는 프로그램입니다.</p>
        <p><strong>주요 기능:</strong></p>
        <ul>
          <li>PyTorch를 이용한 딥러닝 모델로 텍스트 유사성 분석</li>
          <li>PyQt5 기반의 사용자 친화적인 GUI</li>
          <li>효율적인 문서 비교 알고리즘</li>
        </ul>
        <p>프로그램은 사전 학습된 AI 모델을 활용하여 높은 정확도로 저작권 침해 여부를 판단합니다.</p>
      `,
    },
    2: {
      title: "은하 충돌 시뮬레이션",
      technologies: ["Python", "NumPy", "Matplotlib"],
      description: `
        <p>4차 Runge-Kutta 수치적분법을 활용한 Python 기반 은하 충돌 시뮬레이션입니다. 두 은하의 중심핵이 중력으로 끌어당기며, 케플러 운동을 하는 별들이 충돌 과정에서 물방울 모양으로 퍼지는 현상을 재현했습니다.</p>
        <p><strong>주요 기능:</strong></p>
        <ul>
          <li>중력 상호작용 모델링</li>
          <li>케플러 운동 기반 궤적 계산</li>
          <li>Matplotlib으로 물방울 형태의 별 분포 시각화</li>
        </ul>
      `,
    },
    3: {
      title: "스미싱 역추적 프로젝트",
      technologies: ["Python", "Network Analysis", "Security"],
      description: `
        <p>스미싱 문자의 인프라를 역추적하여 악성 서버를 분석하는 프로젝트입니다.</p>
        <p><strong>주요 과정:</strong></p>
        <ul>
          <li>가상머신에서 스미싱 APK 다운로드 및 VirusTotal 분석 (SHA-256: 5a62dd9b...)</li>
          <li>Apktool로 APK 디컴파일링, strings.xml에서 Base64 인코딩된 URL 추출</li>
          <li>Base64 디코딩으로 C&C 서버 (BT4UjzAo-108.181.95.235)와 다운로드 서버 (BT4UjzAo-108.181.97.59) 식별</li>
          <li>서버의 공통 접두어 (BT4UjzAo-)를 인증 토큰 또는 복호화 키로 추정</li>
        </ul>
        <p>이 프로젝트는 보안 분석과 네트워크 추적 기술을 활용하여 스미싱 인프라를 파악했습니다.</p>
      `,
    },
  };

  projectDetailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const projectId = button.getAttribute("data-project-id");
      console.log("Opening project:", projectId); // 디버깅 로그
      const project = projectDetails[projectId];
      if (project) {
        projectModalBody.innerHTML = `
          <h2>${project.title}</h2>
          <div class="project-tech">
            ${project.technologies.map((tech) => `<span class="tech">${tech}</span>`).join("")}
          </div>
          ${project.description}
        `;
        projectModal.classList.add("active");
        document.body.style.overflow = "hidden";
      } else {
        console.error(`Project ID ${projectId} not found`);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      projectModal.classList.remove("active");
      document.body.style.overflow = ""; // overflow 복원
    });
  }

  // GSAP 애니메이션
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.normalizeScroll(true); // 모바일 스크롤 정규화
    ScrollTrigger.config({
      ignoreMobileResize: true, // 모바일 리사이즈 이벤트 무시
    });

    // 섹션 전환 애니메이션
    gsap.utils.toArray(".snap-section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // 강화된 패럴랙스 효과
    gsap.utils.toArray("[data-parallax-layer]").forEach((layer) => {
      const depth = layer.getAttribute("data-parallax-layer") * 0.5;
      gsap.to(layer, {
        y: (100 * depth),
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // 프로젝트 및 자격증 카드 애니메이션
    gsap.utils.toArray(".project-card, .certification-card").forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
        delay: i * 0.2,
      });
    });
  }

  // 터치 이벤트 디바운싱 (모바일 스크롤 문제 해결)
  let lastTouchY = 0;
  document.addEventListener("touchmove", (e) => {
    const touchY = e.touches[0].clientY;
    if (Math.abs(touchY - lastTouchY) < 10) {
      e.preventDefault(); // 작은 움직임 무시
    }
    lastTouchY = touchY;
  }, { passive: false });

  // IntersectionObserver로 섹션 로드 최적화
  const sections = document.querySelectorAll(".snap-section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));

  // 모바일에서 스크롤 스냅 비활성화
  if (window.innerWidth <= 768) {
    document.querySelectorAll(".snap-section").forEach(section => {
      section.style.scrollSnapAlign = "none";
    });
  }
});
