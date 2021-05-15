import { Component } from 'react'
import menu from '../data/menu'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import { connect } from 'react-redux'


class AdminReserv extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        list: [ ],
        currentPage: 1,
        PerPage: 4,
    }

    handleChange = value => {
        this.setState({
          currentPage: value
        });
    };
    
    handleSelectChange = e => {
        this.setState({
          PerPage: e.target.value,
          currentPage: 1
        });
    };

    componentDidMount() {
        menu.then(res => {
            this.setState({ list: res })
            console.log(res)
        })
        console.log("/Reservation : ")
        console.log( this.props.reservations )
        console.log("/Reservation : ")
    }

    removePlate = item => {
        console.log(item); 
        // var config = {
        //     mode: "cors",
        //     headers: {
        //         'x-api-key': '6088038a28bf9b609975a78f'    
        //     }
        // }
        // axios.delete(`https://leprand-2879.restdb.io/rest/menu`, cPlate, config)
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
	    // //On traite la reponse obtenue
        // }).catch(erreur => {
        //     //On traite ici les erreurs éventuellement survenues
        //     alert("serveur indisponible")
        //     console.log(erreur);
        // });
    }

    render() {

        const {
            currentPage,
            PerPage,
          } = this.state;
    
        const indexOfLastLog = currentPage * PerPage;
        const indexOfFirstLog = indexOfLastLog - PerPage;

        return(
            <div className="Admin__Home">
                <h2 className="h2">Administration</h2>
                <div className="Page__Container">
                    <h1>Menu</h1>
                    <table className="Admin__TableList">
                        <thead>
                            <tr>
                                {/* <th>Id</th> */}
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Adresse</th>
                                <th>Prix</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.reservations.map( (item, index) => ( 
                                <tr key={index}>
                                    {/* <td>{item._id}</td> */}
                                    <td>{item.name}</td>
                                    {/* <td>{ item.plates.map((item,index) => ( item.name )) }</td> */}
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>{item.dfdf}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex">
                        <div className="App-heading">
                            <label>Nombre d'éléments </label>
                            <select className="itemSelect" value={ this.state.PerPage }  onChange={this.handleSelectChange} >
                                <option value="4">4 éléments</option>
                                <option value="8">8 éléments</option>
                                <option value="12">12 éléments</option>
                            </select>
                        </div>
                        <div className="Pagination">
                            <Pagination
                                    defaultCurrent={this.state.currentPage}
                                    defaultPageSize={this.state.PerPage}
                                    pageSize={this.state.PerPage}
                                    onChange={this.handleChange}
                                    total={/*loadingOk && */this.state.list.length }
                            />
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

const mapStateToProps = state => ({
    reservations: state.reservations
})

export default connect(mapStateToProps)(AdminReserv)