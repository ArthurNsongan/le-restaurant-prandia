import { Component } from 'react'
import axios from 'axios'

class AddPlate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cPlate: {
                image: null,
                category: "Boisson",
                name: "",
                description: "",
                price: 0,
            }
        }
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('https://leprand-2879.restdb.io/rest/menu', formData)
    //     .then( res => {
    //         console.log(res)
    //     })
    // }

    handleChange = (e) => {
        if(e.target.name === "image") {
            let Image = e.target.files[0];
            console.log(Image)
            if( Image.type === "image/jpeg" || Image.type === "image/webp" || Image.type === "image/png") {
                let cPlateTmp = this.state.cPlate
                cPlateTmp.image = Image
                this.setState({ cPlate: cPlateTmp })
                console.log(this.state.cPlate);
            } else { alert("Ce n'est pas une image !!") }
        }
        else {
            let cPlateTmp = this.state.cPlate
            this.setState({ cPlate: cPlateTmp })            
            cPlateTmp[e.target.name] = e.target.value
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        // console.log(this.state.cLogImageUpload)
        console.log(this.state.cPlate)
        const formData = new FormData();
        formData.append('file', this.state.cPlate.image);
        formData.append('upload_preset','ml_default')
        const options = {
            method: 'POST',
            body: formData
        };

        // this.savePlate(this.state.cPlate)
        
        axios.post(`https://api.cloudinary.com/v1_1/dvfqx32z9/image/upload/`, formData)
            .then( res => {
                console.log(res.data.url )
                let cPlateTmp = {
                    ...this.state.cPlate,
                    image: res.data.url
                }
                console.log(cPlateTmp)
                this.savePlate(cPlateTmp)
            }).catch( erreur => {
                let err = "Upload Error : " + erreur;
                console.log(err);
                alert(err);
            });

        console.log()
    }

    savePlate = ( cPlate ) => {
        console.log(cPlate);
        var config = {
            mode: "cors",
            headers: {
                'x-api-key': '6088038a28bf9b609975a78f'    
            }
        }
        axios.post(`https://leprand-2879.restdb.io/rest/menu`, cPlate, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("Le plat a été bien enregistré !!!")
	    //On traite la reponse obtenue
        }).catch(erreur => {
            //On traite ici les erreurs éventuellement survenues
            alert("Serveur indisponible !")
            console.log(erreur);
        });
    }

    render() {
        return(
            <div className="AddLogCont">
                <div className="AddLogForm">
                <form id="form" onSubmit={this.handleSubmit} onLoad={ () => this.loadForm() } encType="">
                    {/* <label> 
                        Nom : 
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label> */}
                    <h3 className="">Ajouter un plat</h3>

                    <div className="ALF__Label">
                        <label> Catégorie : </label>
                        <select name="category" value={this.state.category} onChange={this.handleChange}>
                                <option value="Plat">Plat</option>
                                <option value="Boisson">Boisson</option>
                                <option value="Dessert">Dessert</option>
                        </select>
                    </div>

                    <div className="ALF__Label">
                        <label> Nom du Plat : </label>
                        <input type="text" name="name" value={this.state.cPlate.name} onChange={this.handleChange} />
                    </div>

                    <div className="ALF__Label">
                        <label> Description : </label>
                        <textarea name="description" onChange={this.handleChange} value={this.state.cPlate.description}></textarea>
                    </div>
                    <div className="ALF__Label">
                        <label> Prix : </label>
                        <input type="text" name="price" value={this.state.cPlate.price} onChange={this.handleChange} />
                    </div>

                    <div className="ALF__Label">
                        <label> Image : </label>
                        <input type="file" name="image" onChange={this.handleChange} />
                    </div>

{/* 
                    <div className="ALF__Label">
                        <label> Images : </label>
                        <label htmlFor="roomImage" id="roomImageSelect" disabled={ this.state.cPlateImages.length === 4}> Sélectionner une image </label>
                        <input name="roomImage" id="roomImage2" type="file" 
                            onChange={this.handleChange} disabled={ this.state.cPlate === 4} />
                        <div className="uploadedRoomIamges">
                            { this.state.cPlateImages.map( (url, index) => (
                                <div className="imageLoader" key={index}>
                                    <img src={url}  width="100" height="100" />
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="current" width="18" height="18" viewBox="0 0 18 18">
                                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                                        </svg>								
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div> */}
                    <br/>
                    <input type="submit" value="Envoyer" className="submitBtn"/>
                    {/* <br/>
                    <h2>{this.state.value}</h2> */}
                </form>
            
                </div>
            
            </div>
        )
    }

}

export default AddPlate