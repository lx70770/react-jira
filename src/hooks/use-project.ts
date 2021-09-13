import { useEffect } from 'react'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Project } from 'types/project'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { useAsync } from './use-async'
import { useEditConfig } from './use-optimistic-options'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()

  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return result
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    useEditConfig(queryKey)
  )
}
