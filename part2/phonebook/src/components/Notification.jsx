const Notification = ({ message }) => {

  if (message.info === null) {
    return
  }
    const style = {
        color: message.type==='error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
    
    return (
    <div style={style}>
        {message.info}
      </div>
    )
  }

export default Notification