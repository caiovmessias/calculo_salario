import React, { Component } from 'react';

export default class InputReadOnly extends Component {
  render() {
    const { text, value, color } = this.props;

    const css = {
      color: color,
      fontWeight: 'bold'
    }

    return (
        <div className="input-field col s3">
          <input
            autoFocus
            type="text"
            readOnly
            value={value}
            style={css}
          />
          <label className="active">{text}</label>
        </div>
    );
  }
}
