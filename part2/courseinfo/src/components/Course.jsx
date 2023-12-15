const Header = ({ name }) => <h2>{name}</h2>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Content = ({ parts }) => <>{parts.map(part => (<Part key={part.id} part={part} />))}</>

const Course = ({courses}) => {
  return (
    <>
      {courses.map(course => (
        <div key={course.id}>
          <Header  name={course.name} />
          <Content parts={course.parts} />
          <Total sum={course.parts.reduce((sum, part) =>sum + part.exercises, 0)} />
        </div>
      ))}
    </>
  )
}

export default Course
