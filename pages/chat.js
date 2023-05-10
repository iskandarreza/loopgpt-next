import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { getSocket } from '../utils/socket'
import { Box, Container, Typography } from '@mui/material'
import { MessagesComponent } from '../components/MessagesComponent'
import { sampleMessages } from '@/utils/sample-messages'


import { BottomNavigationComponent } from '../components/BottomNavigationComponent'
import { useDispatch, useSelector } from 'react-redux'
import {
  CLOSE_FILE_UPLOAD_DIALOG,
  OPEN_FILE_UPLOAD_DIALOG,
  UPDATE_AGENT_STATE,
} from '@/store/types'
import { UploadFileDialog } from '../components/UploadFileDialog'
// import ArchiveIcon from '@mui/icons-material/Archive';

export const DynamicReactJson = dynamic(import('react-json-view'), {
  ssr: false,
})

const Chat = () => {
  const [messages, setMessages] = useState(sampleMessages)
  const [inputValue, setInputValue] = useState(1)
  const [socket, setSocket] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [bottomNavValue, setBottomNavValue] = useState(0)
  const [goals, setGoals] = useState(false)
  const [constraints, setConstraints] = useState(false)
  const [config, setConfig] = useState(false)
  const [file, setFile] = useState(null)

  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  function setupSocketEventListeners(socket) {
    if (!socket) return
    socket.on('connect', () => {
      console.log('Connected to WebSocket server')
      socket.emit('start', {
        name: '3148-Graceful-Sprint',
        max_cycles: inputValue ? inputValue : 1,
        goals: !!goals && goals,
        constraints: !!constraints && constraints,
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
    socket.on('current_state', (message) => {
      setConfig(message)
    })
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

  const handleStartClick = () => {
    if (!isStarted) {
      setMessages([]) // clear sample messages
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

  const handleSaveClick = () => {
    console.log(config)
  }

  const handleLoadClick = () => {
    dispatch({ type: OPEN_FILE_UPLOAD_DIALOG })
  }

  const handleFileUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(process.env.NEXT_PUBLIC_LOAD_CONFIG_URL, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        dispatch({ type: UPDATE_AGENT_STATE, payload: data.data })
        dispatch({ type: CLOSE_FILE_UPLOAD_DIALOG })
      } else {
        // handle error
      }
      
      console.log(data)
    } catch (error) {
      console.log(error)
    }
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
          <Container sx={{ height: '90vh', overflowY: 'scroll' }}>
            <MessagesComponent {...{ messages }} />
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

      <UploadFileDialog {...{ handleFileChange, handleFileUpload }} />
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

function AgentConfigComponent() {
  return (
    <Box>
      <p>Model</p>
      <p>Agent Name</p>
      <p>Agent Description</p>
      <p>Goals</p>
      <p>Constraints</p>
      <p>Init Prompt</p>
      <p>Next Prompt</p>
      <p>Tools</p>
      <p>Staged Tools</p>
    </Box>
  )
}
