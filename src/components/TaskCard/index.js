import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


function TaskCard({_id,taskName,taskDescription,handleDelete,handleEdit}) {
  return (
    <Col>
        <Card style={{marginTop:'1vh'}}>
        <Card.Header>Task {_id}</Card.Header>
        <Card.Body>
            <Card.Title className="mb-2 text-muted">{taskName} </Card.Title>
            <Card.Text className="mb-2 text-muted">
            {taskDescription}
            </Card.Text>
            <ButtonGroup  size="sm" className="mb-2" style={{display:'block',textAlign:'right'}}>
                <Button variant="warning" size='sm' style={{color:'white',marginRight:'0.5vw'}}>Edit</Button>
                <Button variant="danger" size='sm' style={{color:'white',marginRight:'0.5vw'}} onClick={()=>handleDelete(_id)}>Delete</Button>
            </ButtonGroup>
        </Card.Body>
        </Card>
    </Col>
  );
}

export default TaskCard;