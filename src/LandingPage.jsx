import './LandingPage.css'

function LandingPage({ onStart }) {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="hero-section">
          <div className="brand-name">NOT A MEMO</div>
          <h1 className="hero-title">
            Transform Your Ideas <span className="gradient-text">Into Action</span>
          </h1>
          <p className="hero-subtitle">
            Organize your tasks and achieve your goals.
          </p>

          <button className="cta-button" onClick={onStart}>
            <span>Get Started</span>
            <svg className="arrow-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
