import React from 'react'
import PropsTypes from 'prop-types'

class Sidebar extends React.Component {
    render() {
        return (
            <div>
                <p>侧边栏</p>
                <Navbar/>
            </div>
        )
    }
}

class Navbar extends React.Component {
    static contextTypes = {
        user: PropsTypes.string
    }

    render() {
        console.log(this.context)
        return (
            <div>{this.context.user}的侧边栏的导航栏</div>
        )
    }
}

class Page extends React.Component {
    static childContextTypes = {
        user: PropsTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {user: "小明"}
    }

    getChildContext() {
        return this.state
    }

    render() {
        return (
            <div>
                <p>我是{this.state.user}</p>
                <Sidebar/>
            </div>
        )
    }
}

export default Page