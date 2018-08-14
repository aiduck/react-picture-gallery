import React, { Component } from 'react';
import './App.css';
import imageDatas from './mock/imageDatas.json'

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageArray: imageDatas.image
    }
  }
  componentWillMount() {
    // json 对象
    console.log("constantData taype is =" + typeof(this.state.imageArray));
    console.log("employees length = " + this.state.imageArray.length);
    console.log("No.1 fileName =" + this.state.imageArray[0].fileName);
    console.log("No.1 title" + this.state.imageArray[0].title);
  }
  genImageURL() {
    const imageAddInfo = this.state.imageArray;
    imageAddInfo.forEach(image => {
      image.imageURL = './images/' + image.fileName;
    });
    this.setState({
      imageArray:imageAddInfo
    });
    console.log(this.state.imageArray);
  }
  componentDidMount(){
    this.genImageURL();
  }
  render() {
    return (
      <section className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}

export default App;
