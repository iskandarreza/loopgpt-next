import React, { useState } from 'react'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import StartIcon from '@mui/icons-material/Start'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import RestoreIcon from '@mui/icons-material/Restore'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_WEBSOCKET_MESSAGES, OPEN_FILE_UPLOAD_DIALOG, SET_FIRST_START } from '@/store/types'
import { getSocket } from '@/utils/socket'

export function BottomNavigationComponent() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [value, setValue] = useState()  

  const handleSocketConnect = (websocketUrl) => {
    getSocket(websocketUrl)
  }

  const handleStartClick = () => {
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

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue)
          if (newValue === 'start') {
            if (!state.uiStates.isStarted) {
              dispatch({ type: CLEAR_WEBSOCKET_MESSAGES }) // clear sample messages
              dispatch({ type: SET_FIRST_START })
            }
            handleStartClick()
          }
          if (newValue === 'load') {
            dispatch({ type: OPEN_FILE_UPLOAD_DIALOG })
          }
          if (newValue === 'save') {
            dispatch({ type: OPEN_FILE_UPLOAD_DIALOG })
          }
        }}
      >
        <BottomNavigationAction
          value="start"
          label="Start"
          icon={<StartIcon />}
        />
        <BottomNavigationAction
          value="load"
          label="Restore"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          value="save"
          label="Save"
          icon={<SaveAltIcon />}
        />
        {/* <BottomNavigationAction value="archive" label="Archive" icon={<ArchiveIcon />} /> */}
      </BottomNavigation>
    </Paper>
  )
}
