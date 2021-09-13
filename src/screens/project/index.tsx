import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import styled from '@emotion/styled'
import { Menu } from 'antd'
import { KanbanScreen } from 'screens/kanban'
import { EpicScreen } from 'screens/epic'

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

export const ProjectScreen = () => {
  const routeType = useRouteType()
  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate(window.location.pathname + '/kanban')
    }
  }, [])

  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <Link to={'kanban'}>看板</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={'epic'}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'/kanban'} element={<KanbanScreen />} />
          <Route path={'/epic'} element={<EpicScreen />} />
        </Routes>
      </Main>
    </Container>
  )
}

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`
