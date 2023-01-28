import { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { Api, serverUrl } from "../../api";
import "./style.css";
import { useWindowSize } from "react-use";
import { chunk } from "lodash";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context";

export const Gallery = (props) => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [groupedCards, setGroupedCards] = useState([]);
  const [cardsLength, setCardsLength] = useState(0);
  const { width } = useWindowSize();

  const cardsInRow = useMemo(() => {
    if (width < 550) {
      return 1;
    }
    if (width < 900) {
      return 2;
    }
    return 3;
  }, [width]);

  const setupCards = async () => {
    setPageLoading(true);
    const cards = await Api.getCards();
    setCardsLength(cards.length);
    const grouped = chunk(cards, cardsInRow);
    setGroupedCards(grouped);
    setPageLoading(false);
  };

  useEffect(() => {
    setupCards();
  }, [cardsInRow]);

  const onPrevClick = () => {
    const newIndex =
      selectedIndex === 0 ? groupedCards.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
  };

  const onNextClick = () => {
    const newIndex =
      selectedIndex === groupedCards.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
  };

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

  if (pageLoading) {
    return (
      <div className="page-spinner-wrapper">
        <div className="page-spinner-border spinner-border" role="status" />
      </div>
    );
  }

  return (
    <section className="pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h3 className="mb-3">{`Cards Gallery(${cardsLength})`}</h3>
          </div>
          <div className="col-6 text-right d-flex justify-content-end">
            <a
              className="btn btn-primary mb-3 mr-1 gallery-btn"
              role="button"
              data-slide="prev"
              onClick={onPrevClick}
            >
              <i className="fa fa-arrow-left"></i>
            </a>
            <a
              className="btn btn-primary mb-3 gallery-btn"
              role="button"
              data-slide="next"
              onClick={onNextClick}
            >
              <i className="fa fa-arrow-right"></i>
            </a>
          </div>
          <div className="col-12">
            <div
              id="carouselExampleIndicators2"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                {!!groupedCards.length &&
                  groupedCards.map((gc, i) => (
                    <div
                      key={`grouped_gallery_cards_${i}`}
                      className={`carousel-item ${
                        i === selectedIndex ? "active" : ""
                      }`}
                    >
                      <div className="row">
                        <div className="col-md-4 mb-3 d-flex justify-content-around cards-group">
                          {gc.map((card) => (
                            <div
                              key={`gallery_card_${card._id}`}
                              className={`card ${
                                cardsInRow === 3
                                  ? "gallery-card"
                                  : cardsInRow === 2
                                  ? "w-50 m-2"
                                  : "w-100"
                              }`}
                            >
                              <img
                                className="card-img-top cards-image "
                                src={`${serverUrl}/${card.imageUrl}`}
                                onClick={() =>
                                  navigate(`/card-info/${card._id}`)
                                }
                              />
                              <div
                                className={`card-body card-background-${theme}`}
                              >
                                <h4 className="card-title">{card.name}</h4>
                                <p>{card.type}</p>
                                <p>{card.phone}</p>
                                <p>{card.address}</p>
                                {!props.cardLikes?.length && (
                                  <i
                                    className={`fa fa-heart gallery-like`}
                                    onClick={(e) => {
                                      likeCard(e, { card });
                                    }}
                                  ></i>
                                )}
                                {!!props.cardLikes?.length && (
                                  <i
                                    className={`fa fa-heart gallery-like ${
                                      props.cardLikes.indexOf(card._id) !==
                                        -1 && "likedCard"
                                    }`}
                                    onClick={(e) => {
                                      likeCard(e, { card });
                                    }}
                                  ></i>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
