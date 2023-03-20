import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState } from 'react';
import TaskEdit from '../TaskEdit';

function TaskCard({_id,taskName,taskDescription,handleDeleteTask,handleEditTask}) {
  const [isEditing,setIsEditing] = useState(false)
  const handleCancelEdit = ()=>{
    setIsEditing(false)
  }
  return (
    <Col>
        <Card style={{marginTop:'1vh'}}>
        <Card.Header>Task {_id}</Card.Header>
        {!isEditing  && <Card.Body>
             <Card.Title className="mb-2 text-muted">{taskName} </Card.Title>
            <Card.Text className="mb-2 text-muted">
            {taskDescription}
            </Card.Text>
            <ButtonGroup  size="sm" className="mb-2" style={{display:'block',textAlign:'right'}}>
                <Button variant="warning" size='sm' style={{color:'white',marginRight:'0.5vw'}} onClick={()=>{setIsEditing(true)}}>Edit</Button>
                <Button variant="danger" size='sm' style={{color:'white',marginRight:'0.5vw'}} onClick={()=>handleDeleteTask(_id)}>Delete</Button>
            </ButtonGroup>
        </Card.Body> }
        {isEditing && <Card.Body>
              <TaskEdit handleEditTask={handleEditTask} handleCancelEdit={handleCancelEdit} isEdit={true} initialTaskName={taskName} initialTaskDescription={taskDescription} _id={_id} />
          </Card.Body>}
        </Card>
    </Col>
  );
}

export default TaskCard;