import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api, serverUrl } from "../../../api";
import { ThemeContext } from "../../../context";
import "./style.css";

export const CardInfo = () => {
  const theme = useContext(ThemeContext);
  const [card, setCard] = useState({});
  const { id } = useParams();

  const setupCard = async () => {
    let newCard;
    const cards = await Api.getSampleCards();
    let maybeCard = cards.filter((card) => {
      if (card._id == id) {
        return card;
      }
    });
    if (maybeCard[0]) {
      newCard = maybeCard[0];
    } else {
      newCard = await Api.getOneCard(id);
    }
    setCard(newCard);
  };

  useEffect(() => {
    setupCard();
  }, []);

  return (
    <main role="main">
      <section className="jumbotron text-center">
        <div className="container">
          <br />
          <h1 className="jumbotron-heading">{card.name}</h1>
          <h2 className="lead">{card.type}</h2>
        </div>
      </section>

      <div className="album">
        <div className="about-container">
          <div className="about-content">
            <div className="about-description">
              <h3>card - description :</h3>
              <p>{card.description}</p>
            </div>

            <div className="flex-item-cardAbout">
              <div className="card cardAbout-card">
                {
                  <img
                    className="card-img-top about-card-image"
                    src={`${serverUrl}/${card.imageUrl}`}
                    alt="Card image cap"
                  />
                }
                <div className={`card-body card-background-${theme}`}>
                  <h4 className="card-text">{card.name}</h4>
                  <p>{card.type}</p>
                  <p>{card.phone}</p>
                  <p>{card.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
