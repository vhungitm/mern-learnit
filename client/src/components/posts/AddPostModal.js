import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
    // Context
    const {
        showAddPostModal,
        setShowAddPostModal,
        addPost,
        setShowToast
    } = useContext(PostContext)

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const { title, description, url } = newPost

    const onChangeNewPostForm = event => {
        setNewPost({
            ...newPost,
            [event.target.name]: event.target.value
        })
    }

    // Add post
    const onSubmit = async event => {
        event.preventDefault()

        const { success, message } = await addPost(newPost)

        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger'
        })

        closeDialog()
    }

    // Close dialog
    const closeDialog = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })

        setShowAddPostModal(false)
    }

    return (
        <Modal
            show={showAddPostModal}
            onHide={closeDialog}
        >
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form
                onSubmit={onSubmit}
            >
                <Modal.Body>
                    <Form.Group
                        className='mb-3'
                    >
                        <Form.Control
                            type='text'
                            name='title'
                            placeholder='Title'
                            area-aria-describedby='title-help'
                            required
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text
                            id='title-help'
                            muted
                        >
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group
                        className='mb-3'
                    >
                        <Form.Control
                            as='textarea'
                            rows={3}
                            name='description'
                            placeholder='Description'
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group
                        className='mb-3'
                    >
                        <Form.Control
                            type='text'
                            name='url'
                            placeholder='Url'
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type='button'
                        variant='secondary'
                        onClick={closeDialog}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant='primary'
                    >
                        LearnIt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal
