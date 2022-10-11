import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ParticlesBg from 'particles-bg';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


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
  
  onInputChange = (event) => {
    console.log(event);
  }

  onSubmit = () => {
    console.log('click');
    App.models.predict("eda19c663ceb4470a64ab07e61ab1cf4", "https://samples.clarifai.com/metro-north.jpg" )
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
      {/* <FaceRecognition />  */}
    </div>
  );
 }
}
export default App;
