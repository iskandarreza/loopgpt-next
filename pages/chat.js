import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Box, Container, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { APPEND_WEBSOCKET_MESSAGES } from '@/store/types'
import { sampleMessages } from '@/sample-data/sample-messages'

import { BottomNavigationComponent } from '../components/BottomNavigationComponent'
import { MessagesComponent } from '../components/MessagesComponent'

import { UploadFileDialog } from '../components/UploadFileDialog'
import { AgentConfigComponent } from '../components/AgentConfigComponent'
import { AgentConfigDrawer } from '../components/AgentConfigDrawer'
import { CycleOverviewComponent } from '@/components/CycleOverviewComponent'
// import ArchiveIcon from '@mui/icons-material/Archive';

export const DynamicReactJson = dynamic(import('react-json-view'), {
  ssr: false,
})

const Chat = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [inputValue, setInputValue] = useState(1)
  const [bottomNavValue, setBottomNavValue] = useState(0)
  const [goals, setGoals] = useState(false)
  const [constraints, setConstraints] = useState(false)

  const dispatch = useDispatch()
  const isStarted = useSelector((state) => state.uiStates.isStarted)
  const agentConfig = useSelector((state) => state.agentStates.config)
  const messages = useSelector((state) => state.uiStates.messages)

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  useEffect(() => {
    console.log({ agentConfig })
  }, [agentConfig])

  // load sample messages so we can view page elements.
  // will be cleared on first run and replaced by incoming messages
  useEffect(() => {
    if (!isStarted) {
      if (messages.length === 0) {
        sampleMessages.forEach((msg) =>
          dispatch({ type: APPEND_WEBSOCKET_MESSAGES, payload: msg })
        )
      }
    }
  }, [isStarted, messages])

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
          <Container
            sx={{ overflowY: 'scroll', height: 'calc(90vh  - 100px)' }}
          >
            <MessagesComponent />
          </Container>
        </Box>
        <Container>
          <AgentConfigComponent {...{ handleDrawerOpen }} />
          <CycleOverviewComponent />
        </Container>
      </Box>
      <BottomNavigationComponent />
      <UploadFileDialog />
      <AgentConfigDrawer {...{ isDrawerOpen, handleDrawerClose }} />
    </Box>
  )
}

export default Chat
