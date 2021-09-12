import { Table, TableProps } from 'antd'
import { Project } from 'types/project'
import { User } from 'types/user'

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name)
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
