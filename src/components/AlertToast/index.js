import {Col,Row,Toast,ToastContainer} from 'react-bootstrap';


function AlertToast({variant,message,showAlert,setShowAlert}) {

  return (
    
      <ToastContainer position='top-end'>
        <Toast onClose={() => setShowAlert(false)} show={showAlert} delay={3000} autohide bg={variant} >
          <Toast.Header>
            {message}
          </Toast.Header>
        </Toast>
      
      </ToastContainer>
     
  );
}

export default AlertToast;