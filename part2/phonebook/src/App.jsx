import { useState, useEffect  } from 'react'


import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'


import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({ info: null})
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const notif = (info, type='info') => {
    setMessage({
      info, type
    })

    setTimeout(() => {
      setMessage({ info: null} )
    }, 5000)
  }


  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)

    if (person) {
      updatePerson(person)
      console.log("persona ya existente")
      return
    }

    personService
      .create({ name: newName, number: newNumber})
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        notif(`${createdPerson.name} agregado`)
        setNewName('')
        setNewNumber('') 
      })
  }

  const removePerson = (person) => {
    const check =  window.confirm(`remover ${person.name} del phonebook?`)
    if (check){
      personService
        .remove(person.id)
        .then(()=> {
          setPersons(persons.filter(p => p.id !== person.id))
          notif(`el numero de ${person.name} ha sido eliminado`)
      })
    }    
  }

  const updatePerson = (person) => {
    const check = window.confirm(`${newName} ya está en la agenda, cambiar el número?`)
    if (check) {
      personService
        .update(person.id, {...person, number: newNumber})
        .then((updatedPerson) => {
          setPersons(persons.map(p => p.id !== person.id ? p :updatedPerson ))
          notif(`el numero de ${person.name} esta actualizado`)
        })        
        .catch(() => {
          notif(`La informacion de ${person.name} ya ha sido eliminada del servidor`, 'error')
          setPersons(persons.filter(p => p.id !== person.id))
        })

      setNewName('')
      setNewNumber('')
    }
  }


  const personFilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase())
  const personsToShow = filter ? persons.filter(personFilter) : persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App
