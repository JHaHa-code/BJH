document.addEventListener("DOMContentLoaded", () => {
  console.log("📢 DOM이 완전히 로드되었습니다.")

  // 스크롤 프로그레스 바
  const scrollProgress = document.getElementById("scrollProgress")
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPercentage = (scrollTop / scrollHeight) * 100
    scrollProgress.style.width = scrollPercentage + "%"
  })

  // 타이핑 효과
  try {
    if (document.querySelector(".typing-text")) {
      const Typed = window.Typed // Typed.js가 window 객체에 있다고 가정
      new Typed(".typing-text", {
        strings: ["코더", "<br>프로그래머", "<br>그리고 학생", "<br>배재현입니다."],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        onStringTyped: (arrayPos, self) => {
          if (self.strings[arrayPos] === "<br>배재현입니다.") {
            self.stop()
            setTimeout(() => self.start(), 2000)
          }
        },
      })
    }
  } catch (e) {
    console.error("Typed.js 오류:", e)
  }

  // 네비게이션 토글
  const navToggle = document.getElementById("navToggle")
  const fullscreenNav = document.getElementById("fullscreenNav")
  const closeNav = document.getElementById("closeNav")
  const navLinks = document.querySelectorAll(".nav-link")

  if (navToggle && fullscreenNav) {
    navToggle.addEventListener("click", () => {
      fullscreenNav.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeNav && fullscreenNav) {
    closeNav.addEventListener("click", () => {
      fullscreenNav.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      fullscreenNav?.classList.remove("active")
      document.body.style.overflow = ""
    })
  })

  // 다크 모드 토글
  const themeToggle = document.getElementById("themeToggle")
  if (themeToggle) {
    const setTheme = (isDark) => {
      document.body.classList.toggle("dark-mode", isDark)
      themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'
      localStorage.setItem("theme", isDark ? "dark" : "light")
    }

    const currentTheme = localStorage.getItem("theme")
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
    if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
      setTheme(true)
    }

    themeToggle.addEventListener("click", () => setTheme(!document.body.classList.contains("dark-mode")))
  }

  // 스크롤 힌트 클릭 이벤트
  const scrollHint = document.querySelector(".scroll-hint")
  if (scrollHint) {
    scrollHint.addEventListener("click", () => {
      document.querySelector("#about").scrollIntoView({
        behavior: "smooth",
      })
    })
  }

  // 방문자 카운터
  try {
    const visitorCountEl = document.getElementById("visitorCount")
    if (visitorCountEl) {
      let count = Number.parseInt(localStorage.getItem("visitorCount")) || 0
      visitorCountEl.textContent = ++count
      localStorage.setItem("visitorCount", count)
    }
  } catch (e) {
    console.warn("방문자 카운터 오류:", e)
  }

  // 스크롤 업 버튼
  const scrollToTopBtn = document.getElementById("scrollToTop")
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      scrollToTopBtn.classList.toggle("active", window.scrollY > 300)
    })
    scrollToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }))
  }

  // 파티클 배경 효과
  if (typeof particlesJS !== "undefined") {
    const particlesJS = window.particlesJS // particlesJS가 window 객체에 있다고 가정
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
    })
  }

  // GSAP 애니메이션 (패럴랙스 효과)
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    const gsap = window.gsap // gsap가 window 객체에 있다고 가정
    const ScrollTrigger = window.ScrollTrigger // ScrollTrigger가 window 객체에 있다고 가정
    gsap.registerPlugin(ScrollTrigger)

    // 헤더 배경색 변경
    gsap.to("header", {
      backgroundColor: "var(--nav-bg)",
      scrollTrigger: {
        trigger: "#hero",
        start: "bottom top",
        toggleActions: "play none none reverse",
      },
    })

    // 패럴랙스 배경 효과
    gsap.to(".parallax-bg", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    // 패럴랙스 요소들
    const parallaxElements = document.querySelectorAll('[data-parallax="true"]')
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-parallax-speed") || 0.1
      gsap.to(element, {
        y: 100 * Number.parseFloat(speed),
        ease: "none",
        scrollTrigger: {
          trigger: element.closest("section"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    // 프로젝트 카드 애니메이션
    gsap.utils.toArray(".project-card").forEach((card, i) => {
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
      })
    })
  }

  // 3D 모델링 (Three.js)
  initThreeJS()
})

// Three.js 초기화 함수
function initThreeJS() {
  const container = document.getElementById("threeContainer")
  if (!container || typeof THREE === "undefined") return

  const THREE = window.THREE // THREE가 window 객체에 있다고 가정

  // 씬, 카메라, 렌더러 설정
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf8f9fa)

  // 다크 모드 감지 및 배경색 설정
  if (document.body.classList.contains("dark-mode")) {
    scene.background = new THREE.Color(0x121212)
  }

  // 다크 모드 변경 감지
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        const isDarkMode = document.body.classList.contains("dark-mode")
        scene.background = new THREE.Color(isDarkMode ? 0x121212 : 0xf8f9fa)
      }
    })
  })
  observer.observe(document.body, { attributes: true })

  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)

  // 반응형 처리
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  })

  // 조명 추가
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  // 3D 텍스트 생성
  const fontLoader = new THREE.FontLoader()

  // 기본 지오메트리 생성 (폰트 로딩 중 표시)
  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
  const material = new THREE.MeshPhongMaterial({
    color: 0x4361ee,
    shininess: 100,
    flatShading: true,
  })
  const torusKnot = new THREE.Mesh(geometry, material)
  scene.add(torusKnot)

  // 컨트롤 추가
  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 0.5

  // 애니메이션 루프
  function animate() {
    requestAnimationFrame(animate)

    torusKnot.rotation.x += 0.01
    torusKnot.rotation.y += 0.01

    controls.update()
    renderer.render(scene, camera)
  }

  animate()

  // 마우스 인터랙션 - 마우스 위치에 따라 카메라 약간 회전
  container.addEventListener("mousemove", (event) => {
    const rect = container.getBoundingClientRect()
    const mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1
    const mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1

    gsap.to(torusKnot.rotation, {
      x: mouseY * 0.3,
      y: mouseX * 0.3,
      duration: 1,
    })
  })
}

