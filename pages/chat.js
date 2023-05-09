import React from "react"
import { getSocket } from "../src/app/socket"
import dynamic from "next/dynamic"

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

const Chat = () => {
  const [messages, setMessages] = React.useState([])
  const [inputValue, setInputValue] = React.useState(1)
  const [socket, setSocket] = React.useState(false)
  
  function setupSocketEventListeners(socket) {
    if (!socket) return
    socket.on("connect", () => {
      console.log("Connected to WebSocket server")
      socket.emit("start", {
        name: "3148-Graceful-Sprint",
        max_cycles: inputValue ? inputValue : 1
      })
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server")
    })

    function handleMessage(property, message) {
      setMessages(prevState => [...prevState, { [property]: message }])
    }

    socket.on("init_state", message => handleMessage("init_state", message))
    socket.on("init_thoughts", message => handleMessage("init_thoughts", message))
    socket.on("this_cycle", message => handleMessage("this_cycle", message))
    socket.on("message", message => handleMessage("message", message))
  }

  const handleSocketConnect = (websocketUrl) => {

    if(socket && socket.active) {
      console.log("in socket && socket.active")
      return
    }

    if (socket || socket.disconnected) {
      console.log("in socket || socket.disconnected")
      socket.removeAllListeners()
      connectSocket()
    }

    if (!socket) {
      const newSocket = getSocket(websocketUrl)
      setupSocketEventListeners(newSocket)
      newSocket.connect()
      setSocket(newSocket)
    }

    function connectSocket() {
      setupSocketEventListeners(socket)
      socket.connect()
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleClick = () => {
    // Make HTTP POST request to start the chat and obtain WebSocket URL
    fetch("http://localhost:5050/start-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const {websocketUrl} = data
        handleSocketConnect(websocketUrl)
      })
      .catch((error) => {
        console.error("Error starting chat:", error)
      })
  }

  React.useEffect(() => {
    console.log(messages)
  }, [messages])


  return (
    <div>
      <ul>
        <MessagesComponent {...{messages}}/>
      </ul>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="inputField">Enter number of cycles:</label>
        <div>
          <input id="inputField" type='number' value={inputValue} placeholder="1" onChange={handleInputChange} />
          <button type="button" onClick={handleClick}>Start</button>
        </div>
      </form>
    </div>
  )
}

const MessagesComponent = ({messages}) => {
  return messages.map((message, index) => (
    <li key={message.id ? message.id : `${index}-${new Date().toISOString()}`}>
      <>
        {!!message.init_state &&
          <DynamicReactJson name={"init_state"} src={message.init_state} theme={"harmonic"} collapsed />}
        {!!message.init_thoughts &&
          // Object.keys(message.init_thoughts)
          <DynamicReactJson name={"init_thoughts"} src={message.init_thoughts} theme={"harmonic"} />
          // .map((key) => [key, message.init_thoughts[key]])
          // .map((v,i) => v[0] !== "id" ? <p><strong>{`${v[0]}: `}</strong>{`${v[1]}`}</p> : "")
          // .map((key) => {
          //   <p key={`${key}-${message.id}`}><strong>{key}: </strong>{message.init_thoughts[key]}</p>
          // })
        }
        {!!message.this_cycle &&
          <DynamicReactJson name={"this_cycle"} src={message.this_cycle} theme={"harmonic"} collapsed />
          // <span>{JSON.stringify(message.this_cycle)}</span>
          // .map(({k,v}, i) => {
          //   <span key={`${message.id}-${k}-${i}`}><strong>{k[i]}:</strong>{v[i]}</span>
          // })}
          // .map((key) => JSON.stringify([key, message.init_thoughts[key]]))
        }
        {!!message.message &&
          <h6>{JSON.stringify(message.message)}</h6>}
      </>

    </li>
  ))
}

const ThoughtsMessage = (thoughts) => {

  return ""
}

export default Chat