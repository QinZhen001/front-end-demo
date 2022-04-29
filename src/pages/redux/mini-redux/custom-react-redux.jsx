import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "./custom-redux";
//
// connect 负责链接组件，把redux里的数据放到组件的属性里
// 1.负责接收一个组件，把state里的一些数据放进去，放回一个组件
// 2.数据变化的时候，能够通知组件
// state => state
// 相当于 function(state){
//     return state
// }
// 用function的方式写connect
// export function connect(mapStateToProps, mapDispatchToProps) {
//     return function (WrapComponent) {
//         return class ConnectComponent extends React.Component {
//
//         }
//     }
// }

//mapStateToProps默认接受根state返回根state mapDispatchToProps这里默认只是接受对象的形式
export const connect =
  (mapStateToProps = (state) => state, mapDispatchToProps = {}) =>
  (WrapComponent) => {
    return class ConnectComponent extends React.Component {
      static contextTypes = {
        store: PropTypes.object,
      };

      constructor(props) {
        super(props);
        this.state = {
          props: {},
        };
      }

      update() {
        //获取mapStateToProps和mapDispatchToProps放入this.props里
        const { store } = this.context;
        const stateProps = mapStateToProps(store.getState());
        //mapStateToProps接收的参数就是根state
        // function addGun() {
        //     return { type: ADD_GUN }
        // }
        // 直接执行addGun()毫无意义
        // 要addGun = () => store.dispatch(addGun())才有意义，也就是用dispatch吧actionCreators包了一层
        const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
        this.setState((preState) => ({
          props: {
            ...preState.props,
            ...stateProps,
            ...dispatchProps,
          },
        }));
      }

      componentDidMount() {
        const { store } = this.context;
        store.subscribe(() => this.update());
        this.update();
      }

      render() {
        return <WrapComponent {...this.state.props}></WrapComponent>;
      }
    };
  };

export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object,
  };

  getChildContext() {
    return {
      store: this.store,
    };
  }

  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return this.props.children;
  }
}
