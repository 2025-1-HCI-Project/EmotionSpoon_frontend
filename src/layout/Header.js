import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const headerStyle = `
  .header {
    position: absolute;
    top: 10;
    left: 0;
    width: 100%;
    padding: 20px;
    z-index: 1000;
    background-color: transparent;
    display: flex;
    justify-content: center;
  }

  .header-inner {
    width: 100%;
    max-width: 1200px;
    display: flex;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .logo {
    font-weight: bold;
    font-size: 1.5rem;
    text-decoration: none;
    color: white;
    white-space: nowrap;
  }

  .search-box {
    flex: 1 1 200px;
    max-width: 350px;
    background-color: rgba(255,255,255,0.2);
    border-radius: 30px;
    padding: 8px 16px;
    color: white;
    border: none;
    outline: none;
  }

  .menu {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .menu a {
    color: white;
    text-decoration: none;
    font-weight: 500;
  }

  .menu a.active {
    color: #ff4d6d;
  }

  .register-btn {
    background-color: #ff4d6d;
    color: white;
    border: none;
    padding: 7px 30px;
    border-radius: 30px;
    font-weight: bold;
    text-decoration: none;
    white-space: nowrap;
    margin-left: 50px;
  }
    
  .menu-button {
  background: none;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  text-decoration: none;
}

.menu-button:hover {
  color: #ff4d6d;
}

.menu-button.active {
  color: #FA2870;
}

  @media (max-width: 768px) {
    .header-inner {
      flex-direction: column;
      align-items: flex-start;
    }

    .search-box {
      width: 100%;
    }

    .menu {
      width: 100%;
      justify-content: flex-start;
    }
  }
`;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("username");
    setUsername(null);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            EMOTION SPOON 🎧
          </Link>

          <input className="search-box" type="text" placeholder="Search" />

          <div className="menu">
            <Link to="/" className={currentPath === "/" ? "active" : ""}>
              Home
            </Link>
            <Link
              to="/diary"
              className={currentPath === "/diary" ? "active" : ""}
            >
              Diary
            </Link>
            <Link
              to="/calendar"
              className={currentPath === "/calendar" ? "active" : ""}
            >
              Calendar
            </Link>

            {username ? (
              <>
                <span style={{ color: "white", fontWeight: "bold" }}>
                  {username}님
                </span>
                <button
                  onClick={handleLogout}
                  className={`menu-button ${
                    currentPath === "/logout" ? "active" : ""
                  }`}
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`register-btn ${
                  currentPath === "/login" ? "active" : ""
                }`}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>

      <style>{headerStyle}</style>
    </>
  );
};

export default Header;
