/**
 * Created by LDQ on 2016/10/17.
 */
var React = require('react');
var $ = require('jquery');
require('../css/carousel.css');

function getCSS3PropVal(name,index){
    var reg = new RegExp("(^)" + name + "=([^&]*)(&|$)", "i");
}


var Carousel = React.createClass({
    timer:function(){
        setInterval(()=>{
            console.log(this.props.carouselStyle.smBox);

            // this.props.carouselStyle.smBox.transform="translate3d(-375px, 0px, 0px)"
        },5000);
    },
    componentWillMount:function(){
        console.log(this.props.direction);
        console.log(this.props.carouselStyle);
        console.log(this.props.pictures);
        console.log(carouselStyleRow);
        this.timer();
    },
    componentDidMount:function () {
        console.log(0);

    },
    render: function () {
        var carouselStyle = {};
        if(this.props.direction == "slideLeft" || this.props.direction == "slideRight"){
            this.props.carouselStyle.smBox = Object.assign({},this.props.carouselStyle.smBox,carouselStyleRow)
        }
        let imgNodes = this.props.pictures.map((item,index)=>{
            return (
                <li className="carousel_item" key={index}>
                    <img src={item.picUrl} alt="" className="w"/>
                </li>
            )
        });
        return (
            <div className="carousel_box pr tc" style={this.props.carouselStyle.bigBox}>
                <ul style={this.props.carouselStyle.smBox}>
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