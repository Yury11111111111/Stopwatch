import { useEffect } from "react";
import { useState } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [minuts, setMinuts] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function funSwitch() {
    setIsActive(!isActive);
  }

  function clear() {
    setSeconds(0);
    setMinuts(0);
    setIsActive(false);
  }

  if (seconds === 60) {
    setSeconds(0);
    setMinuts((minuts) => minuts + 1);
  }

  useEffect(() => {
    let date = Date.now()
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 980);
    } else if (!isActive && seconds !== 0 && minuts !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minuts]);

  return (
    <div className="Stopwatch">
      <div className="title">Секундомер</div>
      <div className="timer">
        {minuts} : {seconds}
      </div>
      <br />
      <button className={`button button_${isActive ? 'active' : 'inactive'}`} onClick={funSwitch}>{isActive ? "Пауза" : "Старт"}</button>
      <button className="clear" onClick={clear}>Очистить</button>
    </div>
  );
};

export default Stopwatch;
