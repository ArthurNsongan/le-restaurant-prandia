import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Menu from './Menu'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cart from './Cart';
import { connect } from 'react-redux'
import PageLoader from './components/PageLoader';
import AddPlate from './admin/AddPlate'
import Plate from './Plate';

function App(props) {

  console.log("Favorite Plates : ")
  console.log(props.favoritesPlates)
  return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path='/menu'>
              <Menu />
            </Route>
            <Route path="/admin/menu/add-plate">
              <AddPlate />
            </Route>
            <Route path="/menu/plate/:id" component={ Plate } />
            <Route path="/cart">
              <Cart />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

const mapStateToProps = state => {
  return {
    favoritesPlates: state.favoritesPlates,
    cartPlates: state.cartPlates,
    formatNumber: state.formatNumber
  }
}

export default connect(mapStateToProps)(App);

// export default App;
