import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import TaskCard from '../TaskCard';
import TaskEdit from '../TaskEdit';
import { BASE_API_URL } from '../../constants';

function TasksList() {
  const [tasksList,setTasksList] = useState([])

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
                //TODO Change alerts to something more beautiful
                alert("New task created.");
              }else{
                throw new Error("Error creating")
              }
          
        }catch(e){
            alert("New task was not created.");

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
              //TODO Change alerts to something more beautiful
              alert(`Task ${_id} was updated.`);
            }else{
              throw new Error("Error updating")
            }
        
      }catch(e){
        alert(`Task ${_id} was not updated.`);

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
        alert("Task was deleted.");
      }else{
        throw new Error("Error deleting")
      }
  }catch(e){
      console.log(e)
      alert("Task was deleted.");

  }
  }

  
  return (

      <div style={{marginLeft:'2vw',marginRight:'2vw',marginBottom:'3vh'}}>
          <TaskEdit handleAddTask={handleAddTask} />
          <Row xs={1} md={2} className="g-4" style={{marginTop:'0.5vh'}}>
              {
                  tasksList.map(
                      task=>{
                          return (<TaskCard key={task._id} {...task} 
                            handleEditTask={handleEditTask}
                            handleDeleteTask={()=>handleDeleteTask(task._id)} 
                            />)
                      }
                  )
              }
          </Row>
      </div>
  );
}

export default TasksList;
