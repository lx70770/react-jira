import { Table, TableProps } from 'antd'
import { Pin } from 'components/pin'
import { useEditProject } from 'hooks/use-project'
import { Link } from 'react-router-dom'
import { Project } from 'types/project'
import { User } from 'types/user'
import { useProjectsQueryKey } from './util'

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
          }
        },
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (_, project) => {
            return <Link to={String(project.id)}>{project.name}</Link>
          }
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          render(value, project) {
            return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
          }
        }
      ]}
      {...props}
    />
  )
}
