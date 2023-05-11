import React from 'react'
import { CycleNumberComponent } from './shared/CycleNumberComponent'
import { ThoughtsMessage } from './shared/ThoughtsMessageComponent'
import { CycleStageContainer } from './shared/CycleStageContainer'
import { RowPanelContainer } from './shared/RowPanelContainer'
import RouteIcon from '@mui/icons-material/Route'
import { IconListLine } from './shared/IconListLine'
import { DynamicReactJson } from '@/pages/chat'

export function InitThoughtsComponent(message) {
  return (
    <CycleStageContainer>
      <CycleNumberComponent cycleNumber={message.init_thoughts.cycle} />
      <IconListLine icon={<RouteIcon />}>
        <span>Initial response: </span>
        <DynamicReactJson
          name={'init_thoughts'}
          src={message.init_thoughts}
          theme={'harmonic'}
          collapsed
        />
      </IconListLine>
      <RowPanelContainer>
        <ThoughtsMessage thoughts={message.init_thoughts} />
      </RowPanelContainer>
    </CycleStageContainer>
  )
}
