import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Box, Container, Typography } from '@mui/material'
import { MessagesComponent } from '../components/MessagesComponent'
import { sampleMessages } from '@/sample-data/sample-messages'

import { BottomNavigationComponent } from '../components/BottomNavigationComponent'
import { useDispatch, useSelector } from 'react-redux'
import { APPEND_WEBSOCKET_MESSAGES } from '@/store/types'
import { UploadFileDialog } from '../components/UploadFileDialog'
import { AgentConfigComponent } from '../components/AgentConfigComponent'
// import ArchiveIcon from '@mui/icons-material/Archive';

export const DynamicReactJson = dynamic(import('react-json-view'), {
  ssr: false,
})

const Chat = () => {
  const [inputValue, setInputValue] = useState(1)
  const [bottomNavValue, setBottomNavValue] = useState(0)
  const [goals, setGoals] = useState(false)
  const [constraints, setConstraints] = useState(false)

  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const messages = state.uiStates.messages

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    console.log({ messages })
    console.log({ state })
  }, [messages, state])

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
          <Container sx={{ overflowY: 'scroll', paddingBottom: '4em' }}>
            <MessagesComponent />
          </Container>
        </Box>
        <Container>
          <AgentConfigComponent />
          <CycleConfigComponent />
        </Container>
      </Box>
      <BottomNavigationComponent />
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
