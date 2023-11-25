import { useState, useEffect } from "react";

function PersonForm({ blankPerson, personToEdit, updatePerson, mutatePerson }) {
  const [person, setPerson] = useState({ ...personToEdit });

  useEffect(() => {
    setPerson(personToEdit);
  }, [personToEdit]);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.id;
    setPerson({ ...person, [name]: value });
  }

    function handleSubmit(event) {
        event.preventDefault();
        alert("submit", person);
        mutatePerson(person);
        //callback function from App.jsx that either adds (if id is blank) 
        //or updates (if id is not blank) a person

    }

  return (
    <div>
      <h1>Add/Edit Person</h1>
      {JSON.stringify(person)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Id</label>
        <input
          id="id"
          type="number"
          readOnly
          placeholder="id"
          value={person.id}
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="name"
          value={person.name}
          onChange={handleChange}
        />
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          min="1"
          max="120"
          placeholder="age"
          value={person.age}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="email"
          value={person.email}
          onChange={handleChange}
        />
        <label htmlFor="gender">Gender</label>
        <select id="gender" value={person.gender} onChange={handleChange}>
          <option defaultChecked>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button className="btn btn-primary">Update</button>
        <button
          className="btn btn-danger"
          onClick={() => setPerson(blankPerson)}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default PersonForm;