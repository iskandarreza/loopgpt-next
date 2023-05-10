import React from 'react'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import StartIcon from '@mui/icons-material/Start'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import RestoreIcon from '@mui/icons-material/Restore'

export function BottomNavigationComponent({
  bottomMenuValue,
  setBottomNavValue,
}) {
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={bottomMenuValue}
        onChange={(_event, newValue) => {
          console.log(newValue)
          setBottomNavValue(newValue)
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
