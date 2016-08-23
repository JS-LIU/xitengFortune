/**
 * Created by LDQ on 2016/8/23.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
import {shopActions} from '../redux/actions/shopActions';
import {storageActions} from '../redux/actions/storageActions';

var BuyDiamonds = React.createClass({

    componentWillMount:function(){
        this.props.diamondsActionKeys.getProducts({productList:'diamondList.json'});
    },
    render: function () {
        return (
            <div>
                <PruductItems
                    diamondList={this.props.diamonds.diamondList}
                    setProductId={this.props.storageActionKeys.setProductId}
                />
            </div>
        )
    }
});

var PruductItems = React.createClass({

    render: function () {

        var diamondsNodes = this.props.diamondList.map((item,index)=>{
            return(
                <li key={index}>
                    <span>{item.title}</span>
                    <span>{item.price}</span>
                </li>
            )
        });
        return (
            <ul>
                {diamondsNodes}
            </ul>
        )
    }
});



function mapStatetoProps(state){
    return {
        diamonds:state.diamonds,
        storage:state.storage
    }
}
function mapDispatchToProps(dispatch){

    return{
        diamondsActionKeys : bindActionCreators(shopActions,dispatch),
        storageActionKeys: bindActionCreators(storageActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(BuyDiamonds);