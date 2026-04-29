import { useState, useRef, useEffect } from "react";
import logo from "./images/outback_logo.png";
import "./App.css";

let hapticEnabled = false;

function haptic(pattern = 10) {
  if (hapticEnabled && navigator.vibrate) navigator.vibrate(pattern);
}

function notifySystem(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

function loadStoredTime() {
  try {
    const data = JSON.parse(localStorage.getItem("lunch_time"));
    if (!data) return { hour: 12, minute: 0, lunchIndex: 0 };
    return data;
  } catch {
    return { hour: 12, minute: 0, lunchIndex: 0 };
  }
}

export default function App() {
  const stored = loadStoredTime();

  const [hour, setHour] = useState(stored.hour);
  const [minute, setMinute] = useState(stored.minute);
  const [lunchIndex, setLunchIndex] = useState(stored.lunchIndex);
  const [returnTime, setReturnTime] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const lunchOptions = [
    { label: "00:35", value: 35 },
    { label: "01:05", value: 65 },
    { label: "02:05", value: 125 },
  ];

  const lastY = useRef(null);
  const alertTimeout = useRef(null);

  // 👉 Controle de notificação ao sair da aba
  const hasReturnTime = useRef(false);
  const notifiedLeaving = useRef(false);

  useEffect(() => {
    localStorage.setItem(
      "lunch_time",
      JSON.stringify({ hour, minute, lunchIndex })
    );
  }, [hour, minute, lunchIndex]);

  useEffect(() => {
    let meta = document.querySelector("meta[name='theme-color']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = "#75000a";
  }, []);

  // ✅ Notificação quando o usuário sai da aba
  useEffect(() => {
    function handleVisibilityChange() {
      if (
        document.hidden &&
        hasReturnTime.current &&
        !notifiedLeaving.current
      ) {
        notifySystem(
          "⏰ Lembrete de almoço",
          "Você já calculou o horário de retorno. Avisaremos faltando 5 minutos."
        );
        notifiedLeaving.current = true;
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  function changeValue(setter, max, delta) {
    setter((prev) => {
      let next = prev + delta;
      if (next < 0) next = max;
      if (next > max) next = 0;
      haptic(10);
      return next;
    });
  }

  function changeLunch(delta) {
    setLunchIndex((prev) => {
      let next = prev + delta;
      if (next < 0) next = lunchOptions.length - 1;
      if (next >= lunchOptions.length) next = 0;
      haptic(10);
      return next;
    });
  }

  function handleWheel(fn) {
    return (e) => fn(e.deltaY > 0 ? 1 : -1);
  }

  function handleTouchStart(e) {
    lastY.current = e.touches[0].clientY;
  }

  function handleTouchMove(fn) {
    return (e) => {
      if (lastY.current === null) return;
      const current = e.touches[0].clientY;
      const diff = lastY.current - current;
      if (Math.abs(diff) >= 12) {
        fn(diff > 0 ? 1 : -1);
        lastY.current = current;
      }
    };
  }

  function handleTouchEnd() {
    lastY.current = null;
  }

  function calculateReturnTime() {
    const lunchMinutes = lunchOptions[lunchIndex].value;
    const totalMinutes = hour * 60 + minute + lunchMinutes;

    const retHour = Math.floor((totalMinutes / 60) % 24);
    const retMinute = totalMinutes % 60;

    setReturnTime(
      `${String(retHour).padStart(2, "0")}:${String(retMinute).padStart(
        2,
        "0"
      )}`
    );

    setShowResult(true);
    hasReturnTime.current = true;
    notifiedLeaving.current = false;

    if (alertTimeout.current) clearTimeout(alertTimeout.current);

    const now = new Date();
    const returnDate = new Date();
    returnDate.setHours(retHour, retMinute, 0, 0);

    const delay =
      returnDate.getTime() - 5 * 60 * 1000 - now.getTime();

    if (delay > 0) {
      alertTimeout.current = setTimeout(() => {
        haptic([400, 150, 400, 150, 600]);
        notifySystem(
          "⏰ Hora de voltar!",
          "Faltam 5 minutos para retornar do almoço."
        );
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 10000);
      }, delay);
    }
  }

  function enableFeatures() {
    hapticEnabled = true;
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    setShowIntro(false);
  }

  return (
    <div className="App">
      <img src={logo} alt="Outback" className="logo" />

      <h1>Calcule o tempo do seu intervalo</h1>

      <div className="container_clocker">
        <label>Hora de saída</label>

        <div className="field time-row">
          <div
            className="wheel-container"
            onWheel={handleWheel((d) => changeValue(setHour, 23, d))}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove((d) => changeValue(setHour, 23, d))}
            onTouchEnd={handleTouchEnd}
          >
            <div className="wheel">
              <div
                className="wheel-item"
                onClick={() => changeValue(setHour, 23, -1)}
              >
                {String((hour + 23) % 24).padStart(2, "0")}
              </div>
              <div className="wheel-item active">
                {String(hour).padStart(2, "0")}
              </div>
              <div
                className="wheel-item"
                onClick={() => changeValue(setHour, 23, 1)}
              >
                {String((hour + 1) % 24).padStart(2, "0")}
              </div>
            </div>
          </div>

          <span className="colon">:</span>

          <div
            className="wheel-container"
            onWheel={handleWheel((d) => changeValue(setMinute, 59, d))}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove((d) => changeValue(setMinute, 59, d))}
            onTouchEnd={handleTouchEnd}
          >
            <div className="wheel">
              <div
                className="wheel-item"
                onClick={() => changeValue(setMinute, 59, -1)}
              >
                {String((minute + 59) % 60).padStart(2, "0")}
              </div>
              <div className="wheel-item active">
                {String(minute).padStart(2, "0")}
              </div>
              <div
                className="wheel-item"
                onClick={() => changeValue(setMinute, 59, 1)}
              >
                {String((minute + 1) % 60).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        <label>Duração do almoço</label>

        <div
          className="field"
          onWheel={(e) => changeLunch(e.deltaY > 0 ? 1 : -1)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove(changeLunch)}
          onTouchEnd={handleTouchEnd}
        >
          <div className="wheel-container wide">
            <div className="wheel">
              <div className="wheel-item" onClick={() => changeLunch(-1)}>
                {lunchOptions[(lunchIndex + 2) % 3].label}
              </div>
              <div className="wheel-item active">
                {lunchOptions[lunchIndex].label}
              </div>
              <div className="wheel-item" onClick={() => changeLunch(1)}>
                {lunchOptions[(lunchIndex + 1) % 3].label}
              </div>
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

      {showAlert && (
        <div className="visual-alert">
          ⏰ Faltam 5 minutos para retornar do almoço
        </div>
      )}

      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-box">
            <h2>👋 Hello Mate</h2>
            <p>
              Este site não possui fins lucrativos e foi criado apenas para ajudar
              colaboradores a lembrarem o horário de retorno do almoço.
            </p>
            <button className="btn" onClick={enableFeatures}>
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}