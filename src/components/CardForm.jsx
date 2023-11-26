import { useState, useEffect } from "react";

function CardForm({ blankCard, cardToEdit, mutateCard }) {
  const [card, setCard] = useState({ ...cardToEdit });

  useEffect(() => {
    setCard(cardToEdit);
  }, [cardToEdit]);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.id;
    setCard({ ...card, [name]: value });
  }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("submit", card)
        mutateCard(card)
    }

  return (
    <div>
      <h1>Add/Edit Card</h1>
      <form className="cardform" onSubmit={handleSubmit}>
        <div className="formcontent">
        <label className="formlabel" htmlFor="id">Id</label>
        <input className="forminput"
          id="id"
          type="number"
          readOnly
          placeholder="id"
          value={card.id}
        /></div>
        <div className="formcontent">
        <label className="formlabel" htmlFor="name">Name</label>
        <input className="forminput"
          id="name"
          type="text"
          placeholder="name"
          value={card.name}
          onChange={handleChange}
        /></div>
        <div className="formcontent">
        <label className="formlabel" htmlFor="amount">Amount</label>
        <input className="forminput"
          id="amount"
          type="number"
          min="1"
          max="120"
          placeholder="amount"
          value={card.amount}
          onChange={handleChange}
        /></div>
        <div className="formcontent">
        <label className="formlabel" htmlFor="rarity">Rarity</label>
        <input className="forminput"
          id="rarity"
          type="text"
          placeholder="rarity"
          value={card.rarity}
          onChange={handleChange}
        /></div>
        <div className="formcontent">
        <label className="formlabel" htmlFor="price">Price</label>
        <input className="forminput"
          id="price"
          type="float"
          min="0"
          placeholder="price"
          value={card.price}
          onChange={handleChange}
        /></div>
        <button className="btn btn-primary">Submit</button>
        <button
          className="btn btn-danger"
          onClick={() => setCard(blankCard)}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default CardForm;