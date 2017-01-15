/**
 * Created by LDQ on 2016/10/17.
 */
var React = require('react');
var $ = require('jquery');
require('../css/carousel.css');

function replaceCSS3PropVal(name,index,replaceVal){
    var valArr = [];
    var val = "";
    var prop = "";
    var valArrIndex = 0;
    var valStr = "";
    var newCSS3 = "";
    for(let i = name.length - 1;i >=0 ;i--){
        val += name[i];
        if(name[i] == "("){
            break
        }
    }
    val = val.split("").reverse().join("");
    val = val.substr(1);
    val = val.replace(/\)/g, ",");
    for(let i = 0;i < val.length;i++){
        if(val[i] != ","){
            prop += val[i];
        }else{
            valArr[valArrIndex] = prop;
            prop = "";
            valArrIndex+=1;
        }
    }

    valArr[index] = replaceVal;
    valStr = valArr.join(',');
    for(let i = 0;i < name.length;i++){

        if(name[i] != "("){
            newCSS3 += name[i];
        }else{
            break
        }
    }
    newCSS3 += ("(" + valStr +")");
    return newCSS3;

}


var Carousel = React.createClass({

    timer:function(){
        var x = 0;
        var slideX = parseFloat(this.props.carouselStyle.bigBox.width);
        var smBox = parseFloat(this.state.smBox.width);
        setInterval(()=>{
            x -= slideX;
            if(-x == parseFloat(this.state.smBox.width)){
                x = 0;
            }
            var translate3d = replaceCSS3PropVal("translate3d(0px, 0px, 0px)",0,x+"px");
            this.state.smBox.transform=translate3d;
            this.setState({
                smBox:this.state.smBox
            })
        },5000);
    },
    getInitialState:function(){
        return {
            smBox:carouselStyleRow
        }
    },
    // componentWillMount:function(){
    //     console.log(this.props.carouselStyle);
    // },
    componentWillReceiveProps:function(nextProps){
        if(this.props.direction == "slideLeft" || this.props.direction == "slideRight"){
            var smBox = Object.assign({},nextProps.carouselStyle.smBox,carouselStyleRow);
        }
        this.setState({
            smBox:smBox
        });
    },

    componentDidMount:function () {
        this.timer();
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {

        let imgNodes = this.props.pictures.map((item,index)=>{
            return (
                <li className="carousel_item" key={index}>
                    <img src={item.picUrl} alt="" className="w"/>
                </li>
            )
        });
        return (
            <div className="carousel_box pr tc" style={this.props.carouselStyle.bigBox}>
                <ul style={this.state.smBox}>
                    {imgNodes}
                </ul>
            </div>
        )
    }
});


module.exports = Carousel;
var carouselStyleRow = {
    display:"flex",
    flexDirection:"row",
    transitionDuration: "300ms",
    transform: "translate3d(0px, 0px, 0px)"
};