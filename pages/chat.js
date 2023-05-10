import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { getSocket, setupSocketEventListeners } from '../utils/socket'
import { Box, Container, Typography } from '@mui/material'
import { MessagesComponent } from '../components/MessagesComponent'
import { sampleMessages } from '@/sample-data/sample-messages'

import { BottomNavigationComponent } from '../components/BottomNavigationComponent'
import { useDispatch, useSelector } from 'react-redux'
import {
  APPEND_WEBSOCKET_MESSAGES,
  CLEAR_WEBSOCKET_MESSAGES,
  OPEN_FILE_UPLOAD_DIALOG,
} from '@/store/types'
import { UploadFileDialog } from '../components/UploadFileDialog'
import { AgentConfigComponent } from '../components/AgentConfigComponent'
// import ArchiveIcon from '@mui/icons-material/Archive';

export const DynamicReactJson = dynamic(import('react-json-view'), {
  ssr: false,
})

const Chat = () => {
  const [socket, setSocket] = useState(false)
  const [inputValue, setInputValue] = useState(1)
  const [isStarted, setIsStarted] = useState(false)
  const [bottomNavValue, setBottomNavValue] = useState(0)
  const [goals, setGoals] = useState(false)
  const [constraints, setConstraints] = useState(false)

  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const messages = state.uiStates.messages

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

  const handleStartClick = () => {
    if (!isStarted) {
      dispatch({ type: CLEAR_WEBSOCKET_MESSAGES }) // clear sample messages
      setIsStarted(true)
    }

    console.log('fetch starting...')

    // Make HTTP POST request to start the chat and obtain WebSocket URL
    fetch(process.env.NEXT_PUBLIC_INIT_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('fetch complete, data:', data)
        const { websocketUrl } = data
        handleSocketConnect(websocketUrl)
      })
      .catch((error) => {
        console.error('Error starting chat:', error)
      })
  }

  const handleSaveClick = () => {
    // console.log(config)
  }

  const handleLoadClick = () => {
    dispatch({ type: OPEN_FILE_UPLOAD_DIALOG })
  }

  useEffect(() => {
    console.log({ messages })
    console.log({ state })
  }, [messages, state])

  useEffect(() => {
    if (bottomNavValue === 'start') {
      handleStartClick()
    }
    if (bottomNavValue === 'load') {
      handleLoadClick()
    }
    if (bottomNavValue === 'save') {
      handleSaveClick()
    }
  }, [bottomNavValue])

  useEffect(() => {
    sampleMessages.forEach((msg) =>
      dispatch({ type: APPEND_WEBSOCKET_MESSAGES, payload: msg })
    )
  }, [])

  return (
    <Box>
      <Box
        sx={{ width: '100vw', display: 'grid', gridTemplateColumns: '3fr 1fr' }}
      >
        <Container>
          <Typography variant="h4" component="h">
            Autonomous GPT Cycle Explorer
          </Typography>
          <Typography variant="subtitle1">
            A user interface to explore the process cycles of self-prompting
            autonomous AI agents, for the purpose of understanding the mechanics
            and creating better initial prompts
          </Typography>
        </Container>
        <Container>
          <Typography variant="h4" component="h2">
            Agent Setup
          </Typography>
        </Container>
      </Box>

      <Box
        sx={{ width: '100vw', display: 'grid', gridTemplateColumns: '3fr 1fr' }}
      >
        <Box>
          <Container sx={{ height: '85vh', overflowY: 'scroll' }}>
            <MessagesComponent />
            <BottomNavigationComponent
              {...{ bottomNavValue, setBottomNavValue }}
            />
          </Container>
        </Box>
        <Container>
          <AgentConfigComponent />
          <CycleConfigComponent />
        </Container>
      </Box>

      <UploadFileDialog />
    </Box>
  )
}

export default Chat

function CycleConfigComponent() {
  return (
    <Box>
      <Typography variant="h4" component="h2">
        Cycle Setup
      </Typography>
      <p>Number of Cycles</p>
      <p>Save to DB</p>
    </Box>
  )
}
