import { useContext, useState } from "react";
import { serverUrl } from "../../api";
import { ThemeContext } from "../../context";
import { defaultCards } from "../../default-cards.js";
import "./style.css";

export const Card = () => {
  const [rotatedCard, setRotatedCard] = useState();
  const theme = useContext(ThemeContext);

  const finishRotateCard = (cardId) => {
    setRotatedCard(cardId);
    setTimeout(() => setRotatedCard(), 2000);
  }

  return (
    <div className="album">
      <div className="container">
        <div className="row">
          <div className="home-cards-flexbox">
            {defaultCards.map((card) => (
              <div
                className={`flex-item-cardExample`}
                key={`home_card_${card._id}`}
              >
                <section
                  className={`card cardExample-card card-background-${theme} ${
                    rotatedCard == card ? "flippable-card" : ""
                  } ${rotatedCard == card._id ? "finish-rotate" : ""}`}
                >
                  <div className="card-front-side">
                    <img
                      className="card-img-top cards-image"
                      src={`${serverUrl}/${card.imageUrl}`}
                      alt="Card image cap"
                      onClick={() => setRotatedCard(card)}
                    />
                    <div className="card-body cardExample-body">
                      <h4 className="card-text">{card.name}</h4>
                      <p>{card.type}</p>
                      <p>{card.phone}</p>
                      <p>{card.address}</p>
                    </div>
                  </div>
                  <div
                    className={`card cardExample-card card-background-${theme} card-back-side`}
                    onClick={() => finishRotateCard(card._id)}
                  >
                    <div className="card-back-side-description">
                      <p>{card.description}</p>
                    </div>
                  </div>
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
