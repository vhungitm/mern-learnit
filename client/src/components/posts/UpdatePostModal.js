import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
    // Context
    const {
        postState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast
    } = useContext(PostContext)

    // State
    const [updatedPost, setUpdatedPost] = useState(post)
    useEffect(() => setUpdatedPost(post), [post])
    const {
        title,
        description,
        url,
        status
    } = updatedPost

    const onChangeUpdatedPostForm = event => {
        setUpdatedPost({
            ...updatedPost,
            [event.target.name]: event.target.value
        })
    }

    // Add post
    const onSubmit = async event => {
        event.preventDefault()

        const { success, message } = await updatePost(updatedPost)

        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger'
        })

        closeDialog()
    }

    // Close dialog
    const closeDialog = () => {
        setUpdatedPost(post)

        setShowUpdatePostModal(false)
    }

    return (
        <Modal
            show={showUpdatePostModal}
            onHide={closeDialog}
        >
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
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
                            onChange={onChangeUpdatedPostForm}
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
                            onChange={onChangeUpdatedPostForm}
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
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group
                        className='mb-3'
                    >
                        <Form.Control
                            as='select'
                            className='form-select'
                            name='status'
                            value={status}
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
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

export default UpdatePostModal
