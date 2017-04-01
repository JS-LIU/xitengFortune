/**
 * Created by LDQ on 2017/3/31.
 */



const ProductNumController = React.createClass({
    getInitialState: function() {
        return {productNum:this.props.num};
    },
    numChange:function () {
        this.setState({
            productNum:this.state.number
        })
    },
    reduceNum:function(){
        this.setState({
            productNum:this.state.number--
        })
    },
    increaseNum:function(){

        this.setState({
            productNum:this.state.number++
        });
        if(this.props.actionKeys){
            this.props.actionKeys.increaseNum(item);
        }
    },
    render: function () {
        return (
            <div>
                <div onClick={this.reduceNum}>减</div>
                <input
                    type="text"
                    ref="productNum"
                    onChange={this.numChange}
                    value={this.state.productNum}
                />
                <div onClick={this.increaseNum}>加</div>
            </div>
        )
    }
});
module.exports = ProductNumController;