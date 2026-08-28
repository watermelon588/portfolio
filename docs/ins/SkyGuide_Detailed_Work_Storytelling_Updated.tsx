       {/* 04 — PROBLEM STATEMENT */}
        <section className="dw-section container">
          <span className="dw-kicker">02 — WHY I BUILT IT</span>
          <h2 className="dw-heading-lg">THE SKY HAS 13,000+ THINGS TO SHOW YOU. GOOD LUCK PICKING ONE.</h2>
          <p className="dw-body-lg">
            Astronomy gives you an impossible menu: thousands of objects, constantly moving,
            changing with your location, your telescope, the Moon, the weather, and the time.
            I built SkyGuide AI to turn that chaos into a simple answer — what is actually worth
            looking at tonight, and where should the telescope point?
          </p>
        </section>

        {/* 05 — SYSTEM ARCHITECTURE */}
        <section className="dw-section container">
          <span className="dw-kicker">03 — UNDER THE HOOD</span>
          <h2 className="dw-heading-lg">Make the interface feel simple. Make the backend do the hard part.</h2>
          <p className="dw-body-lg">
            SkyGuide is deliberately split into clear responsibilities. React handles the experience,
            Node.js handles the application and real-time session layer, and FastAPI handles the
            astronomy-heavy work. The result is a product that feels calm on the surface while
            the system underneath is doing coordinate transforms, ephemeris calculations and state synchronization.
          </p>

          <div className="dw-arch-grid">
            <div className="dw-arch-card">
              <div>
                <span className="dw-arch-card-tag">THE EXPERIENCE</span>
                <h3>React 19 &amp; Vite</h3>
                <p>
                  The part humans actually touch: dashboard, Tonight, sky maps, target discovery,
                  community surfaces, and a lightweight companion for the telescope-mounted phone.
                </p>
              </div>
              <span className="dw-body-muted">Deployed on Vercel</span>
            </div>

            <div className="dw-arch-card">
              <div>
                <span className="dw-arch-card-tag">THE TRAFFIC CONTROLLER</span>
                <h3>Node.js &amp; Express 5</h3>
                <p>
                  Authentication, telescope state, business logic, Socket.IO pairing rooms,
                  and real-time packet routing. Basically: the service that keeps everyone from
                  shouting at the telescope at once.
                </p>
              </div>
              <span className="dw-body-muted">Deployed on Render</span>
            </div>

            <div className="dw-arch-card">
              <div>
                <span className="dw-arch-card-tag">THE SCIENCE</span>
                <h3>FastAPI &amp; Astropy</h3>
                <p>
                  Ephemeris generation, coordinate transformations, visibility, lunar context,
                  and recommendation inputs. The boring-looking service doing the decidedly
                  non-boring math.
                </p>
              </div>
              <span className="dw-body-muted">Deployed on Render</span>
            </div>
          </div>
        </section>

        {/* 06 — ASTRONOMY INTELLIGENCE */}
        <section className="dw-section container">
          <span className="dw-kicker">04 — WHEN THE SKY STARTS MOVING</span>
          <h2 className="dw-heading-lg">The universe is moving. The UI should not panic.</h2>
          <p className="dw-body-lg">
            Celestial positions are time-dependent, so the science layer owns the truth.
            FastAPI resolves targets into real-time Alt/Az positions, visibility windows,
            and lunar context, then sends the interface already-computed observational state.
            React gets to render the sky instead of secretly becoming an astrophysicist.
          </p>

          <div className="dw-media-container" style={{ marginTop: "3rem" }}>
            <div className="dw-media-frame dw-media-frame-chart">
              <img
                src={gallery3}
                alt="All Sky Chart & Celestial Resolution"
                className="dw-media-img dw-media-img-chart"
              />
            </div>
          </div>
        </section>

        {/* 07 — PERSONALIZED RECOMMENDATION ENGINE */}
        <section className="dw-section container">
          <span className="dw-kicker">05 — THE PRODUCT HAS AN OPINION</span>
          <h2 className="dw-heading-lg">Not “here are 13,000 objects.” Try “start with this one.”</h2>
          <p className="dw-body-lg">
            A giant catalog is impressive for about ten seconds. A useful recommendation is better.
            SkyGuide turns the catalog into a live matching problem, scoring targets against the
            observer’s current sky, telescope and weather context so the night starts with a shortlist,
            not a spreadsheet.
          </p>

          <div className="dw-media-container" style={{ marginTop: "3rem" }}>
            <div className="dw-media-frame dw-media-frame-recommendations">
              <img
                src={gallery4}
                alt="SkyGuide AI Tonight Recommendation Cards"
                className="dw-media-img dw-media-img-recommendations"
              />
            </div>
          </div>
        </section>

        {/* 08 — REAL-TIME TELESCOPE ALIGNMENT */}
        <section className="dw-section container">
          <span className="dw-kicker">06 — POINTING AT THE SKY</span>
          <h2 className="dw-heading-lg">Knowing what to see is only half the problem.</h2>
          <p className="dw-body-lg">
            The phone becomes the telescope’s guide. Its sensors are calibrated on-device and streamed
            at 20Hz through a short-lived Socket.IO room. The Node gateway combines that orientation
            with FastAPI ephemeris segments to continuously calculate how far the telescope is from
            the target — without making an HTTP request for every sensor frame.
          </p>

          <div className="dw-media-container" style={{ marginTop: "3rem" }}>
            <div className="dw-media-frame dw-media-frame-alignment">
              <img
                src={gallery6}
                alt="Real-time Telescope Alignment Interface"
                className="dw-media-img dw-media-img-alignment"
              />
            </div>
          </div>
        </section>

        {/* 09 — MOBILE COMPANION */}
        <section className="dw-section container">
          <span className="dw-kicker">07 — THE PHONE COMES WITH YOU</span>
          <h2 className="dw-heading-lg">One QR scan. No giant app download while you are standing outside in the dark.</h2>
          <p className="dw-body-lg">
            The phone is mounted to the telescope, so loading the entire desktop application would be
            needless baggage. A separate Vite entry delivers only what the field workflow needs:
            pairing, sensor streaming and live directional guidance.
          </p>

          <div className="dw-showcase-grid" style={{ marginTop: "3rem" }}>
            <div className="dw-showcase-card">
              <div className="dw-showcase-img-wrap dw-showcase-img-wrap-qr">
                <img
                  src={gallery12}
                  alt="QR Code Pairing Session"
                  className="dw-showcase-img dw-showcase-img-qr"
                />
              </div>
              <div className="dw-showcase-caption">
                <h4>Scan. Pair. Point.</h4>
                <p>A short-lived QR pairing session establishes the real-time orientation stream in seconds.</p>
              </div>
            </div>

            <div className="dw-showcase-card">
              <div className="dw-showcase-img-wrap dw-showcase-img-wrap-inspector">
                <img
                  src={gallery5}
                  alt="Celestial Object Inspector"
                  className="dw-showcase-img dw-showcase-img-inspector"
                />
              </div>
              <div className="dw-showcase-caption">
                <h4>Keep the Science Beside the Telescope</h4>
                <p>Target parameters and alignment deltas stay visible where the actual observing happens.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 10 — PRODUCT SURFACES EDITORIAL SHOWCASE */}
        <section className="dw-section container">
          <span className="dw-kicker">08 — MORE THAN A DASHBOARD</span>
          <h2 className="dw-heading-lg">A night of observing, turned into one continuous experience.</h2>

          <div className="dw-showcase-grid" style={{ marginTop: "3rem" }}>
            <div className="dw-showcase-card">
              <div className="dw-showcase-img-wrap dw-showcase-img-wrap-explorer">
                <img
                  src={gallery7}
                  alt="13,311 Celestial Catalog Explorer"
                  className="dw-showcase-img dw-showcase-img-explorer"
                />
              </div>
              <div className="dw-showcase-caption">
                <h4>Explore Without Getting Lost</h4>
                <p>Search and filter across Messier, NGC, and IC objects without turning discovery into database administration.</p>
              </div>
            </div>

            <div className="dw-showcase-card">
              <div className="dw-showcase-img-wrap dw-showcase-img-wrap-community">
                <img
                  src={gallery8}
                  alt="Privacy-safe Observers Community Map"
                  className="dw-showcase-img dw-showcase-img-community"
                />
              </div>
              <div className="dw-showcase-caption">
                <h4>Because Stargazing Is Better Together</h4>
                <p>Discover nearby observers through coarse, privacy-safe location cells and make the sky a little less solitary.</p>
              </div>
            </div>
          </div>
        </section>


        {/* 11 — SCALE & DATA */}
        <section className="dw-section container">
          <span className="dw-kicker">09 — THEN THE CATALOG GOT BIG</span>
          <div className="dw-scale-number">13,311</div>
          <p className="dw-body-lg">
            What started as a curated observing list grew into 13,311 celestial objects: 110 Messier,
            7,993 NGC, and 5,208 IC entries. At that point the problem stopped being “can we store the data?”
            and became “can the pipeline stay responsive when the sky gets 120× busier?”
          </p>

          <div className="dw-scale-subgrid">
            <div>
              <span className="dw-scale-stat-val">110</span>
              <span className="dw-scale-stat-lbl">Messier Objects</span>
            </div>
            <div>
              <span className="dw-scale-stat-val">7,993</span>
              <span className="dw-scale-stat-lbl">NGC Galaxies &amp; Nebulae</span>
            </div>
            <div>
              <span className="dw-scale-stat-val">5,208</span>
              <span className="dw-scale-stat-lbl">IC Index Catalog Bodies</span>
            </div>
          </div>
        </section>

        {/* 12 — ENGINEERING DECISIONS */}
        <section className="dw-section container">
          <span className="dw-kicker">10 — THE UNGLAMOROUS PART</span>
          <h2 className="dw-heading-lg">The little engineering decisions that kept the magic from falling apart.</h2>

          <div className="dw-decisions-list" style={{ marginTop: "3rem" }}>
            <div className="dw-decision-item">
              <span className="dw-decision-num">01</span>
              <h3 className="dw-decision-title">Separate the science from the app</h3>
              <p className="dw-decision-body">
                FastAPI owns the Astropy-heavy calculations while Express owns application orchestration. That boundary lets the astronomy engine evolve without dragging the UI into every scientific change.
              </p>
            </div>

            <div className="dw-decision-item">
              <span className="dw-decision-num">02</span>
              <h3 className="dw-decision-title">Keep the fast stuff on the fast path</h3>
              <p className="dw-decision-body">
                Phone orientation arrives at 20Hz through short-lived Socket.IO rooms. The gateway handles per-packet alignment math instead of round-tripping every sensor frame through HTTP.
              </p>
            </div>

            <div className="dw-decision-item">
              <span className="dw-decision-num">03</span>
              <h3 className="dw-decision-title">Cache the expensive sky</h3>
              <p className="dw-decision-body">
                Repeated celestial computations are cached so “show me tonight’s sky” does not become “please wait while the universe is calculated again.”
              </p>
            </div>

            <div className="dw-decision-item">
              <span className="dw-decision-num">04</span>
              <h3 className="dw-decision-title">Put a gate in front of the telescope brain</h3>
              <p className="dw-decision-body">
                The astronomy engine is not exposed directly to browsers. The gateway provides the security boundary with authentication, rate limiting, validation and protection against unsafe query operators.
              </p>
            </div>

            <div className="dw-decision-item">
              <span className="dw-decision-num">05</span>
              <h3 className="dw-decision-title">Give the mounted phone less to carry</h3>
              <p className="dw-decision-body">
                A dedicated mobile entry loads only pairing, sensors and guidance instead of shipping the full desktop SPA to a phone sitting beside a telescope.
              </p>
            </div>
          </div>
        </section>

        {/* 13 — PRODUCTION & DEPLOYMENT */}
        <section className="dw-section container">
          <span className="dw-kicker">11 — FROM LOCALHOST TO THE REAL SKY</span>
          <h2 className="dw-heading-lg">Then I had to make it survive outside my laptop.</h2>
          <p className="dw-body-lg">
            The system moved to production on Vercel, Render and MongoDB Atlas, with Cloudinary handling
            persistent gallery media. That meant dealing with the fun little differences between “works on my machine”
            and an actual Linux production environment — plus hardening auth, rate limits, cookies, storage and service boundaries.
          </p>
        </section>

        {/* 14 — CLOSING RESULT */}
        <section className="dw-section container">
          <span className="dw-kicker">12 — THE POINT</span>
          <h2 className="dw-conclusion-lead">
            LOOK UP.<br />
            <span className="dw-conclusion-accent">KNOW WHAT MATTERS.</span><br />
            POINT. OBSERVE. WONDER.
          </h2>
          <p className="dw-body-lg">
            SkyGuide AI is not just another catalog or sky map. It is an attempt to make the gap between
            curiosity and actually finding something in the sky feel smaller — using astronomy, real-time systems,
            recommendation logic and a little bit of AI to turn “what now?” into “look there.”
          </p>
        </section>
      </main>

      {/* 15 — NEXT CASE TRANSITION FOOTER */}
      <Footer nextProject={nextProjectForFooter} />
    </>
  );
}

export default ProjectPage;