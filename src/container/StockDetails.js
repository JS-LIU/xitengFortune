/**
 * Created by LDQ on 2016/9/12.
 */
var React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
var {Link} = require('react-router');

var StockDetails = React.createClass({
    render: function () {
        return (
            <div></div>
        )
    }
});


function mapStatetoProps(state){
    // console.log(state.openingTime);
    return {
        storage:state.storage
    };
}

function mapDispatchToProps(dispatch){

    return{
        stockGameActionsKeys : bindActionCreators(stockGameActions,dispatch),
        storageActions:bindActionCreators(storageActions,dispatch)
    }
}


module.exports = connect(mapStatetoProps,mapDispatchToProps)(StockDetails);