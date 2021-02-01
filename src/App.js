import React, { Component } from 'react';
import InputFullSalary from './components/inputs/InputFullSalary';
import InputReadOnly from './components/inputs/InputReadOnly';
import ProgressBarSalary from './components/progressBar/ProgressBarSalary';
import { calculateSalaryFrom } from './components/helpers/salary.js';
import { formatNumber, formatMoney } from './components/helpers/formatHelpers';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 0.0,
    };
  }

  handleFullSalary = (newText) => {
    this.setState({
      fullSalary: parseFloat(newText),
    });
  };

  render() {
    const { fullSalary } = this.state;

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);

    const percentageDiscountINSS = ((discountINSS * 100) / baseINSS).toFixed(2);
    const percentageDiscountIRPF = ((discountIRPF * 100) / baseIRPF).toFixed(2);
    const percentageFullSalary = ((netSalary * 100) / baseINSS).toFixed(2);

    let valuePercentageINSS = 'R$ 0,00 (0%)';
    let valuePercentageIRPF = 'R$ 0,00 (0%)';
    let valuePercentageFullSalary = 'R$ 0,00 (0%)';
    let valueINSS = 'R$ 0,00';
    let valueIRPF = 'R$ 0,00';

    if (fullSalary > 0) {
      valuePercentageINSS =
        formatMoney(discountINSS) +
        ` (${formatNumber(percentageDiscountINSS)}%)`;
      valuePercentageIRPF =
        formatMoney(discountIRPF) +
        ` (${formatNumber(percentageDiscountIRPF)}%)`;
      valuePercentageFullSalary =
        formatMoney(netSalary) + ` (${formatNumber(percentageFullSalary)}%)`;
      valueINSS = formatMoney(baseINSS);
      valueIRPF = formatMoney(baseIRPF);
    }

    return (
      <div className="container">
        <h1 className="center">Calculadora de Salário 2020</h1>
        <InputFullSalary onChange={this.handleFullSalary} />
        <div className="row">
          <InputReadOnly text="Base INSS:" value={valueINSS} />
          <InputReadOnly
            text="Desconto INSS:"
            value={valuePercentageINSS}
            color="#e67e22"
          />
          <InputReadOnly text="Base IRPF:" value={valueIRPF} />
          <InputReadOnly
            text="Desconto IRPF:"
            value={valuePercentageIRPF}
            color="#c0392b"
          />
          <InputReadOnly
            text="Salário Liquído:"
            value={valuePercentageFullSalary}
            color="#16a085"
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProgressBarSalary value={percentageDiscountINSS} color="#e67e22" />
          <ProgressBarSalary value={percentageDiscountIRPF} color="#c0392b" />
          <ProgressBarSalary value={percentageFullSalary} color="#16a085" />
        </div>
      </div>
    );
  }
}
