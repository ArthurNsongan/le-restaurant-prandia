import { Component } from 'react'
import Navbar from './components/Navbar';
import menu from './data/menu'
import axios from 'axios'
import { connect } from 'react-redux'
import PageLoader from './components/PageLoader';

class Plate extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        plate: {  },
        isFavorite: false,
        isLoaded: false
    }

    toggleFavoritePlate = () => {
        let isFavTmp = this.state.isFavorite
        this.setState({ isFavorite: !isFavTmp })
        const action = {
            type: "TOGGLE_FAVORITE",
            value: this.state.plate
        }
        this.props.dispatch(action)
    }

    addPlateToCart = () => {
        const action = {
            type: "ADD_PLATE",
            value: this.state.plate
        }
        this.props.dispatch(action)
    }

    componentDidMount() {

        const params = this.props.match.params;

        console.log(params);
        var config = {
            mode: "cors",
            headers: {
                'x-api-key': '6088038a28bf9b609975a78f'    
            }
        }
        axios.get('https://leprand-2879.restdb.io/rest/menu', config)
        // menu
        .then( res => {
                console.log(res)
                let plateTmp = res.data.filter( (item, index) => ( item._id === params.id ) )
                this.setState({ plate: plateTmp[0] })
                setTimeout( () => { this.setState({ isLoaded: true}) } , 500)
                // setEntries( Plates.filter( item => ( item.category === "Plat" ) ) )
                // setDesserts( desserts = Plates.filter( item => ( item.category === "Dessert") ) )
                // setBoissons( Plates.filter( item => ( item.category === "Boisson") ) )
                console.log(plateTmp)
        })

        console.log("Plate Component")
    }

    render() {
        const { plate } = this.state
        return(
            <div className="Plate">
                <Navbar />
                <PageLoader stop={ this.state.isLoaded }/>
                <div className="Plate__Container">
                    <div className="Container">
                        <img width="100%" height="400" style={{ objectFit: "cover" }} src={ plate.image } alt={ plate.name } />
                        <div className="Plate__Container__Text">
                            <h1 className="font-2 Plate__Heading my-0">{ plate.name }</h1><br />
                            <div style={{ fontFamily: 'SF Pro Display', fontSize: '25px', padding: "25px 0"}}>{ plate.price} F CFA  </div>
                            <span style={{ padding:"10px 0px", display: "block", fontSize: "17px", fontStyle: "italic"}}>Max de plats : 2</span>
                            <div className="d-flex align-items-center">
                            <button className="addPlateBtn" onClick={this.addPlateToCart}>Ajouter au Panier</button>
                                <button disabled={false} className="toggleFavBtn" onClick={this.toggleFavoritePlate}>{
                                    this.state.isFavorite ? 
                                    (<div className="d-flex align-items-center">
                                        <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                                        </svg>
                                        Préféré
                                    </div>) : "Ajouter aux préférés"
                                }</button>
                            </div>
                        </div>
                        <div className="TextContainer">
                            <p className="padding-top" style={{ fontSize: "20px"}}>{ plate.description }</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    favoritesPlaces: state.favoritesPlaces,
    cartPlates: state.cartPlates,
    formatNumber: state.formatNumber
})



export default connect(mapStateToProps)(Plate)