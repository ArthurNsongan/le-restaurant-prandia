const initialState = {
    cartPlates: [ ],
    favoritesPlates: [ ],
    formatNumber: ( price ) => {
        return price
    }
}

function cardActionManagerReducer(state = initialState, action) {
    let nextState
    console.log("Inside Reducer")
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            console.log ("Inside TOGGLE_FAVORITE action")
            const favoritePlateIndex = state.favoritesPlates.findIndex( (item) => (item.id === action.value.id) )
            if (favoritePlateIndex !== -1) {
            // Le logement est déjà dans les favoris, on le supprime de la 
                nextState = {
                    ...state,
                    favoritesPlates: state.favoritesPlates.filter( (item, index) => index !== favoritePlateIndex )
                }
            }
            else {
                // Le logement n'est pas dans les favoris, on l'ajoute à la liste
                let favTemp = state.favoritesPlates
                favTemp.push(action.value)
                nextState = {
                    ...state,
                    favoritesPlates: favTemp
                }
            }
            console.log(nextState.favoritesPlates)
            return nextState || state
        case 'ADD_PLATE': 
            console.log ("Inside ADD_PLATE action")
            console.log(state.cartPlates)
            let cartPlateIndex = state.cartPlates.findIndex( (item) => (item.plate._id === action.value._id) )
            if (cartPlateIndex !== -1) {
            // Le plat est déjà dans le panier, si "count < 2", on incrémente son count
                let cartPlatesTmp = state.cartPlates
                if(cartPlatesTmp[cartPlateIndex].count < 2) {
                    cartPlatesTmp[cartPlateIndex].count += 1;
                }
                nextState = {
                    ...state,
                    cartPlates: cartPlatesTmp
                }
                console.log(cartPlatesTmp)
            }
            else {
                // Le plat n'est pas dans le panier, on l'ajoute à la liste
                let temp = state.cartPlates
                temp.push({ plate: action.value, count: 1 })
                nextState = {
                    ...state,
                    cartPlates: temp
                }
                console.log(nextState.cartPlates)
            }
            return nextState || state
        case 'UPDATE_CART':
            console.log("Inside UPDATE_CART")
            let cartPlateIndex2 = state.cartPlates.findIndex( (item) => (item.plate._id === action.value._id) )
            if (cartPlateIndex2 !== -1) {
            // Le plat est déjà dans le panier, si "count < 2", on incrémente son count
                let cartPlatesTmp = state.cartPlates
                cartPlatesTmp[cartPlateIndex2] = action.value;
                nextState = {
                    ...state,
                    cartPlates: cartPlatesTmp
                }
                console.log(cartPlatesTmp)
            }
            return nextState || state
        case 'DELETE_FROM_CART':
            console.log("Inside DELETE_FROM_CART action")
            let cartPlateToRmvIndex = state.cartPlates.findIndex( (item) => (item.plate._id === action.value._id) )
            let cartPlatesTmp = state.cartPlates
            cartPlatesTmp.splice(cartPlateToRmvIndex, 1)
            nextState = {
                ...state,
                cartPlates: cartPlatesTmp
            }
            console.log(cartPlatesTmp)
            return nextState || state
        default:
            return state
    }
}

export default cardActionManagerReducer;