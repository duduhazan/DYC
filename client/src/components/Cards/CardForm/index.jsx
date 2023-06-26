import { useState } from "react";
import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "../../../api";
import "./style.css";

export const CardForm = (props) => {
  const [loading, setLoading] = useState(false);
  const name = useRef();
  const type = useRef();
  const address = useRef();
  const phone = useRef();
  const image = useRef();
  const description = useRef();

  useEffect(() => {
    const { isEdit, card } = props;
    image.current.value = "";
    if (!isEdit) {
      name.current.value = "";
      type.current.value = "";
      address.current.value = "";
      phone.current.value = "";
      description.current.value = "";
      return;
    }
    name.current.value = card.name;
    type.current.value = card.type;
    address.current.value = card.address;
    phone.current.value = card.phone;
    description.current.value = card.description;
  }, [props.isEdit]);

  const addOrEditCard = async (event) => {
    event.preventDefault();

    if (!image.current.files.length) {
      toast("Image not selected", { type: "error" });
      return;
    }

    if (description.current.value?.length > 255) {
      toast("Description need to be less than 255 characters", {
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("type", type.current.value);
    formData.append("address", address.current.value);
    formData.append("phone", phone.current.value);
    formData.append("description", description.current.value);
    formData.append("imageName", image.current.files[0].name);
    formData.append("image", image.current.files[0]);

    setLoading(true);
    try {
      props.isEdit
        ? await Api.updateCard(props.card._id, formData)
        : await Api.addCard(formData);
      props.setupCards();
      toast(`Card ${props.isEdit ? "edited" : "added"} successfully!`, {
        type: "success",
      });
      props.onClose();
    } catch (e) {
      console.error(e.message);
      toast(`Could not ${props.isEdit ? "edit" : "add"} card!`, {
        type: "error",
      });
    }
    props.setIsEdit(false);
    setLoading(false);
  };

  return (
    <div className="card-form-container">
      <form className="card-form">
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">business Name: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Biz Name 1"
            ref={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput2">business type: </label>
          <input
            type="text"
            className="form-control"
            placeholder="fast food"
            ref={type}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput3">business address: </label>
          <input
            type="text"
            className="form-control"
            placeholder="zabotinski 32 Tel Aviv"
            ref={address}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput4">business phone: </label>
          <input
            type="phone"
            className="form-control"
            placeholder="05X-XXX-XXXX"
            ref={phone}
          />
        </div>
        <div className="mb-3 form-group">
          <label className="form-label">business image: </label>
          <input
            className="form-control form-control-file"
            type="file"
            ref={image}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">
            business description:{" "}
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            ref={description}
          ></textarea>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={props.onClose}>
            Close
          </button>
          {!!loading && (
            <button
              className="btn btn-primary"
              type="submit"
              disabled
              onClick={addOrEditCard}
            >
              <span
                className="spinner-border spinner-border-sm spinner-form"
                role="status"
                aria-hidden="true"
              ></span>
              Submit
            </button>
          )}
          {!loading && (
            <button
              className="btn btn-primary"
              type="submit"
              onClick={addOrEditCard}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
