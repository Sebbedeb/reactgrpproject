function CardList({ cards, deleteCardById, editCard, sellCard, buyCard }) {
  return (
    <div>
      <h1>List of Cards</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Rarity</th>
            <th>Buy Price</th>
            <th>Sell Price</th>
            <th>Card</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key = {crypto.randomUUID}>
              <td>{card.id}</td>
              <td>{card.name}</td>
              <td>{card.amount}</td>
              <td>{card.rarity}</td>
              <td>{card.price}</td>
              <td>{card.price}</td>
              <td><img src={card.cardimage} alt="" className="cardimg" /></td>
              <td>
               
                <button className="mainbutton" onClick={() => editCard(card)}>Edit</button>
                <button className="mainbutton" onClick={() => deleteCardById(card.id)}>Delete</button>
                <button className="mainbutton" onClick={() => sellCard(card.id)}>Sell</button>
                <button className="mainbutton" onClick={() => buyCard(card.id)}>Buy</button>
            
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CardList;