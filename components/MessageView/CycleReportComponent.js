import React from 'react'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
import { DynamicReactJson } from '@/pages/chat'
import { CycleNumberComponent } from './shared/CycleNumberComponent'
import { CycleStageContainer } from './shared/CycleStageContainer'
import { Card, CardContent, CardHeader } from '@mui/material'
import { RowPanelContainer } from './shared/RowPanelContainer'
import { ThoughtsMessage } from './shared/ThoughtsMessageComponent'
import { IconListLine } from './shared/IconListLine'
import NextPlanIcon from '@mui/icons-material/NextPlan'

export function CycleReportComponent(message) {
  // const {} = message
  // const cycleReport
  return (
    <CycleStageContainer>
      <CycleNumberComponent cycleNumber={message.this_cycle.cycle} />
      <IconListLine icon={<WysiwygIcon />}>
        <span>Cycle report: </span>
        <DynamicReactJson
          name={'this_cycle'}
          src={message.this_cycle}
          theme={'harmonic'}
          collapsed
        />
      </IconListLine>

      {!!message.this_cycle.cycle_progress && (
        <>
          <RowPanelContainer panelCount={'3'}>
            <CycleToolReport data={message.this_cycle} />
          </RowPanelContainer>
          <RowPanelContainer panelCount={'1'}>
            <Card>
              <CardHeader title={'Tool Results'} />
              <CardContent>
                <pre style={{ whiteSpace: 'normal' }}>
                  {JSON.stringify(message.this_cycle.tool_results, null, 4)}
                </pre>
              </CardContent>
            </Card>
          </RowPanelContainer>
        </>
      )}
      {!!message.this_cycle.next_thoughts && (
        <>
          <IconListLine icon={<NextPlanIcon />}>Next thoughts: </IconListLine>
          <RowPanelContainer panelCount={'5'}>
            <ThoughtsMessage thoughts={message.this_cycle.next_thoughts} />
          </RowPanelContainer>
        </>
      )}
    </CycleStageContainer>
  )
}

const CycleProgress = ({ data }) => {
  const { cycle_progress, id } = data
  const progressArr = cycle_progress
    .split(/\r?\n|\r|\n/g)
    .map((s) => s.slice(2))
  return progressArr.map((v, i) => <p key={`${id}-progress-${i}`}>{v}</p>)
}

const CycleToolReport = ({ data }) => {
  const { staging_tool, command, tool_results, next_command } = data

  return (
    <>
      <Card>
        <CardHeader title={'Staging Tool'} />
        <CardContent>
          <pre style={{ whiteSpace: 'normal' }}>{staging_tool}</pre>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={'Progress'} />
        <CardContent>
          <CycleProgress {...{ data }} />
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader title={'Command'} />
        <CardContent>
          <pre style={{ whiteSpace: 'normal' }}>
            {JSON.stringify(command, null, 4)}
          </pre>
        </CardContent>
      </Card> */}
      <Card>
        <CardHeader title={'Next Command'} />
        <CardContent>
          <pre style={{ whiteSpace: 'normal' }}>
            {JSON.stringify(next_command, null, 4)}
          </pre>
        </CardContent>
      </Card>
    </>
  )
}
