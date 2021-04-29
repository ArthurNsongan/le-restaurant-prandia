import { Component } from 'react'
import menu from '../data/menu'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import axios from 'axios'

class AdminHome extends Component {

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
        var config = {
            mode: "cors",
            headers: {
                'x-api-key': '6088038a28bf9b609975a78f'    
            }
        }
        axios.get('https://leprand-2879.restdb.io/rest/menu', config)
        .then(res => {
            this.setState({ list: res.data })
            console.log(res.data)
        })
    }

    removePlate = cPlate => {
        console.log(cPlate); 
        var config = {
            mode: "cors",
            headers: {
                'x-api-key': '6088038a28bf9b609975a78f'    
            }
        }

        axios.delete(`https://leprand-2879.restdb.io/rest/menu/${cPlate._id}`, cPlate, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("Le plat a été supprimé !!!")
	    //On traite la reponse obtenue
        }).catch(erreur => {
            //On traite ici les erreurs éventuellement survenues
            alert("serveur indisponible")
            console.log(erreur);
        });
    }

    render() {

        const {
            currentPage,
            PerPage,
          } = this.state;
    
        const indexOfLastLog = currentPage * PerPage;
        const indexOfFirstLog = indexOfLastLog - PerPage;

        return(
            <div class="AddLogCont">
                <div className="PlateForm">
                <div className="Admin__Home">
                <h2 className="h2">Administration</h2>
                <div className="Page__Container">
                    <h1>Menu</h1>
                    <div className="actions d-flex " style={{ padding: "15px 0" }}>
                        <Link to={"/admin/menu/add-plate"} style={{ marginRight: "5px" }}>Ajouter un plat</Link>
                    </div>
                    <table className="Admin__TableList">
                        <thead>
                            <tr>
                                {/* <th>Id</th> */}
                                <th>Image</th>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Catégorie</th>
                                <th>Prix</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.list.slice(indexOfFirstLog, indexOfLastLog).map( (item, index) => ( 
                                <tr key={index}>
                                    {/* <td>{item._id}</td> */}
                                    <td>
                                        <img src={item.image} width="100" height="100"  style={{ objectFit: "cover" }} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to={"/admin/menu/edit-plate/"+ item._id } style={{ marginRight: "5px" }}>Editer</Link>
                                            <button className="" onClick={ () => this.removePlate(item) }>Supprimer</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center align-items-center" style={{ padding: "15px"}}>
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
                                    current={this.state.currentPage}
                                    total={/*loadingOk && */this.state.list.length }
                                    className="d-flex align-items-center"
                                    style={{ listStyle: "none" }}
                                />
                        </div>
                    </div>
                </div>
            </div> 
        
                </div>
            </div>)
    }
}

export default AdminHome