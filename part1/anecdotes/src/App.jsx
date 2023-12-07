import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({points, index}) =>{
  return (
    <div>
      has {points[index]} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const randomNumb = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const voteAnec = () => {
    setPoints(prevPoints => {
      const copy = [...prevPoints]
      copy[selected] += 1
      return copy
      }
    )
    }
  
  return (
    <>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Display points={points} index={selected}/>
      <div>
        <Button handleClick={voteAnec} text="vote" />
        <Button handleClick={randomNumb} text="next anecdote" />
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[points.indexOf(Math.max(...points))]}
      <Display points={points} index={points.indexOf(Math.max(...points))}/>
    </>
  )
}

export default App