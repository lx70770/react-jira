import { Form, Input, Button } from 'antd'
import { useAuth } from 'context/auth-context'
import { FormEvent } from 'react'
import { LongButton } from 'unauthenticated-app'

export const RegisterScreen = () => {
	const { register, user } = useAuth()

	const handleSubmit = (values: { username: string; password: string }) => {
		register(values)
	}

	return (
		<Form onFinish={handleSubmit}>
			{user ? <div>{user?.name}</div> : null}
			<Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
				<Input type="text" placeholder="用户名" id="username" />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
				<Input type="password" placeholder="密码" id="password" />
			</Form.Item>
			<Form.Item name="password">
				<LongButton type="primary" htmlType="submit">
					注册
				</LongButton>
			</Form.Item>
		</Form>
	)
}
