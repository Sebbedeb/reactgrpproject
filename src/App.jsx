import "./styles/App.css";
import PersonList from "./components/PersonList";
import PersonForm from "./components/PersonForm";
import { useEffect, useState } from "react";
import { fetchData } from "./util/persistence";

const blankPerson = { id: "", age: "", name: "", email: "", gender: "" };

function App() {
  const [persons, setPersons] = useState([]);
  const [personToEdit, setPersonToEdit] = useState(blankPerson);

  const APIURL = "http://localhost:3000/api";

  function editPerson(person) {
    setPersonToEdit(person);
  }

  function mutatePerson(person) {
    if (person.id !== "") {
      //PUT
      updatePerson(person);
    } else {
      createPerson(person);
    }
  }

  function updatePerson(person) {
    fetchData(
      //URL, callback, method, body
      `${APIURL}/${person.id}`, //URL
      (person) => {
        setPersons(persons.map((p) => (p.id == person.id ? { ...person } : p))
        );
    }, //Callback
      "PUT", //Method
      person //Body
    );
  }

  function createPerson(person) {
    fetchData(
      //URL, callback, method, body
      APIURL, //URL
      (person) => setPersons([...persons, person]), //Callback
      "POST", //Method
      person //Body
    );
  }

  function getPersons(callback) {
    // fetch data
    fetchData(APIURL, callback);
  }

  function deletePersonById(personId) {
    // delete person from api
    fetchData(`${APIURL}/${personId}`, () => {}, "DELETE");

    // delete from persons array via setPersons()
    setPersons([...persons.filter((person) => person.id !== personId)]);
  }

  useEffect(() => {
    // get all persons
    getPersons((data) => setPersons(data));
  }, []);

  return (
    <>
      <div>
        <h1>ReactProject</h1>
        <p>Nu skal der kodes</p>
        <PersonForm
          blankPerson={blankPerson}
          personToEdit={personToEdit}
          mutatePerson={mutatePerson}
        />
        <PersonList
          persons={persons}
          deletePersonById={deletePersonById}
          editPerson={editPerson}
        />
      </div>
    </>
  );
}

export default App;
