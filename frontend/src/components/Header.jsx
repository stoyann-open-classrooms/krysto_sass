import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import Logo from '../assets/logo_krysto.png'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')

  }

  return (
    <header className="header">
      <div className="logo">
        <Link to={'/'}>
          <img src={Logo} alt="" />
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Deconnexion
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to={'/login'}>
                <FaSignInAlt /> Connexion
              </Link>
            </li>
            <li>
              <Link to={'/register'}>
                <FaUser /> Inscription
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
