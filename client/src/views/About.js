import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const About = () => {
    return (
        <Row className='mt-5'>
            <Col className='text-center'>
                <img
                    src='https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/142167099_768071137454925_4728938398898819006_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=YDvg7hrRQOYAX-hczVL&tn=RjcZU4U_DKFbvpM0&_nc_ht=scontent-hkg4-1.xx&oh=8c140afe7f11000b18611a710de5fcba&oe=613080D0'
                    width={400}
                    height={400}
                    alt='Facebook profile'
                    className='rounded-circle mb-3'
                />
                <p>
                    <b>Họ tên:</b> Trần Văn Hùng
                </p>
                <br />
                <Button
                    variant='primary'
                    href='https://fb.com/vhungitm'
                    size='lg'
                >
                    Visit my facebook profile
                </Button>
            </Col>
        </Row>
    )
}

export default About
