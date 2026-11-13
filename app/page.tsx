import type { ReactNode } from "react";

const EMAIL = "support@codeinnovationlab.no";
const VIBEFORT_URL = "https://vibefortress.com";

const Mark = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="7" fill="#1a1919" />
    <path d="M12 10l-6 6 6 6M20 10l6 6-6 6" stroke="#e4f222" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Logo = () => (
  <span className="logo">
    <Mark />
    codeinnovationlab
  </span>
);
const Check = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8.5l3.2 3.2L13 5" />
  </svg>
);
const Icon = ({ children }: { children: ReactNode }) => (
  <span className="tile">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  </span>
);

export default function Home() {
  return (
    <>
      <header className="header">
        <div className="container">
          <a href="#top" aria-label="Code Innovation Lab home"><Logo /></a>
          <nav className="nav" aria-label="Main">
            <a className="link" href="#what">What we do</a>
            <a className="link" href="#vibefort">Vibefort</a>
            <a className="btn btn-sm btn-primary" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="grid-bg" />
          <div className="container hero-inner">
            <a className="note" href="#vibefort">New: we are building Vibefort →</a>
            <h1>Software, built carefully in Norway.</h1>
            <p className="lead">
              Code Innovation Lab is a Norwegian company that builds software. Small team, clear products, plain English.
            </p>
            <div className="actions">
              <a className="btn btn-lg btn-pop" href="#vibefort">See what we are building</a>
              <a className="btn btn-lg btn-outline" href={`mailto:${EMAIL}`}>Get in touch</a>
            </div>
          </div>
        </section>

        <section id="what" className="section">
          <div className="container">
            <div className="head">
              <p className="eyebrow">What we do</p>
              <h2>We build software that people can rely on.</h2>
              <p>Products first. We keep things simple, ship in small steps and care about what happens after launch.</p>
            </div>
            <div className="cards three">
              <div className="card">
                <Icon><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></Icon>
                <h3>Built with care</h3>
                <p>Clean, tested code and honest scope. We build what is needed and nothing that is not.</p>
              </div>
              <div className="card">
                <Icon><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></Icon>
                <h3>Secure by default</h3>
                <p>Security and privacy are part of the product from day one, not an add-on at the end.</p>
              </div>
              <div className="card">
                <Icon><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></Icon>
                <h3>Based in Norway</h3>
                <p>A Norwegian company, with Norwegian and European rules in mind when we design our products.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="vibefort" className="section">
          <div className="container">
            <div className="panel product">
              <div>
                <p className="eyebrow">Our product</p>
                <h2>Vibefort</h2>
                <p className="t">
                  A security expert inside Claude for people who build apps with AI. Say &quot;check my app&quot; and Vibefort finds the
                  holes, explains them in plain English and opens the fix as a pull request.
                </p>
                <ul className="checks">
                  <li><Check />Finds leaked secrets, risky packages and common code mistakes</li>
                  <li><Check />Explains every finding in plain English</li>
                  <li><Check />Shows what is ready when a customer asks about compliance</li>
                </ul>
                <div className="actions">
                  <a className="btn btn-pop" href={VIBEFORT_URL}>Visit Vibefort</a>
                  <a className="btn btn-outline" href={`mailto:${EMAIL}?subject=Vibefort`}>Ask us about it</a>
                </div>
              </div>
              <div className="chat" aria-label="Example conversation">
                <div className="you">check my app</div>
                <div className="vf"><b>Vibefort</b> found 3 things to fix before you launch. The most urgent: an API key is checked into your repository. Want me to open a pull request?</div>
                <div className="you">yes, please</div>
              </div>
            </div>
            <p style={{ marginTop: 12, textAlign: "center", fontSize: 12.5, color: "var(--muted)" }}>
              Example conversation with made-up data. Vibefort is an independent product, not made by Anthropic.
            </p>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact">
            <h2>Need anything? We are here.</h2>
            <p>Questions about our products, support, or working with us: write to us and a person will answer.</p>
            <div className="actions">
              <a className="btn btn-lg btn-primary" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <Logo />
          <p>© 2026 Code Innovation Lab. A company based in Norway. <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
      </footer>
    </>
  );
}
