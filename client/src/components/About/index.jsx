import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api, serverUrl } from "../../api";
import { ThemeContext } from "../../context";
import "./style.css";

export const About = () => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(false);
  const theme = useContext(ThemeContext)
  const [card, setCard] = useState({});

  const setupCard = async () => {
    setPageLoading(true);
    const cards = await Api.getSampleCards();
    const newCard = cards[Math.floor(Math.random() * cards.length)];
    setCard(newCard);
    setPageLoading(false);
  };

  useEffect(() => {
    setupCard();
  }, []);

  return (
    <main role="main">
      {!!pageLoading && (
        <div className="page-spinner-wrapper">
          <div className="page-spinner-border spinner-border" role="status" />
        </div>
      )}
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
              <h2>Creating/logging account</h2>
              <p>
                simply click on the sign-up or business(for business account),
                fill the form and you`re good to go
              </p>
              <h2>Creating a card - business only</h2>
              <p>
                on the "My Cards" page you can add cards - be sure to put all
                the info in for the best card!
              </p>
              <h2>Favorites cards</h2>
              <p>
                in this page you will be able to see all the cards you`ve liked!
              </p>
              <h2>The difference between a regular account to business</h2>
              <p>with business account you can create new cards</p>
            </div>

            <div className="flex-item-cardAbout">
              <div className="card cardAbout-card">
                {
                  <img
                    className="card-img-top about-card-image"
                    src={`${serverUrl}/${card.imageUrl}`}
                    alt="Card image cap"
                    onClick={() => navigate(`/card-info/${card._id}`)}
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
