
import { Accordion,Button,ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import uuid from 'react-uuid';

export default function TaskEdit({isEdit=false,handleAddTask,handleEditTask,handleCancelEdit,initialTaskName='',initialTaskDescription='',_id=''}){
    const [taskName, setTaskName] = useState(initialTaskName)
    const [taskDescription, setTaskDescription] = useState(initialTaskDescription)

    function handleSubmit(e){
        e.preventDefault();
        if(!isEdit){
             handleAddTask({_id:uuid(),taskName,taskDescription}) 
        }else{
            handleEditTask({_id,taskName,taskDescription})
            handleCancelEdit(true)
        }
        setTaskName("")
        setTaskDescription("")
    }
    
    
    return (
        <Accordion defaultActiveKey="0" style={{marginTop:'2vh'}}>
        <Accordion.Item eventKey="0">
            <Accordion.Header>{!isEdit ? "Create new" : "Edit"}  Task</Accordion.Header>
            <Accordion.Body>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="TaskName">
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Task Name"  
                      required
                      value={taskName}
                      onChange={(e)=>setTaskName(e.target.value)}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="TaskDescription">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control  as="textarea" aria-label="With textarea"  placeholder="Enter Task Description" 
                    required
                    value={taskDescription}
                    onChange={(e)=>setTaskDescription(e.target.value)} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <ButtonGroup  size={isEdit ? "sm" : "lg"} className="mb-2" >
                    <Button variant="secondary" type="submit" style={{marginRight:'0.5vw'}} >
                        {isEdit ? 'Edit Task' : 'Create New Task'}
                    </Button >
                    {isEdit && <Button variant="danger" style={{color:'white',marginRight:'0.5vw'}} onClick={handleCancelEdit}>
                        Cancel Edit
                    </Button>}
                </ButtonGroup>
            </Form>

            </Accordion.Body>
            
        </Accordion.Item>
        
        </Accordion>
        )
}