import Navbar from './components/Navbar'
import { Plates } from './data/platesData'
import axios from 'axios'
import menu from './data/menu'
import { useEffect, useState } from 'react';
import PageLoader from './components/PageLoader';
import MenuItem from './components/MenuItem';
import { connect } from 'react-redux';

function Menu(props) {

    const [loaded, setLoaded] = useState(false)

    const [plates, setPlates] = useState([]);

    useEffect(() => {
        if(loaded === false) {
            var config = {
                mode: "cors",
                headers: {
                    'x-api-key': '6088038a28bf9b609975a78f'    
                }
            }
            axios.get('https://leprand-2879.restdb.io/rest/menu', config)
            // menu
            .then( res => {
                // console.log(res)
                setPlates(res.data)
                // setEntries( Plates.filter( item => ( item.category === "Plat" ) ) )
                // setDesserts( desserts = Plates.filter( item => ( item.category === "Dessert") ) )
                // setBoissons( Plates.filter( item => ( item.category === "Boisson") ) )
                setLoaded(true)
                // console.log(plates)
            })
        }
    })

    // const toggleFavoritePlate = (item) => {
    //     const action = { type: "TOGGLE_FAVORITE", value: }
    // }

    return(
        <div className="Menu">
            <Navbar />
            <PageLoader stop={loaded}/>
            <div className="Container">
                <h1 className="padding-top font-2 h1 Page__Heading">MENU</h1>
                <div className="Menu__Category">
                    <div className="Menu__Category__Item font-2 h1">Nos Entrées</div>
                    <div className="Plates">
                        { plates.filter( item => ( item.category === "Plat" ) ).map( (plate, index) => (
                            // <div className="Plat__Card" key={index}>
                            //     <img src={plate.image} />
                            //     <div className="Plat__Card__Text">
                            //         <div className="h1">{plate.name}</div>
                            //         <div className="price font-2">{plate.price}</div>
                            //         <button>Ajouter au Panier</button>
                            //         <button>Ajouter aux plats préférés</button>
                            //     </div>
                            // </div>
                            <MenuItem plate={plate} key={index} 
                            isFavorite = {
                                props.favoritesPlates.findIndex( (item) => (item._id === plate._id) ) !== -1
                            }/>
                        ))}     
                    </div>
                </div>
                <div className="Menu__Category">
                    <div className="Menu__Category__Item font-2 h1">Nos Boissons</div>
                    <div className="Plates">    
                        { plates.filter( item => ( item.category === "Boisson" ) ).map( (plate, index) => (
                            // <div className="Plat__Card" key={index}>
                            //     <img src={plate.image} />
                            //     <div className="Plat__Card__Text">
                            //         <div className="h1">{plate.name}</div>
                            //     </div>
                            // </div>
                            <MenuItem plate={plate} key={index} 
                                isFavorite = {
                                    props.favoritesPlates.findIndex( (item) => (item._id === plate._id) ) !== -1
                                } />
                        ))} 
                    </div>
                </div>
                <div className="Menu__Category">
                    <div className="Menu__Category__Item font-2 h1">Nos Desserts</div>
                    <div className="Plates">
                        { plates.filter( item => ( item.category === "Dessert" ) ).map( (plate, index) => (
                            // <div className="Plat__Card" key={index}>
                            //     <img src={plate.image} />
                            //     <div className="Plat__Card__Text">
                            //         <div className="h1">{plate.name}</div>
                            //     </div>
                            // </div>
                            <MenuItem plate={plate} key={index} 
                            isFavorite = {
                                props.favoritesPlates.findIndex( (item) => (item._id === plate._id) ) !== -1
                            }/>
                        ))} 
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    favoritesPlates: state.favoritesPlates,
    cartPlates: state.cartPlates
})

export default connect(mapStateToProps)(Menu)