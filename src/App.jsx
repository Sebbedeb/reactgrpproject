import "./styles/App.css";
import CardList from "./components/CardList";
import CardForm from "./components/CardForm";
import { useEffect, useState } from "react";
import { fetchData } from "./util/persistence";

const blankCard = { id: null, name: "", amount: null, rarity: "", price: null };

function App() {
  const [cards, setCards] = useState([]);
  const [cardToEdit, setCardToEdit] = useState(blankCard);
  const [currentCard, setCurrentCard] = useState(blankCard);

  const [currentFunds, setCurrentFunds] = useState(1000);

  const APIURL = "http://localhost:3000/api";

  function editCard(card) {
    setCardToEdit(card);
  }

  function mutateCard(card) {
    if (card.id !== "") {
      //PUT
      updateCard(card);
    } else {
      createCard(card);
    }
  }

  function getCardById(cardId) {
    // fetch data
    fetchData(`${APIURL}/${cardId}`, (data) => setCurrentCard(data), "GET");
  }

  function updateCard(card) {
    // Update on the server/API side
    fetchData(
      `${APIURL}/${card.id}`,
      (updatedCard) => {
        // Update on the client side
        setCards((prevCards) =>
          prevCards.map((c) => (c.id === updatedCard.id ? updatedCard : c))
        );
      },
      "PUT",
      card
    );
  }

  function createCard(card) {
    fetchData(
      //URL, callback, method, body
      APIURL, //URL
      (card) => setCards([...cards, card]), //Callback
      "POST", //Method
      card //Body
    );
  }

  function getCards(callback) {
    // fetch data
    fetchData(APIURL, callback);
  }

  function deleteCardById(cardId) {
    // delete card from api
    fetchData(`${APIURL}/${cardId}`, () => {}, "DELETE");

    // delete from cards array via setCards()
    setCards([...cards.filter((card) => card.id !== cardId)]);
  }

  function buyCard(cardId) {
    // Increase card amount by 1 and reduce funds by card price
    console.log("Before state update:", currentCard, currentFunds);
    getCardById(cardId);
    if (currentCard.price <= currentFunds) {
      currentCard.amount++;
      updateCard(currentCard);
      setCurrentFunds((prevFunds) => prevFunds - currentCard.price);
    } else {
      alert("Insufficient funds");
    }
    console.log("After state update:", currentCard, currentFunds);
  }


  function sellCard(cardId) {
    // Decrease card amount by 1 and increase funds by card price
    getCardById(cardId);
  
    if (currentCard.amount > 0) {
      currentCard.amount--;
  
      setCurrentFunds((prevFunds) => prevFunds + currentCard.price);
      updateCard(currentCard);
    } else {
      alert("No cards available to sell");
    }
  }


  useEffect(() => {
    // get all cards from api
    getCards((data) => setCards(data));
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
        <div className="col-8">
        <CardList
          cards={cards}
          deleteCardById={deleteCardById}
          editCard={editCard}
          buyCard={buyCard}
          sellCard={sellCard}
        />
      </div>
        <div className="col-4">
        <h1>CardShack</h1>
        <h2>Inventory Manager</h2>
        <h3>Current Funds: {currentFunds}</h3>
        <CardForm
          blankCard={blankCard}
          cardToEdit={cardToEdit}
          mutateCard={mutateCard}
        />
        </div>
       
      </div>
      </div>
    </>
  );
}

export default App;