import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../contexts/PostContext'
import { useContext } from 'react'

const ActionButtons = ({ url, _id }) => {
    const {
        findPost,
        deletePost,
        setShowUpdatePostModal
    } = useContext(PostContext)

    const choosePost = () => {
        findPost(_id)
        setShowUpdatePostModal(true)
    }

    return (
        <>
            <Button
                variant='link'
                className='post-button'
                href={url}
                target='_blank'
            >
                <img
                    src={playIcon}
                    width={32}
                    height={32}
                    alt='play'
                />
            </Button>
            <Button
                variant='link'
                className='post-button'
                onClick={choosePost}
            >
                <img
                    src={editIcon}
                    width={24}
                    height={24}
                    alt='edit'
                />
            </Button>
            <Button
                variant='link'
                className='post-button'
                onClick={deletePost.bind(this, _id)}
            >
                <img
                    src={deleteIcon}
                    width={24}
                    height={24}
                    alt='delete'
                />
            </Button>
        </>
    )
}

export default ActionButtons
