import React from 'react';
import './ThemeSwitch.css'

const ThemeSwitch = () => {

  const [theme, setTheme] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme"));
    if (savedTheme) {
      document.documentElement.classList.add('dark');
      setTheme(true);
    } else {
      document.documentElement.classList.remove('dark');
      setTheme(false);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (ref.current.checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", JSON.stringify(true));
      setTheme(true);
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", JSON.stringify(false));
      setTheme(false);
    }
  };

  return (
    <label className="switch">
      <input id="input" type="checkbox" ref={ref} checked={theme} onChange={toggleTheme} />
      <div className="slider round">
        <div className="sun-moon">
          <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="light-ray-1" className="light-ray" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="light-ray-2" className="light-ray" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="light-ray-3" className="light-ray" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>

          <svg id="cloud-1" className="cloud-dark" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
          <svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50"></circle>
          </svg>
        </div>
        <div className="stars">
          <svg id="star-1" className="star" viewBox="0 0 20 20">
            <path
              d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
            ></path>
          </svg>
          <svg id="star-2" className="star" viewBox="0 0 20 20">
            <path
              d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
            ></path>
          </svg>
          <svg id="star-3" className="star" viewBox="0 0 20 20">
            <path
              d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
            ></path>
          </svg>
          <svg id="star-4" className="star" viewBox="0 0 20 20">
            <path
              d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
            ></path>
          </svg>
        </div>
      </div>
    </label>

  )

}



export default ThemeSwitch;