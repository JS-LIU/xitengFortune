/**
 * Created by zhangxin on 3/16 0016.
 */
import React,{Component}from 'react';
import { render } from 'react-dom';
import BouncedMessageType from '../components/BouncedMessage'

class BouuncedTest extends Component{
    render(){
        return(
            <div>
                <BouncedMessage/>
            </div>
        )
    }
}

module.exports = BouncedMessageType;


const megStyle={
    width:"5.5rem",
    height:"5.5rem",
    margin:"0 auto"
}










