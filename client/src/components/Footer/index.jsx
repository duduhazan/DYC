import { useNavigate } from "react-router-dom";
import "./style.css";

export const Footer = (props) => {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Dudu<span>Hazan</span>
        </h3>

        <p className="footer-links">
          <a onClick={() => onNavigate("/")}>Home</a>
          <span> | </span>
          <a onClick={() => onNavigate("/about")}>About</a>
          <span> | </span>
          {!!props.user && (
            <span>
              <a onClick={() => onNavigate("/gallery")}>Gallery</a>
              <span> | </span>
            </span>
          )}
          {!props.user && (
            <>
              <a onClick={() => onNavigate("/regular")}>Regular</a>
              <span> | </span>
              <a onClick={() => onNavigate("/business?type=buisness")}>
                Business
              </a>
            </>
          )}
          {!!props.user && (
            <span>
              {props.user.isBusiness && (
                <>
                  <a onClick={() => onNavigate("/my-cards")}>My Cards</a>
                  <span> | </span>
                </>
              )}
              <a onClick={() => onNavigate("/favorites")}>My Favorite Cards</a>
            </span>
          )}
        </p>

        <p className="footer-company-name">© 2022 Dudu Hazan</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>Tel Hai 22 Ra'anana // Israel</p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>
            <a href="tel:+972-528197590">+972-528197590</a>
          </p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a
              href="https://mail.google.com/mail/u/duduhazan123@gmail.com/#all/YOUR_EMAIL_ID"
              target="_blank"
            >
              duduhazan123@gmail.com
            </a>
          </p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About me</span>
          skilled Web Programmer, HackerU graduate
        </p>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div className="footer-icons">
          <a href="https://www.facebook.com/dudu.hazan.54/" target="_blank">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/dudu_hazan" target="_blank">
            <i className="fa fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/dudu-hazan-0a0282247/"
            target="_blank"
          >
            <i className="fa fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
