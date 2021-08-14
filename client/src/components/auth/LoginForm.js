import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
    // Context
    const { loginUser } = useContext(AuthContext)

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const { username, password } = loginForm

    const [alert, setAlert] = useState(null)

    const onChangeLoginForm = event => setLoginForm({
        ...loginForm,
        [event.target.name]: event.target.value
    })

    const login = async event => {
        event.preventDefault()

        const loginData = await loginUser(loginForm)

        if (loginData.success) {
        } else {
            setAlert({
                type: 'danger',
                message: loginData.message
            })

            setTimeout(() => {
                setAlert(null)
            }, 5000);
        }
    }

    return (
        <Form
            className='my-4'
            onSubmit={login}
        >
            <AlertMessage info={alert} />
            <Form.Group className='mb-3'>
                <Form.Control
                    type='text'
                    name='username'
                    placeholder='Username'
                    required
                    value={username}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                    value={password}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Button
                    type='submit'
                    variant='primary'
                >Login</Button>
            </Form.Group>
            <p>Don't have an account?
                <Link to='/register'>
                    <Button
                        variant='info'
                        size='sm'
                        className='ms-2'
                    >Register</Button>
                </Link>
            </p>
        </Form>
    )
}

export default LoginForm
