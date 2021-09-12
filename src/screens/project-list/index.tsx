import { useState } from 'react'
import { useDebounce, useMount } from 'utils/index'
import styled from '@emotion/styled'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useHttp } from 'utils/http'
import { useProjects } from 'hooks/use-project'
import { useUsers } from 'utils/user'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 200)

  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUsers()

  return (
    <ScreenContainer>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <span>Error</span> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </ScreenContainer>
  )
}

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`
