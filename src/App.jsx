import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

function App() {
  const affirmations = useMemo(() => [
    '我吸入平靜，吐出壓力。',
    '此刻足夠，我也足夠。',
    '我的心如湖面，清澈而安穩。',
    '每一次呼吸，都帶來新的開始。',
    '我選擇溫柔地對待自己。',
    '宇宙正在溫柔地支持我。',
    '我允許自己放下，並信任流動。',
  ], []);

  const [quote, setQuote] = useState(affirmations[Math.floor(Math.random() * affirmations.length)]);
  const [intention, setIntention] = useState('');

  // Simple box-breathing cycle: inhale 4s, hold 4s, exhale 4s
  const phases = ['吸氣', '停留', '呼氣'];
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        setPhaseIndex((p) => (p + 1) % phases.length);
        return 4;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, phases.length]);

  function startPause() {
    setIsRunning((r) => !r);
  }
  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setPhaseIndex(0);
    setSecondsLeft(4);
  }
  function nextAffirmation() {
    const idx = Math.floor(Math.random() * affirmations.length);
    setQuote(affirmations[idx]);
  }

  return (
    <div className="page">
      <header className="hero">
        <h1>靈性指引</h1>
        <p className="subtitle">在呼吸之間，遇見更安穩的自己</p>
      </header>

      <main className="grid">
        <section className="card affirmation" aria-label="每日肯定句">
          <h2>每日肯定</h2>
          <p className="quote">{quote}</p>
          <button className="btn" onClick={nextAffirmation}>換一句</button>
        </section>

        <section className="card breath" aria-label="呼吸與冥想">
          <h2>方框呼吸 4·4·4</h2>
          <div className="breath-visual">
            <div className={`circle ${isRunning ? 'pulse' : ''}`}></div>
          </div>
          <div className="phase">{phases[phaseIndex]}</div>
          <div className="seconds">{secondsLeft}s</div>
          <div className="controls">
            <button className="btn" onClick={startPause}>{isRunning ? '暫停' : '開始'}</button>
            <button className="btn secondary" onClick={resetTimer}>重設</button>
          </div>
        </section>

        <section className="card intention" aria-label="今日意念">
          <h2>今日意念</h2>
          <p className="hint">寫下你此刻的願望或感謝，讓心更聚焦</p>
          <textarea
            className="input"
            placeholder="範例：感謝身體的健康，願我以善意回應世界。"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            rows={5}
          />
          <div className="intention-preview" aria-live="polite">
            {intention ? `你的意念：${intention}` : '你的意念將顯示在這裡'}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>以溫柔與覺察前行</span>
      </footer>
    </div>
  )
}

export default App
