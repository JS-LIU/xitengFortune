/**
 * Created by LDQ on 2017/4/6.
 */

const PayDialogHeader  = React.createClass({

    hideDialog:function(){
        this.props.showDialogActionKeys.hideDialog();
    },

    render: function () {
        return (
            <div>
                <div onClick={this.props.hideDialog}>x</div>
                <p>{this.props.title}</p>
            </div>
        )
    }
});

const PayDialogBody = React.createClass({


    render: function () {
        return (
            <div>

                <p>{this.props.body.title}</p>
                <p>{this.props.body.money}</p>

                <Link to={this.props.body.url}>
                    {this.props.body.payWay}
                </Link>
            </div>
        )
    }
});



module.exports = {
    PayDialogHeader,PayDialogBody
};