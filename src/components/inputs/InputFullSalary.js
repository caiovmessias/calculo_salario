import React, { Component } from 'react';

export default class InputFullSalary extends Component {
  handleInputChange = (event) => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <div className="row">
        <div className="input-field col s12">
          <input
            autoFocus
            type="number"
            className="validate"
            id="fullSalary"
            onChange={this.handleInputChange}
            min="1000"
            defaultValue="0"
            step="100"
          />
          <label htmlFor="fullSalary" className="active">
            Salário Bruto:
          </label>
        </div>
      </div>
    );
  }
}
