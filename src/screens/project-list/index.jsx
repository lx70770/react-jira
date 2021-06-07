import { useEffect, useState } from 'react'
import * as qs from 'qs'
import { apiUrl, cleanObject, useDebounce, useMount } from 'utils/index'
import { List } from './list'
import { SearcePanel } from './search-panel'

export const ProjectListScreen = () => {
	const [param, setParam] = useState({
		name: '',
		personId: ''
	})

	const [users, setUsers] = useState([])
	const [list, setList] = useState([])
	const debouncedParam = useDebounce(param, 2000)

	useEffect(() => {
		fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
			if (response.ok) {
				setList(await response.json())
			}
		})
	}, [debouncedParam])

	useMount(() => {
		fetch(`${apiUrl}/users`).then(async response => {
			if (response.ok) {
				setUsers(await response.json())
			}
		})
	})

	return (
		<div>
			<SearcePanel users={users} param={param} setParam={setParam} />
			<List list={list} users={users} />
		</div>
	)
}
