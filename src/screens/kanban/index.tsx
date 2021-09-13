import React from 'react'
import styled from '@emotion/styled'
import { useDocumentTitle } from 'hooks/use-document-title'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')

  return (
    <>
      <h1>看板</h1>
    </>
  )
}

export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
