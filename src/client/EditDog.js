import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Axios is a lightweight HTTP client based on the $http service within Angular.js
//Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';

//Edit Dog component that will edit the clicked on dog with passed id
class EditDog extends Component {
    constructor(props) {
        super(props);
        // store the related to the dog information into the state
        // these should match the dog object from the API
        this.state = {
            name: '',
            age: '',
            breed: '',
            picture: ''
        };

        //this binding is necessary to make `this` work in the callback
        //generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // fetch the related dog data
    componentDidMount() {
        // get the dog API and include the id which is passed via the URL and accessed via props
        axios.get('/api/dog/' + this.props.match.params.id)
            .then(response => {
                //on resonse set the state values to match empty state values set in the constructor
                this.setState({
                    _id: response.data._id,
                    name: response.data.name,
                    age: response.data.age,
                    breed: response.data.breed,
                    picture: response.data.picture,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //once the input boxes are changed, update the state to match the value
    handleChange(event) {
        //name of the input boxes must match the property names in the state
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        //preventDefault() is called on the event when it occurs to prevent a browser reload/refresh
        event.preventDefault();

        // use axios to send a PUT request to the server which includes the updated state information
        axios.put('/api/dog', this.state)
            //on success go to home
            .then(res => this.props.history.push('/'))
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // remember that the name of the input fields should match the state
        return (
            <div className="is-fluid">
                {/*on form submit call handleSubmit()*/}
                <form onSubmit={this.handleSubmit}>
                    <h2 className="title is-1 has-text-primary">Edit Dog</h2>
                    <hr />
                    {/*main container for input fields*/}
                    <div className="container">
                        {/*FIRST COLUMN*/}
                        <div className="columns">
                            <div className="column is-half">
                                <div className="field">
                                    <label className="label"> Name: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="name" value={this.state.name} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Picture: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="picture" value={this.state.picture} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                            </div>
                            {/*SECOND COLUMN*/}
                            <div className="column">
                                <div className="field">
                                    <label className="label"> Age: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="age" value={this.state.age} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Breed: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="breed" value={this.state.breed} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*SUBMIT BUTTON*/}
                        <input className="button is-primary" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditDog;
