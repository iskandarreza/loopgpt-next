import React from 'react'
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
  Typography,
} from '@mui/material'
import BuildIcon from '@mui/icons-material/Build'
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import HistoryIcon from '@mui/icons-material/History';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useDispatch, useSelector } from 'react-redux'
import { HIDE_AGENT_CONFIG_DRAWER } from '@/store/types'

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
          'Model', 
          'Agent Name', 
          'Description', 
          'Goals', 
          'Constraints', 
          'Tools'
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Container sx={{padding: '8px'}}>
        <Typography variant="h6" component="strong">
          Other Settings
        </Typography>
      </Container>
      <List>
        {[
          {text: 'Cycles Per Run', icon: <ModelTrainingIcon />}, 
          {text: 'Message History', icon: <HistoryIcon />}
        ].map(({text, icon}, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
