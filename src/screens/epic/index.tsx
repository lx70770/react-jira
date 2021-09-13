import React from 'react'
import styled from '@emotion/styled'
import { useDocumentTitle } from 'hooks/use-document-title'

export const EpicScreen = () => {
  useDocumentTitle('任务组列表')

  return (
    <>
      <h1>任务组</h1>
    </>
  )
}

export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
