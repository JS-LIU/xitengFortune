/**
 * Created by LDQ on 2016/10/17.
 */
var React = require('react');
var $ = require('jquery');
require('../css/carousel.css');


var Carousel = React.createClass({
    timer:{},
    componentDidMount:function(){
        let $_screenWidth = $(window).width();
        let $_img = $('.carousel_img');
        // console.log('$_img----',$_img.eq(0).css());
        let $_carousel_box = $('.carousel_box');
        $_img.css({opacity:1});
        // let $_height = $_img.eq(0).css('height');
        // console.log($_height);
        $_carousel_box.css({overflow:"hidden",width:$_screenWidth+"px",height:"300px"});

        // let $_big_carousel_box = $('.carousel_big_box');
        // let bigWidth = this.props.pictures.length * $_screenWidth;
        // $_img.css("width",$_screenWidth+"px");
        // $_big_carousel_box.css({width:bigWidth + "px",marginLeft:'0px'});

        // let i = 0;
        // console.log('$_img---',$_img);
        // $_img.eq(i).css('opacity',1);
        // this.timer = setInterval(function (){
        //     $_img.css({opacity:0});
        //     if(i+1 == $_img.length){
        //         i = 0;
        //     }else{
        //         $_img.eq(i+1).animate({opacity:1},500);
        //     }
        // },1000)
    },
    componentWillUnmount:function(){
        clearInterval(this.timer);
    },
    render: function () {
        let imgNodes = this.props.pictures.map((item,index)=>{
            return (
                <img src={item.picUrl} alt="" key={index} className="carousel_img w"/>
            )
        });
        return (
            <div className="carousel_box pr tc">
                {imgNodes}
            </div>
        )
    }
});




module.exports = Carousel;