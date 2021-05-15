import Navbar from './components/Navbar'
import './Home.css'

function Home() {
    return(
        <div className="Home__Page">
            <Navbar />
            <div className="Hero__Section">
                <img src="/Hero_Image.jpg" className="Hero__Image"/>
                <div className="Hero__Text">
                    <div className="TextContainer">
                        <h2>Bienvenue sur le site web du restaurant</h2>
                        <h1>Le Prandia</h1>
                    </div>
                </div>
            </div>
            <div className="Container Dark">
                <h1>Nos Meilleurs Plats.</h1>
                <div className="Plates">
                    <div className="Plat__Card">
                        <img src="/Hero_Image.jpg" />
                        <div className="Plat__Card__Text">
                            <div className="h1">Saumon Fumé à la sauce de curry.</div>
                        </div>
                    </div>
                    <div className="Plat__Card">
                        <img src="/Hero_Image.jpg" />
                        <div className="Plat__Card__Text">
                            <div className="h1">Saumon Fumé à la sauce de curry.</div>
                        </div>
                    </div>
                    <div className="Plat__Card">
                        <img src="/Hero_Image.jpg" />
                        <div className="Plat__Card__Text">
                            <div className="h1">Saumon Fumé à la sauce de curry.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Container">
                <h1>Notre Histoire.</h1>
                <div className="d-flex justify-content-center padding-top" style={{ fontSize: "20px", fontWeight: "normal" }}>
                    <p className="Text">Nous sommes un restaurant grec dont la cuisine est affectée par différentes cultures et régions européennes qui rendent nos plats savoureux et qui 
                    sont de <span className="font-2" style={{ fontSize: "19px", color: "red", fontWeight: "bold"}}>"vrais découvertes"</span> pour vos palais.</p>
                </div>
            </div>
        </div>
    )
}

export default Home;