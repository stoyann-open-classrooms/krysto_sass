import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
function Home() {
  return (
    <>
      <section className="heading">
        <h1>Vous avez besoin d'aide ?</h1>
        <p>Merci de choisir une option ci-dessous</p>
      </section>
      <Link to={'/new-tickets'} className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Créer un ticket
      </Link>
      <Link to={'/tickets'} className="btn btn-block">
        <FaTicketAlt /> Voir mes tickets
      </Link>
    </>
  )
}

export default Home
