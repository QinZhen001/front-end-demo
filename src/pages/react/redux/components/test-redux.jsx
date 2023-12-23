import React, { Component } from "react";
import { connect } from "../mini-redux/custom-react-redux";
import { addGun, removeGun, addGunAsync, addTwice } from "../reducer/index";


export const TestRedux = connect((state) => ({ num: state }), {
  addGun,
  removeGun,
  addGunAsync,
  addTwice,
})(
  class InnerComponent extends Component {
    render() {
      return (
        <div>
          <h2>现在有机枪{this.props.num}</h2>
          <button onClick={this.props.addGun}>申请武器</button>
          <button onClick={this.props.removeGun}>上交武器</button>
          <button onClick={this.props.addGunAsync}>拖两天再给</button>
          <button onClick={this.props.addTwice}>申请两把</button>
        </div>
      );
    }
  }
);
