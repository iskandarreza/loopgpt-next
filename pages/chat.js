import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Box, Container, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { APPEND_WEBSOCKET_MESSAGES } from '@/store/types'
import { sampleMessages } from '@/sample-data/sample-messages'

import { BottomNavigationComponent } from '../components/BottomNav/BottomNavigationComponent'
import { MessagesComponent } from '../components/MessageView'

import { UploadFileDialog } from '../components/BottomNav/UploadFileDialog'
import { AgentConfigComponent } from '../components/AgentConfig/AgentConfigComponent'
import { AgentConfigDrawer } from '../components/AgentConfig/AgentConfigDrawer'
import { CycleOverviewComponent } from '@/components/AgentConfig/CycleOverviewComponent'

export const DynamicReactJson = dynamic(import('react-json-view'), {
  ssr: false,
})

const contentAreaHeight = 'calc(90vh  - 100px)'

const Chat = () => {
  const [inputValue, setInputValue] = useState(1)
  const [goals, setGoals] = useState(false)
  const [constraints, setConstraints] = useState(false)

  const dispatch = useDispatch()
  const isStarted = useSelector((state) => state.uiStates.isStarted)
  const messages = useSelector((state) => state.uiStates.messages)

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  // trace redux states
  // const state = useSelector((state) => state)
  // useEffect(() => {
  //   console.log({ state })
  // }, [state])

  // load sample messages so we can view page elements.
  // will be cleared on first run and replaced by incoming messages
  useEffect(() => {
    if (!isStarted) {
      if (messages.length === 0) {
        sampleMessages.forEach((msg) => {
          dispatch({ type: APPEND_WEBSOCKET_MESSAGES, payload: msg })
        })
      }
    }
  }, [isStarted, messages])

  return (
    <Box>
      <Box
        sx={{ width: '99vw', display: 'grid', gridTemplateColumns: '3fr 1fr', borderBottom: '2px grey solid' }}
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
        sx={{ width: '98vw', display: 'grid', gridTemplateColumns: '3fr 1fr' }}
      >
        <Box>
          <Container sx={{ overflowY: 'scroll', height: contentAreaHeight }}>
            <MessagesComponent />
          </Container>
        </Box>
        <Container sx={{ overflowY: 'scroll', height: contentAreaHeight }}>
          <AgentConfigComponent />
          <CycleOverviewComponent />
        </Container>
      </Box>
      <BottomNavigationComponent />
      <UploadFileDialog />
      <AgentConfigDrawer />
    </Box>
  )
}

export default Chat
