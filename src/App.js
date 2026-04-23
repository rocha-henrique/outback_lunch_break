import { useState, useRef } from 'react';
import logo from './images/outback_logo.png';
import './App.css';

function App() {
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);

  const lunchOptions = [
    { label: '00:35', value: 35 },
    { label: '01:05', value: 65 },
    { label: '02:05', value: 125 },
  ];

  const [lunchIndex, setLunchIndex] = useState(0);
  const [returnTime, setReturnTime] = useState('');
  const [showResult, setShowResult] = useState(false);

  const touchStartY = useRef(null);

  function changeValue(setter, max) {
    return (delta) => {
      setter((prev) => {
        let next = prev + delta;
        if (next < 0) next = max;
        if (next > max) next = 0;
        return next;
      });
    };
  }

  function handleWheel(fn) {
    return (e) => {
      e.deltaY > 0 ? fn(1) : fn(-1);
    };
  }

  function handleTouchStart(e) {
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(fn) {
    return (e) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (diff > 25) fn(1);
      if (diff < -25) fn(-1);
    };
  }

  function calculateReturnTime() {
    const lunchMinutes = lunchOptions[lunchIndex].value;
    const totalMinutes = hour * 60 + minute + lunchMinutes;

    const retHour = Math.floor((totalMinutes / 60) % 24);
    const retMinute = totalMinutes % 60;

    setReturnTime(
      `${String(retHour).padStart(2, '0')}:${String(retMinute).padStart(
        2,
        '0'
      )}`
    );
    setShowResult(true);
  }

  return (
    <div className="App">
      <img src={logo} alt="Outback" className="logo" />

      <h1>Calcule o tempo do seu intervalo</h1>

      <div className="container_clocker">
        <label>Hora de saída</label>

        <div className="field time-row">
          {/* Hora */}
          <div
            className="wheel-container"
            onWheel={handleWheel(changeValue(setHour, 23))}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd(changeValue(setHour, 23))}
          >
            <div className="wheel">
              {[hour - 1, hour, hour + 1].map((h, i) => (
                <div
                  key={i}
                  className={`wheel-item ${i === 1 ? 'active' : ''}`}
                >
                  {String((h + 24) % 24).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>

          <span className="colon">:</span>

          {/* Minuto */}
          <div
            className="wheel-container"
            onWheel={handleWheel(changeValue(setMinute, 59))}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd(changeValue(setMinute, 59))}
          >
            <div className="wheel">
              {[minute - 1, minute, minute + 1].map((m, i) => (
                <div
                  key={i}
                  className={`wheel-item ${i === 1 ? 'active' : ''}`}
                >
                  {String((m + 60) % 60).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>

        <label>Duração do almoço</label>

        <div className="field">
          <div
            className="wheel-container wide"
            onWheel={handleWheel(
              changeValue(setLunchIndex, lunchOptions.length - 1)
            )}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd(
              changeValue(setLunchIndex, lunchOptions.length - 1)
            )}
          >
            <div className="wheel">
              {[lunchIndex - 1, lunchIndex, lunchIndex + 1].map((i, idx) => {
                const index =
                  (i + lunchOptions.length) % lunchOptions.length;
                return (
                  <div
                    key={idx}
                    className={`wheel-item ${idx === 1 ? 'active' : ''}`}
                  >
                    {lunchOptions[index].label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button className="btn" onClick={calculateReturnTime}>
          Calcular retorno
        </button>

        {showResult && (
          <div className="result">
            <span className="result-label">Você volta às</span>
            <strong className="result-time">{returnTime}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
