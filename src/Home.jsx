import { useState, useRef, useEffect, useCallback } from 'react';
import profileImg from './assets/progile_image.jpeg';
import facewashVid from './assets/Facewash.MOV';
import lipstickVid from './assets/Lipstick.MOV';
import bbcreamVid from './assets/Bbcreame.MOV';

function Home() {
  // Theme state: default is light, cached in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hiba-theme') || 'light';
  });

  // "soundOn" tracks which video the user clicked to hear with sound
  const [soundOn, setSoundOn] = useState(null); // null | 'facewash' | 'lipstick' | 'bbcream'

  // Contact form state
  const [formData, setFormData] = useState({ name: '', brand: '', email: '', package: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, brand, email, package: pkg, message } = formData;
    const subject = encodeURIComponent(`UGC Collaboration Inquiry${pkg ? ' — ' + pkg : ''}`);
    const body = encodeURIComponent(
      `Hi Hiba,\n\nI came across your UGC portfolio and would love to collaborate.\n\nName: ${name}\nBrand: ${brand}\nEmail: ${email}\nPackage Interest: ${pkg || 'Open to discuss'}\n\nMessage:\n${message}\n\nLooking forward to hearing from you!`
    );
    window.open(`mailto:hello.hibaugc@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // Refs for HTML5 video elements
  const facewashRef = useRef(null);
  const lipstickRef = useRef(null);
  const bbcreamRef = useRef(null);

  const videoRefs = useRef({ facewash: facewashRef, lipstick: lipstickRef, bbcream: bbcreamRef });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hiba-theme', theme);
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // ─── SCROLL-BASED AUTO-PLAY (muted) via IntersectionObserver ────────────────
  useEffect(() => {
    const refs = videoRefs.current;
    const observers = [];

    Object.entries(refs).forEach(([key, ref]) => {
      if (!ref.current) return;

      const video = ref.current;
      // Pre-configure for smooth gapless playback
      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Auto-play muted when scrolled into view
              video.muted = true;
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  // Autoplay blocked — keep muted and retry silently
                });
              }
            } else {
              // Pause and mute when out of view
              video.pause();
              video.muted = true;
              // If this was the sound-on video, clear it
              setSoundOn((prev) => (prev === key ? null : prev));
            }
          });
        },
        { threshold: 0.4 } // play when 40% of the video is visible
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // ─── CLICK HANDLER: toggle sound on clicked video, mute all others ──────────
  const handleVideoClick = useCallback((videoKey, ref) => {
    const refs = videoRefs.current;

    setSoundOn((prev) => {
      const turningOn = prev !== videoKey;

      Object.entries(refs).forEach(([key, r]) => {
        if (!r.current) return;
        if (key === videoKey) {
          r.current.muted = !turningOn; // unmute if turning on sound
          // Ensure it's playing
          if (r.current.paused) {
            r.current.play().catch(() => {});
          }
        } else {
          r.current.muted = true; // always mute others
        }
      });

      return turningOn ? videoKey : null;
    });
  }, []);

  // Direct Social Links
  const whatsappUrl = "https://wa.me/919497335901?text=Hi%20Hiba%2C%20I%20saw%20your%20UGC%20portfolio%20and%20would%20love%20to%20collaborate!";
  const instagramUrl = "https://www.instagram.com/glowb.yfabi?igsh=dXExYjBzOHl0Y3Ny&utm_source=qr";

  return (
    <>
      {/* HEADER / NAVIGATION */}
      <header className="header">
        <div className="container nav-container">
          <a href="#home" className="logo-link">HIBA</a>
          
          <nav className="nav-menu">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#services" className="nav-link">Content Styles</a>
            <a href="#connect" className="nav-link">Connect</a>
          </nav>

          <div className="controls-group">
            {/* Theme Switcher */}
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              aria-label="Toggle Light/Dark Theme"
              type="button"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              )}
            </button>

            {/* Main Action Links */}
            <a href="#connect" className="btn btn-solid" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Work With Me
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="section" style={{ paddingBottom: '80px' }}>
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-tags">
              <span className="badge badge-sage">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Skincare UGC
              </span>
              <span className="badge badge-rose">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Beauty & Swatches
              </span>
              <span className="badge badge-gold">
                ✨ Faceless UGC Specialist
              </span>
            </div>
            
            <h1 className="hero-title">
              Premium, Faceless UGC for <span>Skincare & Beauty</span> Brands
            </h1>
            
            <p className="hero-desc">
              Hi, I'm Hiba! I specialize in **high-converting, aesthetic, and faceless UGC** that puts your product's texture and benefits at the center of the frame. Let's collaborate to build stunning visual proof that drives conversions.
            </p>
            
            <div className="hero-cta">
              <a href="#connect" className="btn btn-solid">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
                Get a Custom Quote
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Let's Collaborate
              </a>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img 
                src={profileImg} 
                className="hero-image" 
                alt="Hiba - Skincare & Beauty UGC Creator" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="section">
        <div className="container about-grid">
          <div className="about-header">
            <span className="badge badge-gold">My Philosophy</span>
            <h2>Aesthetic-First Visuals</h2>
          </div>
          
          <div className="about-bio">
            <p>
              As a dedicated **faceless UGC creator**, I focus entirely on highlighting the sensory details of your products—capturing the perfect texture, smooth application, and satisfying lather that makes viewers stop scrolling.
            </p>
            <p>
              By keeping content faceless and focusing on aesthetic, close-up product interactions, I ensure your product remains the hero. This approach is proven to build high trust and drive conversions for premium beauty and skincare formulations in India's fast-growing D2C space.
            </p>

            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-num">Aesthetic</span>
                <span className="stat-label">Visual Focus</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">Faceless</span>
                <span className="stat-label">Product is Hero</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">High</span>
                <span className="stat-label">Engagement Rates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MY PORTFOLIO / VIDEOS SECTION */}
      <section id="portfolio" className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">UGC Clips</span>
            <h2>My Work in Action</h2>
            <p>
              Check out my skincare and beauty video examples below. Tap to play the footage and hear the ASMR.
            </p>
          </div>

          <div className="portfolio-grid">
            {/* VIDEO 1: FACEWASH */}
            <div className="portfolio-card">
              <div className="video-container" onClick={() => handleVideoClick('facewash', facewashRef)}>
                <video 
                  ref={facewashRef}
                  src={facewashVid}
                  className="portfolio-video"
                  playsInline
                  muted
                  loop
                  preload="auto"
                />
                <div className={`video-overlay ${soundOn === 'facewash' ? 'playing' : ''}`}>
                  <span className="video-tag">Skincare Demo</span>
                  <div className="play-btn-circle" title={soundOn === 'facewash' ? 'Mute' : 'Tap for sound'}>
                    {soundOn === 'facewash' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <line x1="23" y1="9" x2="17" y2="15"/>
                        <line x1="17" y1="9" x2="23" y2="15"/>
                      </svg>
                    )}
                  </div>
                  <div style={{ height: '20px' }}></div>
                </div>
              </div>
              
              <div className="video-card-meta">
                <h3 className="video-title">Hydrating Cleanser Aesthetic Demo</h3>
                <p className="video-desc">
                  Featuring textures, gentle cleansing foam, and clear application. Structured to engage skin-conscious viewers.
                </p>
              </div>
            </div>

            {/* VIDEO 2: LIPSTICK */}
            <div className="portfolio-card">
              <div className="video-container" onClick={() => handleVideoClick('lipstick', lipstickRef)}>
                <video 
                  ref={lipstickRef}
                  src={lipstickVid}
                  className="portfolio-video"
                  playsInline
                  muted
                  loop
                  preload="auto"
                />
                <div className={`video-overlay ${soundOn === 'lipstick' ? 'playing' : ''}`}>
                  <span className="video-tag">Beauty Swatch</span>
                  <div className="play-btn-circle" title={soundOn === 'lipstick' ? 'Mute' : 'Tap for sound'}>
                    {soundOn === 'lipstick' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <line x1="23" y1="9" x2="17" y2="15"/>
                        <line x1="17" y1="9" x2="23" y2="15"/>
                      </svg>
                    )}
                  </div>
                  <div style={{ height: '20px' }}></div>
                </div>
              </div>
              
              <div className="video-card-meta">
                <h3 className="video-title">Lipstick Swatch & Color Richness</h3>
                <p className="video-desc">
                  Focused on pigment rendering, smooth lipstick application, and beautiful natural lighting.
                </p>
              </div>
            </div>

            {/* VIDEO 3: BB CREAM */}
            <div className="portfolio-card">
              <div className="video-container" onClick={() => handleVideoClick('bbcream', bbcreamRef)}>
                <video 
                  ref={bbcreamRef}
                  src={bbcreamVid}
                  className="portfolio-video"
                  playsInline
                  muted
                  loop
                  preload="auto"
                />
                <div className={`video-overlay ${soundOn === 'bbcream' ? 'playing' : ''}`}>
                  <span className="video-tag">Texture Showcase</span>
                  <div className="play-btn-circle" title={soundOn === 'bbcream' ? 'Mute' : 'Tap for sound'}>
                    {soundOn === 'bbcream' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <line x1="23" y1="9" x2="17" y2="15"/>
                        <line x1="17" y1="9" x2="23" y2="15"/>
                      </svg>
                    )}
                  </div>
                  <div style={{ height: '20px' }}></div>
                </div>
              </div>
              
              <div className="video-card-meta">
                <h3 className="video-title">Premium BB Cream Application</h3>
                <p className="video-desc">
                  Highlighting the smooth formulation, easy blending, skin hydration benefits, and a glowing, natural finish.
                </p>
              </div>
            </div>

            {/* CTA PORTFOLIO CARD (Brand Collaboration) */}
            <a href="#connect" className="portfolio-card cta-portfolio-card">
              <div className="cta-portfolio-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </div>
              <h3>Collaborate with Me</h3>
              <p>
                Let's discuss how we can create high-quality, aesthetic content tailored for your brand's skincare or cosmetic products.
              </p>
              <span className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                Get a Custom Quote
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* CONTENT STYLES / CAPABILITIES SECTION */}
      <section id="services" className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Content Types</span>
            <h2>What I Can Create for You</h2>
            <p>
              I create a variety of visual concepts designed to capture brand value and highlight skincare formulations.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h3>Aesthetic Product Showcases & ASMR</h3>
              <p>Sensory-driven videos focusing on unboxings, packaging details, and crisp natural audio/triggers that build visual trust.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
                </svg>
              </div>
              <h3>Voiceover & Trend-Based Reels</h3>
              <p>Engaging storytelling combined with trending sound formats, clean narrations, and aesthetic overlays optimized for reels.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"/>
                </svg>
              </div>
              <h3>Texture & Application Demos</h3>
              <p>Ultra close-up product macro shots highlighting lather, serum drops, absorption, and smooth makeup color swatches.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3>High-Converting Meta Ad Creative</h3>
              <p>Performance-driven visual assets structured with scroll-stopping hooks, key benefits, and strong conversion-focused CTAs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STARTER PACKAGES SECTION */}
      <section id="packages" className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-rose">Starter Packages</span>
            <h2>Ready-Made Bundles for D2C Brands</h2>
            <p>
              Simple, transparent packages designed to make working together effortless. All packages are fully customisable — <a href="#connect" style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}>reach out for a custom quote</a>.
            </p>
          </div>

          <div className="pricing-grid">
            {/* STARTER BUNDLE */}
            <div className="pricing-card">
              <h3 className="pricing-title">Starter Reel</h3>
              <div className="pricing-price">
                <span className="price-inr">1 Video</span>
                <span className="price-usd">Aesthetic Showcase</span>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  9:16 vertical format, phone-ready
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ASMR texture &amp; close-up shots
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  1 revision round included
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Full usage rights for ads &amp; social
                </li>
              </ul>
              <a href="#connect" onClick={() => setFormData(p => ({...p, package: 'Starter Reel — 1 Video'}))} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Inquire Now</a>
            </div>

            {/* CONVERSION BUNDLE */}
            <div className="pricing-card popular">
              <h3 className="pricing-title">Conversion Bundle</h3>
              <div className="pricing-price">
                <span className="price-inr">3 Videos</span>
                <span className="price-usd">Hooks + Demos + CTA</span>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  3 unique 9:16 reels with varied hooks
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Voiceover &amp; trending sound options
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Text overlays &amp; on-screen CTAs
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  2 revisions per video
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Full Meta &amp; Instagram ad rights
                </li>
              </ul>
              <a href="#connect" onClick={() => setFormData(p => ({...p, package: 'Conversion Bundle — 3 Videos'}))} className="btn btn-solid" style={{ width: '100%', justifyContent: 'center' }}>Get a Custom Quote</a>
            </div>

            {/* MONTHLY RETAINER */}
            <div className="pricing-card">
              <h3 className="pricing-title">Monthly Retainer</h3>
              <div className="pricing-price">
                <span className="price-inr">6+ Videos</span>
                <span className="price-usd">Ongoing Content Bank</span>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Consistent aesthetic content monthly
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Mix of textures, demos &amp; trend reels
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Priority turnaround &amp; dedicated slot
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Unlimited usage rights
                </li>
              </ul>
              <a href="#connect" onClick={() => setFormData(p => ({...p, package: 'Monthly Retainer — 6+ Videos'}))} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Let's Discuss</a>
            </div>
          </div>

          <p className="pricing-disclaimer">All packages are negotiable. Gifted collabs &amp; portfolio-building projects are also welcome — just reach out!</p>
        </div>
      </section>

      {/* CONNECT / QUOTE FORM SECTION */}
      <section id="connect" className="section" style={{ borderBottom: 'none' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Get In Touch</span>
            <h2>Let's Build Something Beautiful</h2>
            <p>Tell me about your brand and I'll put together a custom content proposal for you.</p>
          </div>

          <div className="contact-grid">
            {/* LEFT: Contact Info */}
            <div className="contact-info">
              <div className="contact-methods">
                <a href={`mailto:hello.hibaugc@gmail.com`} className="contact-method-card">
                  <div className="contact-method-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div className="contact-method-details">
                    <h4>Email</h4>
                    <p>hello.hibaugc@gmail.com</p>
                  </div>
                </a>

                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-method-card">
                  <div className="contact-method-icon" style={{ color: '#25D366' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                  </div>
                  <div className="contact-method-details">
                    <h4>WhatsApp</h4>
                    <p>+91 9497335901</p>
                  </div>
                </a>

                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="contact-method-card">
                  <div className="contact-method-icon" style={{ color: '#E1306C' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                    </svg>
                  </div>
                  <div className="contact-method-details">
                    <h4>Instagram</h4>
                    <p>@glowb.yfabi</p>
                  </div>
                </a>
              </div>

              <div style={{ marginTop: '32px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  ✨ <strong style={{ color: 'var(--text-primary)' }}>Gifted collaborations</strong> welcome for the right fit.<br/>
                  🚀 <strong style={{ color: 'var(--text-primary)' }}>Fast turnaround</strong> — typically 3–5 business days.<br/>
                  🎯 <strong style={{ color: 'var(--text-primary)' }}>India D2C brands</strong> get priority slots.
                </p>
              </div>
            </div>

            {/* RIGHT: Quote Form */}
            <div className="contact-form-container">
              {formSubmitted ? (
                <div className="submit-success-msg">
                  ✅ Your email client has opened with your inquiry! I'll get back to you within 24 hours.
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleFormSubmit} id="quote-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input id="name" name="name" className="form-control" type="text" placeholder="Priya Sharma" required value={formData.name} onChange={handleFormChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="brand">Brand Name</label>
                    <input id="brand" name="brand" className="form-control" type="text" placeholder="Your D2C Brand" required value={formData.brand} onChange={handleFormChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" className="form-control" type="email" placeholder="hello@yourbrand.com" required value={formData.email} onChange={handleFormChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="package">Package Interest</label>
                    <select id="package" name="package" className="form-control" value={formData.package} onChange={handleFormChange}>
                      <option value="">— Select a package —</option>
                      <option value="Starter Reel — 1 Video">Starter Reel — 1 Video</option>
                      <option value="Conversion Bundle — 3 Videos">Conversion Bundle — 3 Videos</option>
                      <option value="Monthly Retainer — 6+ Videos">Monthly Retainer — 6+ Videos</option>
                      <option value="Gifted Collaboration">Gifted Collaboration</option>
                      <option value="Custom / Not Sure Yet">Custom / Not Sure Yet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Campaign Goals / Message</label>
                    <textarea id="message" name="message" className="form-control" rows="4" placeholder="Tell me about your product, target audience, and what kind of content you're looking for..." required value={formData.message} onChange={handleFormChange}></textarea>
                  </div>
                  <button type="submit" className="btn btn-solid" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                    Send My Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">HIBA UGC</div>
          <p>© {new Date().getFullYear()} Hiba UGC Portfolio. All Rights Reserved.</p>
          <p style={{ fontSize: '0.8rem', marginTop: '4px', opacity: 0.7 }}>Aesthetic Skincare & Beauty Content Creation | India</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
