/**
 * Created by LDQ on 2016/10/17.
 */
var React = require('react');
var $ = require('jquery');

var Carousel = React.createClass({
    componentDidMount:function(){
        let $_screenWidth = $(window).width();
        let $_img = $('.carousel_img');
        let $_carousel_box = $('.carousel_box');
        $_carousel_box.css({overflow:"hidden",width:$_screenWidth+"px"});
        $_img.css("width",$_screenWidth+"px");
    },
    render: function () {
        let imgNodes = this.props.pictures.map((item,index)=>{
            return (
                <img src={item.picUrl} alt="" key={index} className="carousel_img fl"/>
            )
        });
        return (
            <div className="carousel_box">
                <div className="carousel_big_box clearfix">
                    {imgNodes}
                </div>
            </div>
        )
    }
});
module.exports = Carousel;