import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import { AuthContext } from '../../contexts/AuthContext'

const NavbarMenu = () => {
    const {
        authState: { user: { username } },
        logoutUser
    } = useContext(AuthContext)

    const logout = () => {
        logoutUser()
    }

    return (
        <Navbar
            bg='primary'
            variant='dark'
            className='shadow px-3'
        >
            <Navbar.Brand
                className='fw-bold text-white'
            >
                <img src={learnItLogo}
                    className='me-2'
                    alt='Learn it'
                    width={32}
                    height={32}
                />
                Learn It
            </Navbar.Brand>
            <Navbar.Toggle
                aria-controls='basic-navbar-nav'
            />
            <Navbar.Collapse
                id='basic-navbar-nav'
            >
                <Nav
                    className='me-auto'
                >
                    <Nav.Link
                        className='fw-bold text-white'
                        to='/dashboard'
                        as={Link}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        className='fw-bold text-white'
                        to='/about'
                        as={Link}
                    >
                        About
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link
                        className='fw-bold text-white'
                        disabled
                    >
                        Welcome {username}
                    </Nav.Link>
                    <Button
                        variant='info'
                        className='fw-bold text-white'
                        onClick={logout}
                    >
                        <img
                            src={logoutIcon}
                            width={20}
                            height={20}
                            alt='Logout'
                            className='me-2'
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu
