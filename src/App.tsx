import Nav from "./sections/Nav"
import Hero from "./sections/Hero"
import Range from "./sections/Range"
import Demo from "./sections/Demo"
import Metodo from "./sections/Metodo"
import Contatti from "./sections/Contatti"

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <Nav />
      <main id="contenuto">
        <Hero />
        <Range />
        <Demo />
        <Metodo />
        <Contatti />
      </main>
    </>
  )
}
