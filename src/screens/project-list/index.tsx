import { useEffect, useState } from 'react'
import * as qs from 'qs'
import { apiUrl, cleanObject, useDebounce, useMount } from 'utils/index'
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
	}, [debouncedParam])

	useMount(() => {
		client('users').then(setUsers)
	})

	return (
		<div>
			<SearchPanel users={users || []} param={param} setParam={setParam} />
			<List list={list} users={users} />
		</div>
	)
}
