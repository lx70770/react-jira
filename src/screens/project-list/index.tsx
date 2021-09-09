import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils/index'
import styled from '@emotion/styled'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useHttp } from 'utils/http'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const debouncedParam = useDebounce(param, 200)
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <ScreenContainer>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </ScreenContainer>
  )
}

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`
