import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'


function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth,
  )

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    // Redirect when logged in
    if(isSuccess || user) {
    navigate('/')
    }
    dispatch(reset())
    
    },[isError, isSuccess, user, message, navigate, dispatch])
    


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()

   


      const userData = {
        email,
        password,
      }
      dispatch(login(userData))
     
    }
  

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Connexion
        </h1>
        <p>Connecter vous pour acceder a votre compte</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Entrez votre e-mail"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Entrez votre mot de passe."
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Envoyer</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
