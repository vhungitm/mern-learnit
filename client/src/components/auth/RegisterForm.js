import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
    // Context
    const { registerUser } = useContext(AuthContext)

    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const { username, password, confirmPassword } = registerForm

    const [alert, setAlert] = useState(null)

    const onChangeRegisterForm = event => setRegisterForm({
        ...registerForm,
        [event.target.name]: event.target.value
    })

    const register = async event => {
        event.preventDefault()

        if (password !== confirmPassword) {
            setAlert({
                type: 'danger',
                message: 'Passwords do not match'
            })

            setTimeout(() => {
                setAlert(null)
            }, 5000);

            return
        }

        const registerData = await registerUser(registerForm)

        if (!registerData.success) {
            setAlert({
                type: 'danger',
                message: registerData.message
            })

            setTimeout(() => {
                setAlert(null)
            }, 5000);
        }
    }

    return (
        <Form
            className='my-4'
            onSubmit={register}
        >
            <AlertMessage info={alert} />
            <Form.Group className='mb-3'>
                <Form.Control
                    type='text'
                    name='username'
                    placeholder='Username'
                    required
                    value={username}
                    onChange={onChangeRegisterForm}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                    value={password}
                    onChange={onChangeRegisterForm}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={onChangeRegisterForm}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Button
                    type='submit'
                    variant='primary'
                >Register</Button>
            </Form.Group>
            <p>Already have an account?
                <Link to='/login'>
                    <Button
                        variant='info'
                        size='sm'
                        className='ms-2'
                    >Login</Button>
                </Link>
            </p>
        </Form>
    )
}

export default RegisterForm
