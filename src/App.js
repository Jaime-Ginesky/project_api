import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const app = new Clarifai.App({
  apiKey: 'b23c963c398542eabc63bd248e12ed75'
});

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  } 
}
class App extends Component {
   constructor() {
   super();
   this.state = {
    input: '',
   }
   }
  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
    app.models
    .predict(
      Clarifai.COLOR_MODEL,
       "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
         console.log(response);
      },
      function(err) {

      }
    );
  }
  render() {
  return (
    <div className="App">
       <ParticlesBg type="circle" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition />  
    </div>
  );
 }
}
export default App;
