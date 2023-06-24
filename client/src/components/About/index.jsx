import { useContext, useEffect, useState } from "react";
import { serverUrl } from "../../api";
import { ThemeContext } from "../../context";
import { defaultCards } from "../../default-cards";
import "./style.css";

export const About = () => {
  const theme = useContext(ThemeContext);
  const [rotatedCard, setRotatedCard] = useState();
  const [card, setCard] = useState({});

  const setupCard = async () => {
    const cards = defaultCards;
    const newCard = cards[Math.floor(Math.random() * cards.length)];
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
          <h1 className="jumbotron-heading">About</h1>
          <h2 className="lead">
            Here you can learn about how to use this site!
          </h2>
        </div>
      </section>

      <div className="album">
        <div className="about-container">
          <div className="about-content">
            <div className="about-description">
              <h4>Creating/logging account</h4>
              <p>
                Simply click on the sign-up or business(for business account),
                fill the form and you`re good to go
              </p>
              <h4>Regular Vs. Business account</h4>
              <p>With business account you can create new cards</p>
              <h4>Creating a card - business only</h4>
              <p>
                On the "My Cards" page you can add cards - be sure to put all
                the info in for the best card!
              </p>
              <h4>Favorites cards</h4>
              <p>
                In this page you will be able to see all the cards you`ve liked!
              </p>
              <h4>Cool features</h4>
              <p>1. Click on the logo to change the cards color!</p>
              <p>2. Click on card image to see the business description</p>
            </div>

            <section
              className={`flex-item-cardAbout ${
                rotatedCard == card ? "flippable-card" : ""
              } ${rotatedCard == card._id ? "finish-rotate" : ""}`}
            >
              <div
                className={`card cardAbout-card card-front-side card-background-${theme}`}
              >
                {!!card?.imageUrl && (
                  <img
                    className="card-img-top about-card-image"
                    src={`${serverUrl}/${card.imageUrl}`}
                    alt="Card image cap"
                    onClick={() => setRotatedCard(card)}
                  />
                )}
                <div className={`card-body`}>
                  <h4 className="card-text">{card.name}</h4>
                  <p>{card.type}</p>
                  <p>{card.phone}</p>
                  <p>{card.address}</p>
                </div>
              </div>
              <div
                className={`card cardAbout-card card-background-${theme} card-back-side`}
                onClick={() => setRotatedCard(card._id)}
              >
                <div className="card-back-side-description">
                  <p>{card.description}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};
