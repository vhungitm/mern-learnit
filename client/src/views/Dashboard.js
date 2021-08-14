import { PostContext } from '../contexts/PostContext'
import { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import UpdatePostModal from '../components/posts/UpdatePostModal'

const Dashboard = () => {
    useEffect(() => {
        getPosts()
    }, [])

    const {
        postState: {
            posts,
            post,
            postsLoading
        },
        getPosts,
        setShowAddPostModal,
        showToast: { show, message, type },
        setShowToast
    } = useContext(PostContext)

    let body = null
    if (postsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='primary' />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <Card className='text-center mx-5 my-5'>
                <Card.Header as='h1'>Hi Hung</Card.Header>
                <Card.Body>
                    <Card.Title>Welcome to Learn It</Card.Title>
                    <Card.Text>Click the button below to track your first skill to learn</Card.Text>
                    <Button
                        variant='primary'
                        onClick={() => setShowAddPostModal(true)}
                    >
                        LearnIt
                    </Button>
                </Card.Body>
            </Card>
        )
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map(post =>
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} />
                        </Col>
                    )}
                </Row>
                <OverlayTrigger
                    playment='left'
                    overlay={<Tooltip>Add a new thing to learn</Tooltip>}
                >
                    <Button
                        className='btn-floating bg-transparent border-0'
                        onClick={setShowAddPostModal.bind(this, true)}
                    >
                        <img
                            src={addIcon}
                            width={40}
                            height={40}
                            alt='Add post'
                        />
                    </Button>
                </OverlayTrigger>
            </>
        )
    }

    return (
        <>
            {body}
            <AddPostModal />
            {post && <UpdatePostModal />}

            {/* After post is added, show toast */}
            <Toast
                show={show}
                style={{
                    position: 'fixed',
                    top: '20%',
                    right: '10px'
                }}
                className={`bg-${type} text-white`}
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: '',
                    type: false
                })}
                delay={3000}
                autohide
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </>
    )
}

export default Dashboard
