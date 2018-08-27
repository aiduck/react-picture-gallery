import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import imageDatas from './data/imageDatas.json'
import ImgFigure from './components/FigureImage'
// import update from 'immutability-helper';
class ControllerUnit extends Component {
  render() {
    return (
      <span className="controller-unit"></span>
    );
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      imageArray: imageDatas.image,
      ImgFigures: [],
      imageURL: [],
      stageSize: {},
      constroller:[],
    }
  }
  componentWillMount() {
    this._getImageURL();
    // json 对象
    console.log("constantData taype is =" + typeof(this.state.imageArray));
    console.log("employees length = " + this.state.imageArray.length);
    console.log("No.1 fileName =" + this.state.imageArray[0].fileName);
    console.log("No.1 title" + this.state.imageArray[0].title);
    this._getControllerUnit();
  }
  _getControllerUnit() {

  }
  _getImageURL() {
    const requireContext = require.context("./images", true, /^\.\/.*\.jpg$/);
    const imageURL = requireContext.keys().map(requireContext);
    this.setState({ imageURL },()=>{
      var constroller=[];
      this.state.imageURL.map((i) => {
        constroller.push(<ControllerUnit key={i}/>); 
      })
      this.setState({constroller});
    });
    console.log("图片URL对象");
    console.log(imageURL);
  }
  // 组件加载之后，为每张图片计算范围
  componentDidMount() {
    // 舞台大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage);
    let stageW = stageDOM.scrollWidth;
    let stageH = stageDOM.scrollHeight;
    let halfStageW =  Math.floor(stageW / 2);
    let halfStageH =  Math.floor(stageH / 2);
    let stageSize = {
      halfStageW,
      halfStageH
    };
    // const newObj =  update({}, {$merge: {halfStageW: halfStageW, halfStageH: halfStageH}});
    // console.log(newObj);
    // console.log(Object.assign({},this.state.stageSize,{'halfStageW': halfStageW,'halfStageH':halfStageH}));
    this.setState({ stageSize },() => {
      // console.log(this.state.stageSize)
    })
  }
  handleReturnStageSize() {
    return this.state.stageSize;
  }
  render() {
    
    return (
      <section className="stage" ref="stage">
        <ImgFigure 
          imgData={this.state.imageArray} 
          imgURL={this.state.imageURL}
          initStageSize={this.handleReturnStageSize.bind(this)}
          />
        <nav className="controller-nav">
            {this.state.constroller}
        </nav>
      </section>
    );
  }
}

export default App;
