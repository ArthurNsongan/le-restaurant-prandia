import { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function MenuItem(props) {

    const toggleFavoritePlate = () => {
        setIsFav( !isFavorite )
        const action = {
            type: "TOGGLE_FAVORITE",
            value: props.plate
        }
        props.dispatch(action)
        console.log(props.favoritesPlates)
    }

    const addPlateToCart = () => {
        const action = {
            type: "ADD_PLATE",
            value: props.plate
        }
        props.dispatch(action)
    }

    const [isFavorite, setIsFav] = useState(false)

    return(
        <div className="Plat__Card">
            <img src={props.plate.image} />
            <div className="Plat__Card__Text">
                <Link to={`/menu/plate/${props.plate._id}`}>
                    <div className="h1">
                        {props.plate.name} <br/>
                        <span style={{ fontFamily: 'SF Pro Display', fontSize: '20px'}}>{props.plate.price} F CFA  </span>
                    </div>
                </Link>
                {/* <button className="addPlateBtn" onClick={addPlateToCart}>Ajouter au Panier</button>
                <button className="toggleFavBtn" onClick={toggleFavoritePlate}>{
                    isFavorite ? "Ajouté aux plats préférés" : "Ajouter aux plats préférés"
                }</button> */}
            </div>
        </div>
    )

}

const mapStateToProps = state => ({
    favoritesPlates: state.favoritesPlates,
    cartPlates: state.cartPlates,
    formatNumber: state.formatNumber
})

export default connect(mapStateToProps)(MenuItem);