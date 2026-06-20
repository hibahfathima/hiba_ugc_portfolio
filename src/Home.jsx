import { useState, useRef, useEffect } from 'react';
import profileImg from './assets/progile_image.jpeg';
import facewashVid from './assets/UGC_facewash.MOV';
import lipstickVid from './assets/UGC_lipstick.MOV';

function Home() {
  // Theme state: default is light, cached in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hiba-theme') || 'light';
  });

  // Video play states
  const [playing, setPlaying] = useState({
    facewash: false,
    lipstick: false,
  });

  // Refs for HTML5 video elements
  const facewashRef = useRef(null);
  const lipstickRef = useRef(null);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hiba-theme', theme);
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Video playback handler
  const handlePlayVideo = (videoKey, ref) => {
    if (ref.current) {
      if (playing[videoKey]) {
        ref.current.pause();
        setPlaying((prev) => ({ ...prev, [videoKey]: false }));
      } else {
        // Pause other video first
        if (videoKey === 'facewash' && lipstickRef.current && playing.lipstick) {
          lipstickRef.current.pause();
          setPlaying((prev) => ({ ...prev, lipstick: false }));
        } else if (videoKey === 'lipstick' && facewashRef.current && playing.facewash) {
          facewashRef.current.pause();
          setPlaying((prev) => ({ ...prev, facewash: false }));
        }

        // Play with sound/voice enabled
        ref.current.muted = false;
        ref.current.play();
        setPlaying((prev) => ({ ...prev, [videoKey]: true }));
      }
    }
  };

  // Sync state if controls are used manually
  const syncPlayState = (videoKey, state) => {
    setPlaying((prev) => ({ ...prev, [videoKey]: state }));
  };

  // Direct Social Links
  const whatsappUrl = "https://wa.me/919961963005?text=Hi%20Hiba%2C%20I%20saw%20your%20UGC%20portfolio%20and%20would%20love%20to%20collaborate!";
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
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              Let's Chat
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
                ✨ Beginner Creator
              </span>
            </div>
            
            <h1 className="hero-title">
              Fresh, Aesthetic Content for <span>Skincare & Beauty</span> Brands
            </h1>
            
            <p className="hero-desc">
              Hi, I'm Hiba! I am a passionate **beginner UGC Creator** eager to bring high energy, clean visual aesthetics, and creative concepts to your beauty campaigns. Let's collaborate to build stunning visual proof for your formulations.
            </p>
            
            <div className="hero-cta">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                WhatsApp Me
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                </svg>
                Instagram Profile
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
            <h2>Eager to Grow & Create</h2>
          </div>
          
          <div className="about-bio">
            <p>
              As a **beginner UGC creator**, I approach content creation with fresh eyes, high dedication, and a commitment to highlight the finest details of your product. I specialize in showing skin textures, smooth applications, satisfying product lathers, and makeup swatches in natural light.
            </p>
            <p>
              My goal is to provide beauty and skincare brands with organic, friendly, and clean videos that feel like a direct recommendation from a close friend. Since I am building my portfolio, I put 100% of my focus, creativity, and energy into making sure your brand shines.
            </p>

            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-num">Fresh</span>
                <span className="stat-label">Perspective</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-label">Dedication</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">Active</span>
                <span className="stat-label">Collaboration</span>
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
            <div className="portfolio-card" onClick={() => handlePlayVideo('facewash', facewashRef)}>
              <div className="video-container">
                <video 
                  ref={facewashRef}
                  src={facewashVid}
                  className="portfolio-video"
                  playsInline
                  loop
                  preload="metadata"
                  onPlay={() => syncPlayState('facewash', true)}
                  onPause={() => syncPlayState('facewash', false)}
                />
                <div className={`video-overlay ${playing.facewash ? 'playing' : ''}`}>
                  <span className="video-tag">Skincare Demo</span>
                  <div className="play-btn-circle">
                    {playing.facewash ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1"/>
                        <rect x="14" y="4" width="4" height="16" rx="1"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
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
            <div className="portfolio-card" onClick={() => handlePlayVideo('lipstick', lipstickRef)}>
              <div className="video-container">
                <video 
                  ref={lipstickRef}
                  src={lipstickVid}
                  className="portfolio-video"
                  playsInline
                  loop
                  preload="metadata"
                  onPlay={() => syncPlayState('lipstick', true)}
                  onPause={() => syncPlayState('lipstick', false)}
                />
                <div className={`video-overlay ${playing.lipstick ? 'playing' : ''}`}>
                  <span className="video-tag">Beauty Swatch</span>
                  <div className="play-btn-circle">
                    {playing.lipstick ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1"/>
                        <rect x="14" y="4" width="4" height="16" rx="1"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
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

            {/* CTA PORTFOLIO CARD (Brand Placeholder) */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="portfolio-card cta-portfolio-card">
              <div className="cta-portfolio-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </div>
              <h3>Collaborate with Me</h3>
              <p>
                Let's discuss how we can create high-quality, aesthetic content tailored for your brand's skincare or cosmetic products.
              </p>
              <span className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
                Connect on WhatsApp
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
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 7a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7Z"/>
                  <path d="M10 11l4 3-4 3v-6Z"/>
                </svg>
              </div>
              <h3>Product Demos & Close-ups</h3>
              <p>Step-by-step applications showing cream lathers, serum drops, and pigment swatches in warm, aesthetic angles.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
                </svg>
              </div>
              <h3>Satisfying ASMR & Unboxing</h3>
              <p>Visual and sensory focus with natural sound triggers: opening bottles, pump clicks, and cardboard unboxing snaps.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v18M3 12h18"/>
                  <circle cx="12" cy="12" r="9"/>
                </svg>
              </div>
              <h3>Routines & Mini-Vlogs</h3>
              <p>Gracefully weaving your beauty or skincare products into aesthetic daily self-care habits and morning routines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONNECT SECTION (Direct Social Links) */}
      <section id="connect" className="section" style={{ borderBottom: 'none' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="section-header">
            <span className="badge badge-gold">Let's Collaborate</span>
            <h2>Start Your Next Campaign</h2>
            <p>
              I am open to gifted campaigns, portfolio-building projects, and paid deals. Let's discuss ideas! Connect with me directly on Instagram or WhatsApp.
            </p>
          </div>

          <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '600px', margin: '0 auto' }}>
            {/* WhatsApp Connect Card */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="pricing-card" style={{ padding: '32px', gap: '16px', alignItems: 'center' }}>
              <div className="contact-method-icon" style={{ backgroundColor: 'rgba(37, 211, 102, 0.1)', color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.2)', width: '60px', height: '60px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <h3 className="pricing-title" style={{ fontSize: '1.4rem' }}>WhatsApp Chat</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fast responses for collabs & content discussions.</p>
              <span className="btn btn-solid" style={{ backgroundColor: '#25D366', borderColor: '#25D366', color: '#FFF', width: '100%' }}>
                Message on WhatsApp
              </span>
            </a>

            {/* Instagram Connect Card */}
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="pricing-card" style={{ padding: '32px', gap: '16px', alignItems: 'center' }}>
              <div className="contact-method-icon" style={{ backgroundColor: 'rgba(225, 48, 108, 0.1)', color: '#E1306C', borderColor: 'rgba(225, 48, 108, 0.2)', width: '60px', height: '60px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                </svg>
              </div>
              <h3 className="pricing-title" style={{ fontSize: '1.4rem' }}>Instagram DM</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Follow my aesthetic beauty feed & drop a DM.</p>
              <span className="btn btn-solid" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', border: 'none', color: '#FFF', width: '100%' }}>
                DM on Instagram
              </span>
            </a>
          </div>

          <div style={{ marginTop: '40px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Or email me directly at: <a href="mailto:hello.hibaugc@gmail.com" style={{ textDecoration: 'underline', color: 'var(--accent-gold)' }}>hello.hibaugc@gmail.com</a>
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
