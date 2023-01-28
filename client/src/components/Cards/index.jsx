import { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Api, serverUrl } from "../../api";
import { ThemeContext } from "../../context";
import { CardForm } from "./CardForm";
import "./style.css";

export const Cards = (props) => {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const theme = useContext(ThemeContext);

  const setupCards = async () => {
    setPageLoading(true);
    let newCards;
    if (props.userId) {
      try {
        newCards = await Api.getCards({ userId: props.userId });
      } catch {
        newCards = [];
      }
      setCards(newCards);
    }
    setPageLoading(false);
  };

  useEffect(() => {
    setupCards();
  }, [props.userId]);

  const onClose = (e) => {
    e && e.preventDefault();
    setIsFormOpen(false);
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

  const editCard = async (e, { card }) => {
    setIsEdit(true);
    setIsFormOpen(true);
    setSelectedCard(card);
  };

  const deleteCard = async (e, { card }) => {
    try {
      const cardID = card._id;
      await Api.deleteCard(cardID);
      setupCards();
      toast("Card deleted successfully!", { type: "success" });
    } catch (e) {
      toast("Card erase didn't succeed", { type: "error" });
    }
  };
  return (
    <main role="main">
      {!!pageLoading && (
        <div className="page-spinner-wrapper">
          <div className="page-spinner-border spinner-border" role="status" />
        </div>
      )}
      <div className="my-cards-header">
        <br />
        <h1>My Cards Gallery</h1>
        <h2 className="lead">
          Here are the cards you made! you can add a new one
        </h2>
        <br />
        <button
          type="button"
          className="btn btn-primary modal-btn my-cards-add-button"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={() => setIsFormOpen(true)}
        >
          Add Card
        </button>
        <div
          className={`modal fade ${isFormOpen && "modal-visible show"}`}
          id="exampleModalCenter"
          tabIndex="100"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {isEdit ? "Edit card" : "Add new card"}
                </h5>
              </div>
              <div className="modal-body">
                <CardForm
                  setupCards={setupCards}
                  onClose={onClose}
                  isEdit={isEdit}
                  card={selectedCard}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {!!cards.length && (
        <div className="container">
          <div className="my-cards-gallery">
            {cards.map((card) => (
              <div className="flex-item" key={`gallery_card_${card._id}`}>
                <div className="card my-cards-card">
                  <img
                    className="card-img-top cards-image"
                    src={`${serverUrl}/${card.imageUrl}`}
                    onClick={() => navigate(`/card-info/${card._id}`)}
                  />
                  <div className={`card-body card-background-${theme}`}>
                    <h4 className="card-title">{card.name}</h4>
                    <p>{card.type}</p>
                    <p>{card.phone}</p>
                    <p>{card.address}</p>
                    <div className="flex">
                      {!!props.cardLikes?.length && (
                        <i
                          className={`fa fa-heart my-cards-like ${
                            props.cardLikes.indexOf(card._id) !== -1 &&
                            "likedCard"
                          }`}
                          onClick={(e) => {
                            likeCard(e, { card });
                          }}
                        ></i>
                      )}
                      {!props.cardLikes?.length && (
                        <i
                          className={`fa fa-heart my-cards-like`}
                          onClick={(e) => {
                            likeCard(e, { card });
                          }}
                        ></i>
                      )}
                      <i
                        className="fa fa-edit my-cards-edit"
                        onClick={(e) => {
                          editCard(e, { card });
                        }}
                      ></i>
                      <i
                        className="fa fa-trash my-cards-delete"
                        onClick={(e) => {
                          deleteCard(e, { card });
                        }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!cards.length && (
        <div className="favorites-noCards">
          <h2>you don't have cards yet, add a new one!</h2>
        </div>
      )}
    </main>
  );
};
