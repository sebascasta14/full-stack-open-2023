import axios from 'axios'
import { useState, useEffect } from "react"


const Country = ({ country }) => {
  const languages = Object.values(country.languages)
  const flagUrl = country.flags.png
  const capital = country.capital[0]

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>Capital: {capital}</p>
      <p>Population: {country.population}</p>

      <h3>Spoken languages</h3>
        <ul>
          {languages.map(language => <li key={language}>{language}</li>)}  
        </ul>

      <img src={flagUrl} width='150' />
      <h3>Weather in {capital}</h3>
        <p>temperature {" "} °Celsius</p>

        <p>wind: {" "} m/s direction {}</p>

    </div>
  )
}

const CountryList = ({ countries, showCountry }) => {
  if ( countries.length>10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  if ( countries.length===1) {
    return <Country country={countries[0]} />
  }

  return (
    <div>
      {countries.map(c =>
        <p key={c.name.common}>
          {c.name.common}
          <button onClick={() => showCountry(c.name.common)}>
            show
          </button>
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(({ data }) => {
      setCountries(data)
    })
  }, [])

  const matchedContries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div>
      <div>
        find countries <input value={search} onChange={({ target }) => setSearch(target.value)} />
      </div>
      <CountryList 
        countries={matchedContries}
        showCountry={setSearch}
      />
    </div>
)
}

export default App
