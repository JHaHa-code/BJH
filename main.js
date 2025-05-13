// 리소스 로드 완료 후 강제 최상단 이동 및 해시 제거
window.addEventListener('load', () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }
  window.scrollTo(0, 0);
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("📢 DOM이 완전히 로드되었습니다.");

  AOS.init({ duration: 800, once: true });

  document.body.style.scrollSnapType = "none";
  setTimeout(() => {
    document.body.style.scrollSnapType = "y mandatory";
  }, 300);

  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = (scrollTop / scrollHeight) * 100 + "%";
  });

  try {
    if (document.querySelector(".typing-text")) {
      new Typed(".typing-text", {
        strings: ["코더", "<br>프로그래머", "<br>그리고 학생", "<br>배재현입니다."],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        onStringTyped: (pos, self) => {
          if (self.strings[pos] === "<br>배재현입니다.") {
            self.stop();
            setTimeout(() => self.start(), 2000);
          }
        }
      });
    }
  } catch (e) {
    console.error("Typed.js 오류:", e);
  }

  const navToggle = document.getElementById("navToggle");
  const fullscreenNav = document.getElementById("fullscreenNav");
  const closeNav = document.getElementById("closeNav");
  const navLinks = document.querySelectorAll(".nav-link");

  navToggle?.addEventListener("click", () => {
    fullscreenNav?.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeNav?.addEventListener("click", () => {
    fullscreenNav?.classList.remove("active");
    document.body.style.overflow = "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href").substring(1);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      fullscreenNav?.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  const themeToggle = document.getElementById("themeToggle");
  const setTheme = (dark) => {
    document.body.classList.add("dark-mode-transition");
    document.body.classList.toggle("dark-mode", dark);
    themeToggle.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", dark ? "dark" : "light");
    setTimeout(() => document.body.classList.remove("dark-mode-transition"), 500);
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    setTheme(true);
  }

  themeToggle?.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark-mode"));
  });

  document.querySelector(".scroll-hint")?.addEventListener("click", () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  });

  try {
    const el = document.getElementById("visitorCount");
    if (el) {
      let count = parseInt(localStorage.getItem("visitorCount")) || 0;
      el.textContent = ++count;
      localStorage.setItem("visitorCount", count);
    }
  } catch (e) {
    console.warn("방문자 카운터 오류:", e);
  }

  const scrollBtn = document.getElementById("scrollToTop");
  window.addEventListener("scroll", () => {
    scrollBtn?.classList.toggle("active", window.scrollY > 300);
  });
  scrollBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

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
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 }
        }
      }
    });
  }

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
      `
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
      `
    },
    3: {
      title: "스미싱 역추적 프로젝트",
      technologies: ["Python", "Network Analysis", "Security"],
      description: `
        <p>스미싱 문자의 인프라를 역추적하여 악성 서버를 분석하는 프로젝트입니다.</p>
        <p><strong>주요 과정:</strong></p>
        <ul>
          <li>가상머신에서 스미싱 APK 다운로드 및 VirusTotal 분석</li>
          <li>Apktool로 디컴파일, Base64 URL 디코딩</li>
          <li>악성 C&C 서버 및 다운로드 서버 추적</li>
        </ul>
      `
    }
  };

  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("projectModalBody");
  const closeModal = document.getElementById("modalClose");

  document.querySelectorAll(".project-detail-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.projectId;
      const data = projectDetails[id];
      if (data) {
        modalBody.innerHTML = `
          <h2>${data.title}</h2>
          <div class="project-tech">${data.technologies.map(t => `<span class="tech">${t}</span>`).join("")}</div>
          ${data.description}
        `;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  closeModal?.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  });

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".snap-section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    gsap.utils.toArray("[data-parallax-layer]").forEach((layer) => {
      const depth = layer.getAttribute("data-parallax-layer") * 0.5;
      gsap.to(layer, {
        y: 100 * depth,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }

  let lastTouchY = 0;
  document.addEventListener("touchmove", (e) => {
    const touchY = e.touches[0].clientY;
    if (Math.abs(touchY - lastTouchY) < 10) {
      e.preventDefault();
    }
    lastTouchY = touchY;
  }, { passive: false });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".snap-section").forEach(section => observer.observe(section));

  if (window.innerWidth <= 768) {
    document.querySelectorAll(".snap-section").forEach(section => {
      section.style.scrollSnapAlign = "none";
    });
  }
});
