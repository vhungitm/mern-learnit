import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
    return (
        <Card
            className='shadow'
            border={
                status === 'LEARNED'
                    ? 'success'
                    : status === 'LEARNING'
                        ? 'warning'
                        : 'danger'
            }
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className='post-title'>{title}</p>
                            <Badge pill bg={
                                status === 'LEARNED'
                                    ? 'success'
                                    : status === 'LEARNING'
                                        ? 'warning'
                                        : 'danger'
                            }>
                                {status}
                            </Badge>
                        </Col>
                        <Col className='text-end'>
                            <ActionButtons url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text style={{ fontSize: 13 }} className='lead'>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SinglePost
