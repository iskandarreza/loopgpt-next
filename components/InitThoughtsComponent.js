import React from 'react'
import { Container } from '@mui/material'
import { CycleNumberComponent } from './CycleNumberComponent'
import { ThoughtsMessage } from './ThoughtsMessageComponent'
import { CycleStageContainer } from './CycleStageContainer'

export function InitThoughtsComponent(message) {
  return (
    <CycleStageContainer>
      <CycleNumberComponent cycleNumber={message.init_thoughts.cycle} />
      <Container
        sx={{
          borderColor: 'grey.500',
          borderRadius: '16px',
          padding: '16px',
          display: 'grid',
          gap: '8px',
          gridTemplateColumns: '17vw 17vw 17vw 17vw 17vw',
          justifyContent: 'space-evenly',
        }}
      >
        <ThoughtsMessage thoughts={message.init_thoughts} />
      </Container>
    </CycleStageContainer>
  )
}
