import Link from "next/link";
import { DM_Sans, Unbounded } from "next/font/google";
import { Dot } from "./dot";
import { HeroQuestion } from "./hero-question";
import { LeaderboardPreview } from "./leaderboard-preview";
import { ListenSample } from "./listen-sample";
import { PlayDiagram } from "./play-diagram";
import { Reveal } from "./reveal";
import { Wordmark } from "./wordmark";
import s from "./edorax-landing.module.css";

// The Edorax home page. Static markup with inline brand values so it matches the
// approved design one to one; the hero question, Play, Listen and the leaderboard
// choice are small client components.

const unbounded = Unbounded({ subsets: ["latin"], weight: ["700"], variable: "--font-unbounded", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dm-sans", display: "swap" });

function SignInLink() {
  return <Link href="/login" style={{ color: "#0A0F2C", textDecoration: "none", fontWeight: 700, padding: "12px 0", whiteSpace: "nowrap" }}>Sign in</Link>;
}

function CatalogLink() {
  return <Link href="/courses" style={{ display: "inline-block", color: "#F6F7FB", textDecoration: "none", fontWeight: 700, padding: "14px 28px", border: "2px solid #F6F7FB" }}>Browse courses</Link>;
}

export function EdoraxLanding() {
  return (
    <div className={`${unbounded.variable} ${dmSans.variable}`}>
    <div className={s.root} style={{ width: "100%", boxSizing: "border-box", background: "#F6F7FB", color: "#0A0F2C", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: "18px", lineHeight: "1.55" }}>
      <header style={{ width: "100%" }}>
        <div className={s.header} style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <a href="#top" aria-label="Edorax home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Wordmark tone="light" height={30} />
          </a>
          <nav aria-label="Main" className={s.nav} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 28px", fontSize: "16px" }}>
            <a href="#how" className={s.navLink} style={{ color: "#0A0F2C", textDecoration: "none", padding: "12px 0" }}>How it works</a>
            <a href="#dot" className={s.navLink} style={{ color: "#0A0F2C", textDecoration: "none", padding: "12px 0" }}>Meet Dot</a>
            <a href="#topics" className={s.navLink} style={{ color: "#0A0F2C", textDecoration: "none", padding: "12px 0" }}>What you can learn</a>
            <SignInLink />
            <a href="#top" className={s.navCta} style={{ background: "#2434E0", color: "#F6F7FB", textDecoration: "none", fontWeight: "700", padding: "12px 22px" }}>Try a question</a>
          </nav>
        </div>
      </header>
      <section id="top" style={{ width: "100%" }}>
        <div className={s.hero} style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 96px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "56px" }}>
          <div style={{ flex: "1 1 480px", minWidth: "0" }}>
            <h1 className={s.h1} style={{ margin: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "54px", lineHeight: "1.1", letterSpacing: "-0.035em" }}>Every lesson starts with a question you already wonder about.</h1>
            <p style={{ margin: "24px 0 0", fontSize: "20px", color: "#46507A", maxWidth: "520px" }}>Then you play with it, listen to it and prove it. Short chapters that work on a phone, on a slow connection, in your second language.</p>
            <div className={s.hideSm} style={{ marginTop: "36px", display: "flex", flexWrap: "wrap", gap: "14px" }}>
              <a href="#top" style={{ background: "#2434E0", color: "#F6F7FB", textDecoration: "none", fontWeight: "700", padding: "15px 28px" }}>Answer the question</a>
              <a href="#how" style={{ color: "#0A0F2C", textDecoration: "none", fontWeight: "700", padding: "13px 26px", border: "2px solid #0A0F2C" }}>See how a chapter works</a>
            </div>
          </div>
          <HeroQuestion />
        </div>
      </section>
      <section id="how" style={{ width: "100%", background: "#FFFFFF", borderTop: "1px solid #DCE0F2", borderBottom: "1px solid #DCE0F2" }}>
        <div className={s.pad} style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 24px", boxSizing: "border-box" }}>
          <h2 className={s.h2} style={{ margin: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "36px", lineHeight: "1.15", letterSpacing: "-0.02em", maxWidth: "680px" }}>One chapter, four ways in.</h2>
          <p style={{ margin: "16px 0 0", color: "#46507A", maxWidth: "560px" }}>Read it, play with it, listen to it, prove it. Use all four, or only the ones that suit your day.</p>
          <div className={s.rail} style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))", gap: "20px" }}>
            <div style={{ border: "1px solid #DCE0F2", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "170px", background: "#E8EBFF", padding: "22px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#2434E0", letterSpacing: "0.06em", textTransform: "uppercase" }}>Starts with why</div>
                <div style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "16px", lineHeight: "1.35" }}>Why does a video buffer at night but not in the morning?</div>
                <div style={{ height: "8px", width: "80%", background: "#FFFFFF" }} />
                <div style={{ height: "8px", width: "60%", background: "#FFFFFF" }} />
              </div>
              <div style={{ padding: "22px" }}>
                <h3 style={{ margin: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "20px", letterSpacing: "-0.02em" }}>Read</h3>
                <p style={{ margin: "8px 0 0", fontSize: "16px", color: "#46507A" }}>A question from your own life first, then the idea that answers it.</p>
              </div>
            </div>
            <div style={{ border: "1px solid #DCE0F2", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "170px", background: "#E8EBFF", padding: "18px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px" }}>
                <PlayDiagram />
              </div>
              <div style={{ padding: "22px" }}>
                <h3 style={{ margin: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "20px", letterSpacing: "-0.02em" }}>Play</h3>
                <p style={{ margin: "8px 0 0", fontSize: "16px", color: "#46507A" }}>Live diagrams and small labs you can poke at, so the words turn into something you have seen.</p>
              </div>
            </div>
            <div style={{ border: "1px solid #DCE0F2", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "170px", background: "#E8EBFF", padding: "20px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", gap: "14px" }}>
                <ListenSample />
              </div>
              <div style={{ padding: "22px" }}>
                <h3 style={{ margin: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "20px", letterSpacing: "-0.02em" }}>Listen</h3>
                <p style={{ margin: "8px 0 0", fontSize: "16px", color: "#46507A" }}>Every chapter can be heard, word by word, at any speed from 0.75x to 4x.</p>
              </div>
            </div>
            <div style={{ border: "1px solid #DCE0F2", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "170px", background: "#E8EBFF", padding: "20px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px" }}>
                <div aria-hidden="true" style={{ height: "26px", background: "#FFFFFF" }} />
                <div aria-hidden="true" style={{ height: "26px", background: "#FFFFFF" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginTop: "4px" }}>
                  <span style={{ fontSize: "13px", color: "#46507A" }}>Hidden until you start</span>
                  <span style={{ background: "#FFC933", fontSize: "14px", fontWeight: "700", padding: "6px 16px" }}>Start</span>
                </div>
              </div>
              <div style={{ padding: "22px" }}>
                <h3 style={{ margin: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "20px", letterSpacing: "-0.02em" }}>Prove</h3>
                <p style={{ margin: "8px 0 0", fontSize: "16px", color: "#46507A" }}>A short quiz with no timer. Questions stay hidden until you press Start, so the result is yours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="dot" style={{ width: "100%" }}>
        <div className={s.pad} style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 24px", boxSizing: "border-box" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 460px", minWidth: "0" }}>
              <h2 className={s.h2} style={{ margin: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "36px", lineHeight: "1.15", letterSpacing: "-0.02em" }}>Meet Dot. It notices when you need a hand.</h2>
              <p style={{ margin: "16px 0 0", color: "#46507A", maxWidth: "560px" }}>Dot never nags and never blames. It shows up at the right moment, says one short thing, and gets out of your way.</p>
            </div>
          </div>
          <div className={s.railTab} style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "16px" }}>
            <div style={{ background: "#FFFFFF", border: "1px solid #DCE0F2", padding: "22px 18px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px" }}>
              <Dot mood="think" size={112} />
              <div style={{ fontWeight: "700", fontSize: "16px" }}>When you are stuck</div>
              <div style={{ fontSize: "14px", lineHeight: "1.45", color: "#46507A" }}>&quot;Want a hint? Just a small one.&quot;</div>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #DCE0F2", padding: "22px 18px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px" }}>
              <Dot mood="determined" size={112} />
              <div style={{ fontWeight: "700", fontSize: "16px" }}>When a quiz goes badly</div>
              <div style={{ fontSize: "14px", lineHeight: "1.45", color: "#46507A" }}>&quot;Two ideas to look at again. Then try once more.&quot;</div>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #DCE0F2", padding: "22px 18px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px" }}>
              <Dot mood="wave" size={112} />
              <div style={{ fontWeight: "700", fontSize: "16px" }}>When you come back</div>
              <div style={{ fontSize: "14px", lineHeight: "1.45", color: "#46507A" }}>&quot;I missed you! Five minutes and we&apos;re back in it.&quot;</div>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #DCE0F2", padding: "22px 18px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px" }}>
              <Dot mood="wink" size={112} />
              <div style={{ fontWeight: "700", fontSize: "16px" }}>When it finally clicks</div>
              <div style={{ fontSize: "14px", lineHeight: "1.45", color: "#46507A" }}>&quot;That took a few tries. It will stick now.&quot;</div>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #DCE0F2", padding: "22px 18px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px" }}>
              <Dot mood="cheer" size={112} />
              <div style={{ fontWeight: "700", fontSize: "16px" }}>When you finish</div>
              <div style={{ fontSize: "14px", lineHeight: "1.45", color: "#46507A" }}>&quot;Lesson done. Next one is ready when you are.&quot;</div>
            </div>
          </div>
          <div style={{ marginTop: "40px", background: "#FFFFFF", border: "1px solid #DCE0F2", padding: "28px", boxSizing: "border-box" }}>
            <div style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "20px", letterSpacing: "-0.02em" }}>Stuck? You choose how much help you get.</div>
            <Reveal>
              <div className={`${s.rail} ${s.railHalf}`} style={{ marginTop: "24px", display: "flex", gap: "16px", alignItems: "flex-end" }}>
                <div style={{ flex: "1 1 0", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontWeight: "700", fontSize: "16px" }}>1. A nudge</div>
                  <div style={{ fontSize: "14px", color: "#46507A" }}>Which part matters most?</div>
                  <div className={s.bar} style={{ height: "40px", borderRadius: "8px", background: "#DCE0F2" }} />
                </div>
                <div style={{ flex: "1 1 0", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontWeight: "700", fontSize: "16px" }}>2. A hint</div>
                  <div style={{ fontSize: "14px", color: "#46507A" }}>The idea, not the answer.</div>
                  <div className={s.bar} style={{ height: "70px", borderRadius: "8px", background: "#7A8BFF" }} />
                </div>
                <div style={{ flex: "1 1 0", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontWeight: "700", fontSize: "16px" }}>3. An example</div>
                  <div style={{ fontSize: "14px", color: "#46507A" }}>A similar one, solved.</div>
                  <div className={s.bar} style={{ height: "100px", borderRadius: "8px", background: "#2434E0" }} />
                </div>
                <div style={{ flex: "1 1 0", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontWeight: "700", fontSize: "16px" }}>4. Come back later</div>
                  <div style={{ fontSize: "14px", color: "#46507A" }}>It waits at the end.</div>
                  <div className={s.bar} style={{ height: "130px", borderRadius: "8px", background: "#FFC933" }} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section id="topics" style={{ width: "100%", background: "#FFFFFF", borderTop: "1px solid #DCE0F2", borderBottom: "1px solid #DCE0F2" }}>
        <div className={s.pad} style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 24px", boxSizing: "border-box" }}>
          <h2 className={s.h2} style={{ margin: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "36px", lineHeight: "1.15", letterSpacing: "-0.02em", maxWidth: "720px" }}>How things work. And how people work.</h2>
          <p style={{ margin: "16px 0 0", color: "#46507A", maxWidth: "600px" }}>Tech skills and human skills, side by side. Here are a few of the questions courses start from, and more are on the way.</p>
          <div className={s.rail} style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "16px" }}>
            <div style={{ minHeight: "168px", background: "#2434E0", color: "#F6F7FB", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "18px" }}>
              <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.35", letterSpacing: "-0.01em" }}>Why does a video buffer at night but play fine in the morning?</span>
              <span style={{ fontSize: "14px", color: "#DCE0FF" }}>Networks</span>
            </div>
            <div style={{ minHeight: "168px", background: "#F6F7FB", border: "1px solid #DCE0F2", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "18px" }}>
              <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.35", letterSpacing: "-0.01em" }}>How do you say no to your manager without burning the bridge?</span>
              <span style={{ fontSize: "14px", color: "#46507A" }}>Communication</span>
            </div>
            <div style={{ minHeight: "168px", background: "#F6F7FB", border: "1px solid #DCE0F2", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "18px" }}>
              <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.35", letterSpacing: "-0.01em" }}>What happens when ten thousand people press the same button at once?</span>
              <span style={{ fontSize: "14px", color: "#46507A" }}>Systems</span>
            </div>
            <div style={{ minHeight: "168px", background: "#FFC933", color: "#0A0F2C", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "18px" }}>
              <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.35", letterSpacing: "-0.01em" }}>How do you explain your work so people remember it?</span>
              <span style={{ fontSize: "14px" }}>Speaking</span>
            </div>
            <div style={{ minHeight: "168px", background: "#F6F7FB", border: "1px solid #DCE0F2", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "18px" }}>
              <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.35", letterSpacing: "-0.01em" }}>Why do some apps feel cheap even when they work fine?</span>
              <span style={{ fontSize: "14px", color: "#46507A" }}>Product</span>
            </div>
            <div style={{ minHeight: "168px", background: "#0A0F2C", color: "#F6F7FB", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "18px" }}>
              <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.35", letterSpacing: "-0.01em" }}>What do you say in an interview when you have no idea?</span>
              <span style={{ fontSize: "14px", color: "#C9CFF0" }}>Interviews</span>
            </div>
            <div style={{ minHeight: "168px", background: "#E8EBFF", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "18px" }}>
              <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.35", letterSpacing: "-0.01em" }}>How do you ask for help without feeling stupid?</span>
              <span style={{ fontSize: "14px", color: "#46507A" }}>Learning</span>
            </div>
            <div style={{ minHeight: "168px", background: "#F6F7FB", border: "1px solid #DCE0F2", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "18px" }}>
              <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "18px", lineHeight: "1.35", letterSpacing: "-0.01em" }}>Why does one resume get the call and another does not?</span>
              <span style={{ fontSize: "14px", color: "#46507A" }}>Career</span>
            </div>
          </div>
        </div>
      </section>
      <section style={{ width: "100%", background: "#0A0F2C", color: "#F6F7FB" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "32px 48px", alignItems: "center" }}>
          <h2 style={{ margin: "0", flex: "1 1 320px", minWidth: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "28px", lineHeight: "1.2", letterSpacing: "-0.02em" }}>Made for phones and slow connections.</h2>
          <div style={{ flex: "2 1 560px", minWidth: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(170px, 100%), 1fr))", gap: "24px" }}>
            <div>
              <div style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "26px", color: "#FFC933" }}>1 MB</div>
              <div style={{ marginTop: "4px", fontSize: "15px", color: "#C9CFF0" }}>about four minutes of narration</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "26px", color: "#FFC933" }}>0.75x to 4x</div>
              <div style={{ marginTop: "4px", fontSize: "15px", color: "#C9CFF0" }}>listen at your own speed</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "26px", color: "#FFC933" }}>Offline</div>
              <div style={{ marginTop: "4px", fontSize: "15px", color: "#C9CFF0" }}>progress saves and syncs later</div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ width: "100%" }}>
        <div className={s.pad} style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
          <div style={{ flex: "1 1 420px", minWidth: "0" }}>
            <h2 className={s.h2} style={{ margin: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "36px", lineHeight: "1.15", letterSpacing: "-0.02em" }}>Compete if you like. Or don&apos;t.</h2>
            <p style={{ margin: "16px 0 0", color: "#46507A", maxWidth: "500px" }}>Streaks and points help on the days you need a push. Leaderboards are your choice: your cohort, only your own last week, or nothing at all.</p>
          </div>
          <div style={{ flex: "1 1 460px", minWidth: "0", background: "#FFFFFF", border: "1px solid #DCE0F2", padding: "24px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "22px" }}>
            <LeaderboardPreview />
          </div>
        </div>
      </section>
      <section style={{ width: "100%", background: "#2434E0", color: "#F6F7FB" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "72px 24px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "40px" }}>
          <div style={{ flex: "1 1 420px", minWidth: "0" }}>
            <h2 className={s.h2} style={{ margin: "0", fontFamily: "var(--font-unbounded), sans-serif", fontWeight: "700", fontSize: "40px", lineHeight: "1.12", letterSpacing: "-0.03em" }}>Answer one question. See where it takes you.</h2>
            <p style={{ margin: "16px 0 0", fontSize: "19px", color: "#EEF0FF", maxWidth: "480px" }}>Make an account only when you want to keep your progress.</p>
            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "14px" }}>
              <a href="#top" style={{ display: "inline-block", background: "#FFC933", color: "#0A0F2C", textDecoration: "none", fontWeight: "700", padding: "16px 30px" }}>Try the first question</a>
              <CatalogLink />
            </div>
          </div>
          <div style={{ flex: "none" }}>
            <span className={s.bob}>
              <Dot mood="cheer" size={200} />
            </span>
          </div>
        </div>
      </section>
      <footer style={{ width: "100%", background: "#0A0F2C", color: "#C9CFF0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "44px 24px 36px", boxSizing: "border-box", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "24px" }}>
          <div>
            <Wordmark tone="dark" height={26} />
          </div>
          <nav aria-label="Footer" style={{ display: "flex", flexWrap: "wrap", gap: "4px 28px", fontSize: "15px" }}>
            <a href="#how" style={{ color: "#C9CFF0", textDecoration: "none", padding: "10px 0" }}>How it works</a>
            <a href="#dot" style={{ color: "#C9CFF0", textDecoration: "none", padding: "10px 0" }}>Meet Dot</a>
            <a href="#topics" style={{ color: "#C9CFF0", textDecoration: "none", padding: "10px 0" }}>What you can learn</a>
            <span style={{ padding: "10px 0" }}>edorax.com</span>
          </nav>
        </div>
      </footer>
    </div>
    </div>
  );
}
