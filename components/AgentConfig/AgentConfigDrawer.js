import React, { useState } from 'react'
import {
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SaveIcon from '@mui/icons-material/Save'
import ModelTrainingIcon from '@mui/icons-material/ModelTraining'
import AndroidIcon from '@mui/icons-material/Android'
import DescriptionIcon from '@mui/icons-material/Description'
import AddTaskIcon from '@mui/icons-material/AddTask'
import BlockIcon from '@mui/icons-material/Block'
import HandymanIcon from '@mui/icons-material/Handyman'

import Forward5Icon from '@mui/icons-material/Forward5'
import HistoryIcon from '@mui/icons-material/History'

import { useDispatch, useSelector } from 'react-redux'
import { HIDE_AGENT_CONFIG_DRAWER } from '@/store/types'
import { Save } from '@mui/icons-material'

const drawerWidth = '25vw'

export function AgentConfigDrawer() {
  const isDrawerOpen = useSelector((state) => state.uiStates.agentConfigDrawer.isOpen)
  const dispatch = useDispatch()

  
  const handleDrawerClose = () => {
    dispatch({type: HIDE_AGENT_CONFIG_DRAWER})
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="right"
      open={isDrawerOpen}
      onClose={handleDrawerClose}
    >
      <Box>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Divider />
      <Container sx={{padding: '8px'}}>
        <Typography variant="h6" component="strong">
          Configure Agent Initial State
        </Typography>
      </Container>
      <List>
        {[
          {text: 'Model', icon: <ModelTrainingIcon />},
          {text: 'Agent Name', icon: <AndroidIcon />},
          {text: 'Description', icon: <DescriptionIcon />},
          {text: 'Goals', icon: <AddTaskIcon />},
          {text: 'Constraints', icon: <BlockIcon />},
          {text: 'Tools', icon: <HandymanIcon />},
        ].map((value, index) => (EditableListItem(value)))}
      </List>
      <Divider />
      <Container sx={{padding: '8px'}}>
        <Typography variant="h6" component="strong">
          Other Settings
        </Typography>
      </Container>
      <List>
        {[
          {text: 'Cycles Per Run', icon: <Forward5Icon />}, 
          {text: 'Message History', icon: <HistoryIcon />}
        ].map((value, index) => (EditableListItem(value)))}
      </List>
    </Drawer>
  )
}
function EditableListItem(value) {
  const {text, icon} = value
  const [isEditing, setIsEditing] = useState(false)
  const handleClick = () => {
    setIsEditing(prevState => !prevState)
  }
  return <ListItem key={text} disablePadding>
    <ListItemButton >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      {!isEditing ?
        <ListItemText onClick={handleClick} primary={text} />
        : <>
          <TextField />
          <IconButton onClick={handleClick}>
            <SaveIcon />
          </IconButton>
        </>
      }
    </ListItemButton>
  </ListItem>;
}

