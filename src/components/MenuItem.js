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

    const [isFavorite, setIsFav] = useState(props.isFavorite)

    console.log(props.plate.name + " : " + props.isFavorite)
    return(
        <div className="Plat__Card">
            <img src={props.plate.image} />
            <div className="Plat__Card__Text">
                <Link to={`/menu/plate/${props.plate._id}`}>
                    <div className="h1">
                        {props.plate.name} <br/>
                        { isFavorite ? <span>
                            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#f00">
                                <path fillRrule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                            </svg>
                            <br/>
                        </span> : '' }
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