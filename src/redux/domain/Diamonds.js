/**
 * Created by LDQ on 2017/5/24.
 */

import CoinInterface from './CoinInterface';

class Diamonds extends CoinInterface{
    constructor(diamonds){
        super();
        this.diamonds = diamonds;
        this.XB = diamonds * this.radio;
    }
}

module.exports = Diamonds;