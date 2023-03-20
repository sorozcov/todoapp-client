/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { Row ,Modal,Button} from 'react-bootstrap';
import TaskCard from '../TaskCard';
import TaskEdit from '../TaskEdit';
import { BASE_API_URL } from '../../constants';
import AlertToast from '../AlertToast';

function TasksList() {
  const [tasksList,setTasksList] = useState([])
  const [showAlert,setShowAlert] = useState(false)
  const [messageAlert,setMessageAlert] = useState({variant:'success',message:''})
  const [deleteTaskId,setDeleteTaskId] = useState(null)

  //Fetch task list on mount or refresh
  useEffect(()=>{
    const fetchTasksListData = async () => {
      try{
        let  result = await fetch(`${BASE_API_URL}getAll`,{
          method: 'get',
          headers: { 'Content-Type': 'application/json' }
        })
        result = await result.json()        
        setTasksList(result);
      }catch(e){
        console.log(e)
      }
    };

    fetchTasksListData();
  },[])

  //Handle Add Task 
  const handleAddTask = async ({taskName,taskDescription}) => {
      try{
            let  result = await fetch(`${BASE_API_URL}post`,{
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({taskName,taskDescription})
              })
              if(result.status==200){
                result = await result.json()  
                setTasksList([...tasksList,result])
                setShowAlert(true)
                setMessageAlert({message:"New task created correctly.",variant:'success'})
              }else{
                throw new Error("Error creating")
              }
          
        }catch(e){
            setShowAlert(true)
            setMessageAlert({message:"New task was not created.",variant:'danger'});

        }
  }

   //Handle Edit Task 
   const handleEditTask = async ({_id, taskName,taskDescription}) => {
    try{
          let  result = await fetch(`${BASE_API_URL}update/${_id}`,{
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body:JSON.stringify({taskName,taskDescription})
            })
            if(result.status==200){
              result = await result.json()  
              let index_updated = tasksList.findIndex((task)=>task._id==_id)
              setTasksList([...tasksList.slice(0,index_updated),result,...tasksList.slice(index_updated+1)])
              setShowAlert(true)
              setMessageAlert({message:`Task ${_id} was updated correctly.`,variant:'success'})
            }else{
              throw new Error("Error updating")
            }
        
      }catch(e){
        
        setShowAlert(true)
        setMessageAlert({message:`Task ${_id} was not updated.`,variant:'danger'})

      }
}


  const handleDeleteTask =  async (_id) => {
    try{
      //TODO Show modal alert to confirm delete before deleting
       let  result = await fetch(`${BASE_API_URL}delete/${_id}`,{
          method: 'delete',
          headers: { 'Content-Type': 'application/json' },
         
        })
      if(result.status==200){
        result = await result.json()  
        console.log(result)
        setTasksList([...tasksList.filter(task=>task._id!==_id)])
        setShowAlert(true)
        setMessageAlert({message:`Task ${_id} was deleted correctly.`,variant:'success'})
        setDeleteTaskId(null)
      }else{
        throw new Error("Error deleting")
      }
  }catch(e){
      setShowAlert(true)
      setMessageAlert({message:`Task ${_id} was not deleted.`,variant:'danger'})
      setDeleteTaskId(null)
  }
  }

  
  return (
      <>
        <AlertToast message={messageAlert.message} showAlert={showAlert} setShowAlert={setShowAlert} variant={messageAlert.variant}/>
        
        <div style={{marginLeft:'2vw',marginRight:'2vw',marginBottom:'3vh'}}>
            <TaskEdit handleAddTask={handleAddTask} />
            <Row xs={1} md={2} className="g-4" style={{marginTop:'0.5vh'}}>
                {
                    tasksList.map(
                        task=>{
                            return (<TaskCard key={task._id} {...task} 
                                handleEditTask={handleEditTask}
                                handleDeleteTask={()=>{setDeleteTaskId(task._id)}} 
                                />)
                        }
                    )
                }
            </Row>
            
        </div>

        <Modal show={deleteTaskId!=null} onHide={()=>{setDeleteTaskId(null)}}>
            <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this task?</Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setDeleteTaskId(null)}}>
                Cancel
            </Button>
            <Button variant="danger" onClick={()=>{handleDeleteTask(deleteTaskId)}}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default TasksList;
