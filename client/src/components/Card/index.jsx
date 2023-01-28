import { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api, serverUrl } from "../../api";
import { ThemeContext } from "../../context";
import "./style.css";

export const Card = () => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(false);
  const theme = useContext(ThemeContext);
  const [homeCards, setHomeCards] = useState([]);

  const setupCards = async () => {
    setPageLoading(true);
    const cards = await Api.getSampleCards();
    let newCards = [];
    for (let i = 0; i < 6; i++) {
      newCards.push(cards[i]);
    }
    setHomeCards(newCards);
    setPageLoading(false);
  };

  useEffect(() => {
    setupCards();
  }, []);
  return (
    <div className="album">
      {!!pageLoading && (
        <div className="page-spinner-wrapper">
          <div className="page-spinner-border spinner-border" role="status" />
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="home-cards-flexbox">
            {homeCards.map((card) => (
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
