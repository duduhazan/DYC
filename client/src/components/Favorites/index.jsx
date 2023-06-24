import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Api, serverUrl } from "../../api";
import { ThemeContext } from "../../context";
import "./style.css";

export const Favorites = (props) => {
  const [loading, setLoading] = useState(false);
  const [rotatedCard, setRotatedCard] = useState();
  const [pageLoading, setPageLoading] = useState(false);
  const theme = useContext(ThemeContext);
  const [cards, setCards] = useState([]);
  const inputRef = useRef();

  const favSearch = async () => {
    setLoading(true);
    let input = inputRef.current.value.toLowerCase();
    if (props.cardLikes?.length) {
      const newCards = await Api.getCards({ ids: props.cardLikes });
      let filteredCards = newCards.filter((card) => {
        const cardName = card.name.toLowerCase();
        return cardName.indexOf(input) > -1;
      });
      if (filteredCards.length) {
        setCards(filteredCards);
      } else {
        setCards([1]);
      }
    }
    setLoading(false);
  };

  const setupCards = async () => {
    setPageLoading(true);
    if (props.cardLikes?.length) {
      const newCards = await Api.getCards({ ids: props.cardLikes });
      setCards(newCards);
    } else {
      setCards([]);
    }
    setPageLoading(false);
  };

  useEffect(() => {
    setupCards();
  }, [props.cardLikes]);

  const likeCard = async (e, { card }) => {
    try {
      const cardId = card._id;
      const user = await Api.likeCard(cardId);
      props.onUserUpdate(user);
      if (props.cardLikes.indexOf(cardId) == -1) {
        toast("Card liked successfully!", { type: "success" });
      } else {
        toast("Card unliked successfully!", { type: "success" });
      }
    } catch (e) {
      console.log(e);
      toast("Card like didn't succeed", { type: "error" });
    }
  };

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
          <h1 className="jumbotron-heading">Favorites</h1>
          <h2 className="lead">
            Here are your favorite cards! you can search a specific card by it's
            name
          </h2>
          <br />
        </div>
      </section>

      <div className="album search-favorites">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="enter card name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            ref={inputRef}
          />
          <div className="input-group-append">
            {!!loading && (
              <button
                className="btn btn-outline-secondary"
                type="submit"
                disabled
                onClick={favSearch}
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Search
              </button>
            )}
            {!loading && (
              <button
                className="btn btn-outline-secondary"
                type="submit"
                onClick={favSearch}
              >
                Search
              </button>
            )}
          </div>
        </div>
      </div>

      {!!cards.length && (
        <div className="container favorites-container">
          <div className="favorites-flexbox">
            {cards[0] != 1 &&
              cards.map((card) => (
                <section
                  className={`flex-item ${
                    rotatedCard == card ? "flippable-card" : ""
                  } ${rotatedCard == card._id ? "finish-rotate" : ""}`}
                  key={`favorite_card_${card._id}`}
                >
                  <div
                    className={`card card-favorite card-front-side card-background-${theme}`}
                  >
                    <img
                      className="card-img-top cards-image"
                      src={card.imageUrl}
                      onClick={() => setRotatedCard(card)}
                    />
                    <div className={`card-body`}>
                      <h4 className="card-title">{card.name}</h4>
                      <p>{card.type}</p>
                      <p>{card.phone}</p>
                      <p>{card.address}</p>
                      {!props.cardLikes?.length && (
                        <i
                          className={`fa fa-heart favorite-like`}
                          onClick={(e) => {
                            likeCard(e, { card });
                          }}
                        ></i>
                      )}
                      {!!props.cardLikes?.length && (
                        <i
                          className={`fa fa-heart favorite-like ${
                            props.cardLikes.indexOf(card._id) !== -1 &&
                            "likedCard"
                          }`}
                          onClick={(e) => {
                            likeCard(e, { card });
                          }}
                        ></i>
                      )}
                    </div>
                  </div>
                  <div
                    className={`card my-cards-card card-background-${theme} card-back-side`}
                    onClick={() => setRotatedCard(card._id)}
                  >
                    <div className="card-back-side-description">
                      <p>{card.description}</p>
                    </div>
                  </div>
                </section>
              ))}
          </div>
        </div>
      )}
      {!cards.length && (
        <div className="favorites-noCards">
          <h2>you haven't liked a card yet!</h2>
        </div>
      )}
      {cards[0] == 1 && (
        <div className="favorites-noCards">
          <h2>
            we haven't found a card with the search result did you try to search
            it by name?
          </h2>
        </div>
      )}
    </main>
  );
};
