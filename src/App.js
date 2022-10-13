import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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
   constructor() {
   super();
   this.state = {
    input: '',
    imageUrl:'',
    box: {},
   }
   }

   calculateFaceLocation = (data) => {
    const clarifaiFace = JSON.parse(data, null, 2).outputs[0].data.regions[0]
     .region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  }


   displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
   }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    const raw = JSON.stringify({
      user_app_id : {
        user_id: "jginesky_dev",
        app_id: "my-first-application"
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input
            },
          },
        },
      ],
    });

    fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "b23c963c398542eabc63bd248e12ed75",
      },
      body: raw,
    }
    )
    .then((response) => response.text())
    .then((result) => this.displayFaceBox(this.calculateFaceLocation(result)))
    .catch((error) => console.log("error", error));
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
      <FaceRecognition box={this.state.box} imageUrl={this.state.input}/>  
    </div>
  );
 }
}
export default App;
