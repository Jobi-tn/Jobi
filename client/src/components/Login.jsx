import React , {useState} from "react"
import axios from "axios"

function login(){
    const [email,setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [error ,setError] = useState("")
}

const handleLogin =(e)=>{
    e.preventDefault()


axios.post("/api/login" , {email,password})
.then((response)=>{

})
.catch((error) => {
    console.log(error);
  });



  return (
    <div className="Login-container">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin}>
            <input
            
            
            
            
            
            
            />
        </form>
    </div>
  )
  
}