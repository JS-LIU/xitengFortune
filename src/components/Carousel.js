/**
 * Created by LDQ on 2016/10/17.
 */
var React = require('react');
var $ = require('jquery');
import carousel from '../css/carousel.css';
import _h from '../Util/HB';

var Carousel = React.createClass({

    timer:{},
    getInitialState:function(){
        return {
            smBox:carouselStyleRow
        }
    },
    componentWillReceiveProps:function(nextProps){
        if(nextProps.direction === "slideLeft" || nextProps.direction === "slideRight"){
            var smBox = Object.assign({},carouselStyleRow,nextProps.carouselStyle.smBox);
        }
        this.setState({
            smBox:smBox
        });
    },
    componentDidMount:function () {
        var slideX = parseFloat(this.props.carouselStyle.bigBox.width);
        _h.slide('left',()=>{
            var x = parseFloat(_h.CSS3.toArray(this.state.smBox.transform));
            x -= slideX;
            if(-x === parseFloat(this.state.smBox.width)){
                x = 0;
            }
            this.state.smBox.transform="translate3d("+x+"px, 0px, 0px)";
            this.setState({
                smBox:this.state.smBox
            })
        });
        var x = 0;

        this.timer = setInterval(()=>{
            x -= slideX;
            if(-x === parseFloat(this.state.smBox.width)){
                x = 0;
            }
            var smBox = Object.assign({},this.state.smBox,{
                transform:"translate3d("+x+"px, 0px, 0px)"
            });

            this.setState({
                smBox:smBox
            })
        },5000);
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        let imgNodes = this.props.pictures.map((item,index)=>{
            return (
                <li className={carousel.carousel_item} key={index}>
                    <img src={item.picUrl} alt="" className="w"/>
                </li>
            )
        });
        return (
            <div
                className={carousel.carousel_box }
                style={this.props.carouselStyle.bigBox}>
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