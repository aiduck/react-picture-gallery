/* eslint-disable */
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './FigureImage.css'

class ImgFigure extends Component {
    constructor() {
        super();
        this.Constant = {
			centerPos: { //center
				left: 0,
				top: 0
			},
			hPosRange: { //left and right sec position
				leftSecX: [0, 0],
				rightSecX: [0, 0],
				y: [0, 0]
			},
			vPosRange: { //up sec position
				x: [0, 0],
				topY: [0, 0]
			}
		};
        this.state = {
            imgsArrangeArr: [
                // {
                //   pos: {   // 位置信息
                //     left: '0',
                //     top: '0'
                //   },
                //   rotate: 0, // 旋转角度
                //   isInverse: false,  // 图片正反面
                //   isCenter: false    // 是否在正中间
                // }
            ],
            ImgFigureSize: {},
            stageSize: {}
        }
    }
    // 组件加载之后，为每张图片计算范围
    componentDidMount() {
       // 获取imgFigure的大小
       let imgFigure = ReactDOM.findDOMNode(this.refs.imgFigure0);
       let imgW = imgFigure.scrollWidth;
       let imgH = imgFigure.scrollHeight;
       let halfImgW = Math.floor(imgW / 2);
       let halfImgH = Math.floor(imgH / 2);
       let ImgFigureSize = {
            halfImgW,
            halfImgH
       }
       this.setState({ImgFigureSize},() => {
            console.log(this.state.stageSize);
            console.log(this.state.ImgFigureSize);
            let halfStageW = this.state.stageSize.halfStageW;
            let halfStageH = this.state.stageSize.halfStageH;
            let stageW = halfStageW * 2;
            let stageH = halfStageH * 2;

            // 中心图片的左上角
            this.Constant.centerPos = {
                left: halfStageW - halfImgW,
                top: halfStageH - halfImgH
            }
            // 计算左侧，右侧区域图片排布位置的取值范围
            this.Constant.hPosRange.leftSecX[0] = -halfImgW;
            this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    
            this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
            this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    
            this.Constant.hPosRange.y[0] = -halfImgH;
            this.Constant.hPosRange.y[1] = stageH - halfImgH;
            //计算上侧区域图片排布位置的取值范围
            this.Constant.vPosRange.topY[0] = 0 - halfImgH;
            this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

            this.Constant.vPosRange.x[0] = halfStageW - imgW;
            this.Constant.vPosRange.x[1] = halfStageW;
            this.rearrange(0);
       })
    }
    componentWillReceiveProps() {
        if(this.props.initStageSize){
            let stageSize = this.props.initStageSize();
            this.setState({stageSize})
        }
    }
    // 获取区间内的值
    getRangeRandom(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
    // 旋转角度
    get30DegRandom() {
        return ((Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30));
    }
    /* 随机分配图片的位置
    * @param centerIndex 指定居中那张图片
    */ 
    rearrange(centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            constant = this.Constant,
       
            centerPos = constant.centerPos,
            hPosRange = constant.hPosRange,
            vPosRange = constant.vPosRange,

            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,

            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x;
        // 存储上层区域图片(0或者1个)
        var imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2),
            topImgSpliceIndex = 0;
        // 居中centerIndex的图片Pos信息
        var imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
        imgsArrangeCenterArr[0].pos = centerPos;
        // 居中的图片不需要旋转
        imgsArrangeCenterArr[0].rotate = '0';
        imgsArrangeCenterArr[0].isInverse = false;
        imgsArrangeCenterArr[0].isCenter = true;
        
        // 上侧图片pos信息
        topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
        imgsArrangeTopArr.forEach((value, index) => {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: this.getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
                    left: this.getRangeRandom(vPosRangeX[0],vPosRangeX[1])
                },
                rotate: this.get30DegRandom(),
                isInverse: false,
                isCenter: false
            }
        })
        console.log(imgsArrangeTopArr)
        // 左右图片pos信息
        for( let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++ ){
            var hPosRangeLORX = null;
            if (i < k) {
                // 前半部分布局左边，后半部分布局右边
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }
            imgsArrangeArr[i] = {
                pos: {
                    top: this.getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                    left: this.getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
                },
                rotate: this.get30DegRandom(),
                isInverse: false,
                isCenter: false
            };
        }
        // 上测的图片重新放入图片数组中
        if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }
        // 居中同理
        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
        this.setState({ imgsArrangeArr },() => {
            console.log(this.state.imgsArrangeArr);
        })
    }
    /*
    * 翻转图片
    * @param index 输入当前被执行inverse操作的图片对应的图片的信息数组的index的值
    * @return {Function} 是一个闭包函数，其中return一个真正待被执行的函数
    */
    inverse(index) {
        var imgsArrangeArr = this.state.imgsArrangeArr;
        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
        console.log(imgsArrangeArr[index].isInverse);
        this.setState({
            imgsArrangeArr
        },() => {
            console.log(this.state.imgsArrangeArr);
        });
    }
    center(index) {
        this.rearrange(index);
	}
    handleCilck(index,e) {
        e.preventDefault();
        // e.stopPropagetion();
        if (!this.state.imgsArrangeArr[index].isCenter) {
            this.center(index);
        } else {
            this.inverse(index);
        }
    }
    render() {
        return (
            <section className="imgSec">{
                this.props.imgData.map((img,i) => {
                    var styleObj = {}
                    if (!this.state.imgsArrangeArr[i]){
                        this.state.imgsArrangeArr[i] = {
                            pos: {
                                left: 0,
                                top: 0
                            },
                            rotate: 0,
                            isInverse: false
                        };  
                    }
                    if (this.state.imgsArrangeArr[i].pos) {
                        styleObj = {...this.state.imgsArrangeArr[i].pos};
                    }
                    if (this.state.imgsArrangeArr[i].rotate) {
                        (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function(value) {
                            styleObj[value] = 'rotate(' + this.state.imgsArrangeArr[i].rotate + 'deg)';
                        }.bind(this));
                    }
                    var inRotateY;
                    // imgFigureClassName +=  this.state.imgsArrangeArr[i].isInverse ? ' ishide' : '';
                    inRotateY = this.state.imgsArrangeArr[i].isInverse ? 'inRotateY' : '';
                    return (
                        <figure
                            key={i}
                            style={styleObj}
                            className="imgFigure" ref={'imgFigure' + i}>
                            <figcaption className={inRotateY} onClick={this.handleCilck.bind(this,i)}>
                               <div className="font">
                                    <img src={this.props.imgURL[i]} alt={img.title}/>
                                    <h2 className="imgTitle">{img.title}</h2>
                               </div>
                                <div className="back">
                                    <p>
                                        {img.desc}
                                    </p>
                                </div>
                            </figcaption>
                        </figure>
                    )
                })
            }
            </section>
        )
    }
}

export default ImgFigure;