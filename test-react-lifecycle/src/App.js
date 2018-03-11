import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boss: "我自己"
        }
        this.changeBoss = this.changeBoss.bind(this)
    }

    changeBoss() {
        this.setState({
            boss: this.state.boss + "1"
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <br/>
                <button onClick={this.changeBoss}>改变老大</button>
                <br/>
                <TestComponent boss={this.state.boss}/>
            </div>
        );
    }
}


class TestComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            soldiers: ["小虎", "小凤", "小凰"]
        }
        console.log("组件初始化")
        this.addSoldier = this.addSoldier.bind(this)
    }

    componentWillMount() {
        console.log("组件马上就要挂载了")
    }

    componentDidMount() {
        console.log("组件已经挂载了")
    }

    componentWillReceiveProps(nextProps) {
        console.log("组件要接收父组件的值了 ", nextProps)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("判断是不是要更新组件")
        return true    // 记得要返回true(这里可以进行条件判断)
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("组件马上就要更新了")
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("组件更新完毕")
    }

    componentWillUnmount() {
        console.log("组件马上就要卸载了")
    }

    addSoldier() {
        this.setState({
            soldiers: [...this.state.soldiers, "新兵蛋子" + Math.random()]
        })
    }

    render() {
        return (
            <div>
                <h2>{this.props.boss}</h2>
                <button onClick={this.addSoldier}>新兵入伍</button>
                <ul>
                    {this.state.soldiers.map(item => {
                        return <li key={item}>{item}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default App;
