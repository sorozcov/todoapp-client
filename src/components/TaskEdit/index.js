
import { Accordion,Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import uuid from 'react-uuid';

export default function TaskEdit({isEdit=false,handleAddTask,handleEditTask,initialTaskName='',initialTaskDescription='',_id=''}){
    const [taskName, setTaskName] = useState(initialTaskName)
    const [taskDescription, setTaskDescription] = useState(initialTaskDescription)

    function handleSubmit(e){
        e.preventDefault();
        !isEdit ? handleAddTask({_id:uuid(),taskName,taskDescription}) : handleEditTask({_id,taskName,taskDescription})
        setTaskName("")
        setTaskDescription("")
    }
    
    return (
        <Accordion defaultActiveKey="0" style={{marginTop:'2vh'}}>
        <Accordion.Item eventKey="0">
            <Accordion.Header>Create new Task</Accordion.Header>
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
                <Button variant="secondary" type="submit" >
                    {isEdit ? 'Edit Task' : 'Create New Task'}
                </Button>
            </Form>

            </Accordion.Body>
            
        </Accordion.Item>
        
        </Accordion>
        )
}