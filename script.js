(function () {
  'use strict'

  var RELATIONSHIP_START = new Date(2025, 4, 21, 0, 0, 0, 0)

  function padTime(value) {
    return String(value).padStart(2, '0')
  }

  function updateLiveTimer() {
    var daysEl = document.getElementById('timer-days')
    var hoursEl = document.getElementById('timer-hours')
    var minutesEl = document.getElementById('timer-minutes')
    var secondsEl = document.getElementById('timer-seconds')
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return

    var diff = Math.max(0, Date.now() - RELATIONSHIP_START.getTime())
    var totalSeconds = Math.floor(diff / 1000)
    var seconds = totalSeconds % 60
    var totalMinutes = Math.floor(totalSeconds / 60)
    var minutes = totalMinutes % 60
    var totalHours = Math.floor(totalMinutes / 60)
    var hours = totalHours % 24
    var days = Math.floor(totalHours / 24)

    daysEl.textContent = days.toLocaleString('pt-BR')
    hoursEl.textContent = padTime(hours)
    minutesEl.textContent = padTime(minutes)
    secondsEl.textContent = padTime(seconds)
  }

  function initLiveTimer() {
    updateLiveTimer()
    setInterval(updateLiveTimer, 1000)
  }

  initLiveTimer()

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return

  gsap.registerPlugin(ScrollTrigger)

  function initFloatingHearts() {
    var canvas = document.getElementById('hearts-bg')
    if (!canvas) return

    var symbols = ['\u2665', '\u2661', '\u2764']

    function spawn() {
      var el = document.createElement('div')
      el.classList.add('floating-heart')
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)]
      el.style.left = Math.random() * 100 + '%'
      var size = 10 + Math.random() * 16
      el.style.fontSize = size + 'px'
      el.style.color = 'rgba(230, 57, 86, ' + (0.08 + Math.random() * 0.14) + ')'
      canvas.appendChild(el)

      var dur = 10 + Math.random() * 12
      var drift = -30 + Math.random() * 60

      gsap.fromTo(el,
        { y: window.innerHeight + 30, opacity: 0, x: 0 },
        {
          y: -40,
          x: drift,
          opacity: 0.5,
          rotation: -20 + Math.random() * 40,
          duration: dur,
          ease: 'none',
          onComplete: function () { el.remove() },
        }
      )

      gsap.to(el, {
        opacity: 0,
        duration: 2,
        delay: dur - 2,
      })
    }

    for (var i = 0; i < 4; i++) spawn()
    setInterval(spawn, 1200)
  }

  function animateHero() {
    var tl = gsap.timeline({ delay: 0.4 })

    tl.to('.hero-pre', { opacity: 1, duration: 0.8, ease: 'power2.out' })
      .fromTo('.title-number',
        { opacity: 0, y: 60, scale: 0.6 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'back.out(1.4)' },
        '-=0.4'
      )
      .fromTo('.title-text',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo('.hero-with',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo('.hero-name',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('#hero-heart',
        { opacity: 0, scale: 0.2 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
        '-=0.5'
      )
      .to('.hero-date', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to('.scroll-indicator', { opacity: 0.8, duration: 0.6, ease: 'power2.out' }, '-=0.2')

    gsap.set('#hero-heart svg', { transformOrigin: '50% 50%' })
    gsap.to('#hero-heart svg', {
      scale: 1.12,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 2.5,
    })

    gsap.set('.hero-glow', { xPercent: -50, yPercent: -50 })
    gsap.to('.hero-glow', {
      scale: 1.15,
      opacity: 0.85,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }

  function animateIntro() {
    document.querySelectorAll('.intro-line').forEach(function (line) {
      gsap.fromTo(line,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }

  function animateHeadings() {
    gsap.utils.toArray('.section-heading').forEach(function (heading) {
      gsap.fromTo(heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }

  function animateMemories() {
    gsap.utils.toArray('.memory-card').forEach(function (card) {
      var isLeft = card.dataset.side === 'left'
      gsap.fromTo(card,
        { opacity: 0, x: isLeft ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      var dot = card.querySelector('.memory-dot')
      gsap.fromTo(dot,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }

  function animateThings() {
    var grid = document.querySelector('.things-grid')
    if (!grid) return

    gsap.fromTo('.thing-card',
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.1)',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.utils.toArray('.thing-card').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        gsap.to(card.querySelector('.thing-icon'), {
          scale: 1.2,
          duration: 0.3,
          ease: 'back.out(1.5)',
        })
      })

      card.addEventListener('mouseleave', function () {
        gsap.to(card.querySelector('.thing-icon'), {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    })
  }

  function animateCounters() {
    var grid = document.querySelector('.counter-grid')
    if (!grid) return

    var section = document.querySelector('.counter-section')
    var since = document.querySelector('.counter-since')

    if (since) {
      gsap.fromTo(since,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section || grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    gsap.fromTo('.counter-item',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }

  function animateLetter() {
    var paper = document.querySelector('.letter-paper')
    gsap.fromTo(paper,
      { opacity: 0, y: 50, rotateX: 8, transformPerspective: 900 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transformPerspective: 900,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: paper,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    var rose = document.querySelector('.letter-rose')
    gsap.fromTo(rose,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: paper,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    gsap.fromTo('.letter-para',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: paper,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }

  initFloatingHearts()
  animateHero()
  animateIntro()
  animateHeadings()
  animateMemories()
  animateThings()
  animateCounters()
  animateLetter()
  ScrollTrigger.refresh()
})()
