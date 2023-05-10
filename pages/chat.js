import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { getSocket } from '../utils/socket'
import { Box, Container, Paper } from '@mui/material'
import { MessagesComponent } from '../components/MessagesComponent'
import { sampleMessages } from '@/utils/sample-messages'

export const DynamicReactJson = dynamic(import('react-json-view'), {
  ssr: false,
})

const Chat = () => {
  const [messages, setMessages] = useState(sampleMessages)
  const [inputValue, setInputValue] = useState(1)
  const [socket, setSocket] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  function setupSocketEventListeners(socket) {
    if (!socket) return
    socket.on('connect', () => {
      console.log('Connected to WebSocket server')
      socket.emit('start', {
        name: '3148-Graceful-Sprint',
        max_cycles: inputValue ? inputValue : 1,
      })
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
    })

    function handleMessage(property, message) {
      setMessages((prevState) => [...prevState, { [property]: message }])
    }

    socket.on('init_state', (message) => handleMessage('init_state', message))
    socket.on('init_thoughts', (message) =>
      handleMessage('init_thoughts', message)
    )
    socket.on('this_cycle', (message) => handleMessage('this_cycle', message))
    socket.on('message', (message) => handleMessage('message', message))
  }

  const handleSocketConnect = (websocketUrl) => {
    if (socket && socket.active) {
      console.log('in socket && socket.active')
      return
    }

    if (socket || socket.disconnected) {
      console.log('in socket || socket.disconnected')
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
    if (!isStarted) {
      setMessages([])
      setIsStarted(true)
    }

    // Make HTTP POST request to start the chat and obtain WebSocket URL
    fetch(process.env.NEXT_PUBLIC_INIT_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { websocketUrl } = data
        handleSocketConnect(websocketUrl)
      })
      .catch((error) => {
        console.error('Error starting chat:', error)
      })
  }

  useEffect(() => {
    console.log({messages})
  }, [messages])

  return (
    <Box>
      <Container sx={{ height: '90vh', overflowY: 'scroll' }}>
        <MessagesComponent {...{ messages }} />
      </Container>
      <Container>
        <Paper
          elevation={3}
          sx={{ border: 'grey.500 solid 1px', width: '100%', height: '5vh' }}
        >
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="inputField">Enter number of cycles:</label>
            <div>
              <input
                id="inputField"
                type="number"
                value={inputValue}
                placeholder="1"
                onChange={handleInputChange}
              />
              <button type="button" onClick={handleClick}>
                Start
              </button>
            </div>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default Chat
