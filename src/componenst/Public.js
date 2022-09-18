import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Modou Mbye's Repairs!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Manjai Kunda, Darusalam. Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Modou M. Repairs<br />
                    0022 Darusalam Drive<br />
                    
                    <a href="tel:+220 7997921">7997921</a>
                </address>
                <br />
                <p>Owner: Modou Mbye</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public