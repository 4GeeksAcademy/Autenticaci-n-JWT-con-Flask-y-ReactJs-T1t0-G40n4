import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"


export const Signup = () => {

    const navigate = useNavigate() 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignup = async (email, password) => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

            const response = await fetch(`${backendUrl}/api/create-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await response.json()
            

            if(response.ok){
                return data
            } else{
                setError(data.error || "Error al registrar usuario")
                return undefined
            }

        } catch (error){
            setError(error.message || "Error al iniciar sesion" )
            console.error(error)
        }       
    }
    const handleOnSubmit = async(evt) => {
            evt.preventDefault();

           const response= await handleSignup(email,password)

           if(response){
            navigate('/login')
           } else {
            setError('Error login')
           }

        }

        return (
             <section className="container d-flex flex-column align-items-center justify-content-center">
            { error &&
                <div className="alert alert-danger">
                    {error}
                </div>
            }

            <form className="w-25" onSubmit={handleOnSubmit}>
                <h1 className="text-center mb-4">Registro</h1>
                <fieldset className="d-flex flex-column mb-3">
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" required
                        onChange={(evt) => setEmail(evt.target.value)} />
                </fieldset>
                <fieldset className="d-flex flex-column mb-3">
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Enter your password" required onChange={(evt) => setPassword(evt.target.value)} />
                    <button type="submit" className="btn btn-success mt-3">
                        Registrarse
                    </button>
                </fieldset>
            </form>
        </section>
        )
    }