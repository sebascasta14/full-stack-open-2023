import { useState } from 'react'

const Display = ({tittle}) => <h1>{tittle}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>
        {text}:
      </td>
      <td>
      {value} {text === "positive" ? "%" : ""}
      </td>  
    </tr>
  )
}

const Statistics = ({value}) => {
  if (value.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value ={value.good} />
        <StatisticLine text="neutral" value ={value.neutral} />
        <StatisticLine text="bad" value ={value.bad} />
        <StatisticLine text="all" value ={value.total} />
        <StatisticLine text="average" value ={value.average} />
        <StatisticLine text="positive" value ={value.positive} />
      </tbody>
    </table>

  )
}


const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const value = {
    good,
    neutral,
    bad,
    total,
    average: (good - bad) / total,
    positive: (good / total) * 100,
  }
  
  const increaseGood = () => {
    const updated = good + 1
    setGood(updated)
    setTotal(updated + neutral + bad)
  }

  const increaseNeutral = () => {
    const updated = neutral + 1
    setNeutral(updated)
    setTotal(updated + good + bad)
  }

  const increaseBad = () => {
    const updated = bad + 1
    setBad(updated)
    setTotal(updated + good + neutral)
  }

  return (
    <>
      <Display tittle={"give feedback"} />
      <Button handleClick={increaseGood} text="good" />
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />
      <Display tittle={"statistic"} />
      <Statistics value={value}/>
    </>
  )
}

export default App
