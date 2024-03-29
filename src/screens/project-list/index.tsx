import { useDebounce } from 'utils/index'
import styled from '@emotion/styled'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useProjects } from 'hooks/use-project'
import { useUsers } from 'utils/user'
import { useDocumentTitle } from 'hooks/use-document-title'
import { useProjectsSearchParams } from './util'

export const ProjectListScreen = () => {
  useDocumentTitle('管理列表', false)

  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return (
    <ScreenContainer>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <span>Error</span> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </ScreenContainer>
  )
}

ProjectListScreen.whyDidYouRender = false

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`
