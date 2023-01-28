import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../api";
import { ThemeContext } from "../../context";
import { defaultCards } from "../../default-cards.js";
import "./style.css";

export const Card = () => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  return (
    <div className="album">
      <div className="container">
        <div className="row">
          <div className="home-cards-flexbox">
            {defaultCards.map((card) => (
              <div
                className="flex-item-cardExample"
                key={`home_card_${card._id}`}
              >
                <div
                  className={`card cardExample-card card-background-${theme}`}
                >
                  <img
                    className="card-img-top cards-image"
                    src={`${serverUrl}/${card.imageUrl}`}
                    alt="Card image cap"
                    onClick={() => navigate(`/card-info/${card._id}`)}
                  />
                  <div className="card-body cardExample-body">
                    <h4 className="card-text">{card.name}</h4>
                    <p>{card.type}</p>
                    <p>{card.phone}</p>
                    <p>{card.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
