import React, {Component} from 'react';
import {connect} from './custom-react-redux'
import {addGun, removeGun, addGunAsync, addTwice} from './reducer'

@connect(
    state => ({num: state}),
    {addGun, removeGun, addGunAsync, addTwice}
)
class App extends Component {
    render() {
        return (
            <div className="App">
                <h2>现在有机枪{this.props.num}</h2>
                <button onClick={this.props.addGun}>申请武器</button>
                <button onClick={this.props.removeGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>拖两天再给</button>
                <button onClick={this.props.addTwice}>申请两把</button>
            </div>
        );
    }
}


export default App;
