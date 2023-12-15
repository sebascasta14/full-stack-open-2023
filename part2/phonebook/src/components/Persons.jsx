const Persons = ({ persons, removePerson }) => {
    return (
      <>
        {persons.map(person =>
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={()=>removePerson(person)}>
              delete
            </button>
          </div>
        )}
      </>
    )
  }
  
  export default Persons