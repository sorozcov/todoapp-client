import { useEffect, useState } from 'react';
import { Navbar, Row } from 'react-bootstrap';
import './App.css';
import TaskCard from './components/TaskCard';
import TaskEdit from './components/TaskEdit';
import { BASE_API_URL } from './constants';

// import AddTask from './components/TaskCard';


function App() {
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
                throw new Error("Error deleting")
              }
          
        }catch(e){
            alert("New task was not created.");

        }
  }

  const handleDelete =  async (_id) => {
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

  //TODO Organize App.js better
  return (
    <div className="App">
     <>
      
      <Navbar bg="dark" variant="dark" style={{display:'block'}}>
          
          <h1 style={{color:'#44AC99',textAlign:'center'}}>
              Tasks Lists
          </h1>
      </Navbar>

      <div style={{marginLeft:'2vw',marginRight:'2vw',marginBottom:'3vh'}}>
          <TaskEdit handleAddTask={handleAddTask} />
          <Row xs={1} md={2} className="g-4" style={{marginTop:'0.5vh'}}>
              {
                  tasksList.map(
                      task=>{
                          return (<TaskCard key={task._id} {...task} 
                            handleDelete={()=>handleDelete(task._id)} 
                            />)
                      }
                  )
              }
          </Row>
      </div>
      
      </>
    </div>
  );
}

export default App;
