import Navbar from './components/Navbar'
import PageLoader from './components/PageLoader'
import { connect } from 'react-redux'
import plus from './components/plus.svg'
import minus from './components/minus.svg'
import close from './components/x.svg'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import Toast from './components/Toast'

function Cart(props) {

    let totalCartElements = 0
    
    const [cartPlates, setCartPlates] = useState(props.cartPlates)
    const [cartRender, setCR] = useState(true);

    const removeCartPlate = ( item ) => {
        console.log(item)
        props.dispatch({ type: "DELETE_FROM_CART", value: item})
        setCartPlates(props.cartPlates)
        setCR(!cartRender)
    } 

    const increaseElCount = (item) => {
        console.log(item)
        if(item.count < 2) { 
            item.count++ 
            console.log(item)
            props.dispatch({ type: "UPDATE_CART", value: item})
            setCartPlates(props.cartPlates)
        }
        console.log(cartPlates)
        setCR(!cartRender)
    }

    const makeReserv = () => {
        const reserv = {
            plates: props.cartPlates,
            date: new Date()
            // date: new DateTime().FullDay
        }
        const Toasts = document.querySelector("div.Toasts")
        // props.dispatch({ type: "NEW_RESERVATION", value: reserv })
        // setCartPlates(props.cartPlates)
        // Toasts.appendChild(newToast)
        let newToast = <Toast />
        console.log(newToast)
        ReactDOM.render( newToast, Toasts)
        // if(item.count < 2) { 
        //     item.count++ 
        //     console.log(item)
        //     props.dispatch({ type: "UPDATE_CART", value: item})
        //     setCartPlates(props.cartPlates)
        // }
        // console.log(cartPlates)
        setCR(!cartRender)
    }

    const decreaseElCount = (item) => {
        console.log(item)
        if(item.count > 1) {
            item.count--
            console.log(item)
            props.dispatch({ type: "UPDATE_CART", value: item})
        }
        setCartPlates(props.cartPlates)
        console.log(cartPlates)
        setCR(!cartRender)
    }
    
    return(
        <div className="Cart">
            <Navbar />
            <PageLoader stop={true}/>
            <div className="Container">
                <h1 className="padding-top font-2 h1 Page__Heading">Panier</h1>
                <div className="Cart__List">
                    {/* { props.cartPlates.map( (item, index) => (
                        <div className="Cart__Item" key={index}>
                            <div className="Cart__Item__Name">{ item.plate.name }</div><br />
                            <div className="Cart__Item__Price">{item.plate.price} x { item.count }</div><br />
                            <div className="Cart__Item__Total">Total : <span className="totalPrice">{ item.plate.price * item.count } F cfa</span></div><br />
                        </div>
                    ))} */}
                    <table className="Cart__TableList">
                        <thead>
                            <tr>
                                <td>Plat</td>
                                <td>Quantité</td>
                                <td>Total</td>
                                <td className="remove"></td>
                            </tr>
                        </thead>
                        <tbody>
                            { cartPlates.length === 0 ? 
                                (
                                    <tr>
                                        <td colSpan={4} style={{ textAlign: "center", backgroundColor: "#80808011" }}>Aucune</td>
                                    </tr>
                                )
                            : cartPlates.map( (item, index) => {
                                totalCartElements += (item.plate.price * item.count)
                                return(
                                    <tr key={index}>
                                        <td>
                                            <Link to={ `/menu/plate/${item.plate._id}` }>
                                                <div className="d-flex align-items-center">
                                                    <img width="120" style={{ paddingRight: "15px" }} src={item.plate.image} />
                                                    <div>
                                                        { item.plate.name } <br />
                                                        <i>{item.plate.category}</i>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img src={minus} className="point" onClick={ (e) => decreaseElCount(item) }/>
                                                <span style={{ padding: "0px 10px"}}>{ item.count }</span>
                                                <img src={plus} className="point" onClick={ (e) => increaseElCount(item) } />
                                            </div>
                                        </td>
                                        <td>{ item.plate.price * item.count } F cfa</td>
                                        <td>
                                            <img src={ close } className="point" onClick={ removeCartPlate.bind(this, item) }/>
                                        </td>
                                    </tr>
                                )
                            } )}
                            {/* <tr>
                                <td>Plat</td>
                                <td>Quantité</td>
                                <td>Total</td>
                                <td>Supprimer</td>
                            </tr> */}
                        </tbody>
                    </table>
                    <h2 className="Total__Price">Total : { totalCartElements } Fcfa</h2>
                    <div className="d-flex">
                        <button className="makeReserv" onClick={makeReserv}><h2>Valider la Commande</h2></button>
                    </div>
                </div>
            </div>
            <div className="Toasts">
                <Toast />
            </div>
        </div>
    );

}

const mapStateToProps = (state) => ({
    favoritesPlates: state.favoritesPlates,
    cartPlates: state.cartPlates,
    formatNumber: state.formatNumber
})

export default connect(mapStateToProps)(Cart);