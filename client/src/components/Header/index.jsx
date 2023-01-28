import "./style.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";

export const Header = (props) => {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-container">
      <div className="navbar-layout">
        <div className="left-navbar">
          <img
            src={logo}
            alt="Dyc logo"
            className="navbar-image"
            onClick={props.onThemeChange}
          />
          <a
            className="nav-item nav-link active nav-item-1"
            onClick={() => onNavigate("/")}
          >
            Home
          </a>
          <a
            className="nav-item nav-link active nav-item-1"
            onClick={() => onNavigate("/about")}
          >
            About
          </a>
          {!!props.user && (
            <a
              className="nav-item nav-link active nav-item-1"
              onClick={() => onNavigate("/gallery")}
            >
              Gallery
            </a>
          )}
        </div>
        {!props.user && (
          <div className="d-flex right-navbar">
            <a
              className="nav-item nav-link nav-item-1"
              onClick={() => onNavigate("/regular")}
            >
              Regular
            </a>
            <a
              className="nav-item nav-link nav-item-1"
              onClick={() => onNavigate("/business")}
            >
              Business
            </a>
          </div>
        )}
        {!!props.user && (
          <div className="d-flex right-navbar">
            {props.user.isBusiness && (
              <a
                className="nav-item nav-link nav-item-1"
                onClick={() => onNavigate("/my-cards")}
              >
                My Cards
              </a>
            )}
            <a
              className="nav-item nav-link nav-item-1"
              onClick={() => onNavigate("/favorites")}
            >
              My Favorite Cards
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
