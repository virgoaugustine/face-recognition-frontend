import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo/Logo';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import ImageLink from './components/ImageLink/ImageLink';
import Entries from './components/Entries/Entries';
import RecognitionResults from './components/RecognitionResults/RecognitionResults';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const baseURL = 'https://safe-springs-49156.herokuapp.com';

const particleOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
};

const initialState = {
  inputField: '',
  imageUrl: '',
  box: {},
  route:'signIn',
  user: {
    id:'',
    name:'',
    email:'',
    entries: 0,
    joined: '',
  }
}

class App extends Component {
  constructor(){
    super()
    this.state = initialState;
  }
  onInputChange = (event) => {
    this.setState({inputField: event.target.value})
  }

  loadUser = (data) =>{
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
     
    }
    })
  }

  onDetectClick = () => {
    this.setState({imageUrl: this.state.inputField})
    fetch(`${baseURL}/imageurl`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url: this.state.inputField})
    })
    .then(response => response.json())
    .then(response => {
      if(typeof response != typeof 'hello'){
        // update entry count in db
      fetch(`${baseURL}/entry`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: this.state.user.id})
      })
      .then(response => response.json())
      .then(entryValue => this.setState(Object.assign(this.state.user, {entries: entryValue})));

      // draw square around the detected face
      this.displayFaceBox(this.getFaceLocations(response))

    } else {
        console.log('Could not process image.')
    }
  })
    
 
  }

  onRouteChange = (route) => {
    if(route === 'signIn'){
      this.setState(initialState)
    }
    this.setState({route: route});
  }
  getFaceLocations = (data) => {

    const face = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)

    } 
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  renderSwitch = (route) => {
    switch ( route ) {
      default:
          return (<div>
            <p>Error...</p>
          </div>)
      
      case 'signIn':
          return (<SignIn loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />)

        
      case 'register':
          return (<Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />)
      
      case 'home':
         return (<div>
          <Navigation onRouteChange={this.onRouteChange}/>
          <Logo />
          <Entries NumEntries={this.state.user.entries} userName = {this.state.user.name} />
          <ImageLink onInputChange = {this.onInputChange} onDetectClick={this.onDetectClick}/>
          <RecognitionResults imageUrl={this.state.imageUrl} box={this.state.box}/>
          </div>)
    }
   
  };

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        {this.renderSwitch(this.state.route)}
      </div>
    )
    }

    
}
  

export default App;
