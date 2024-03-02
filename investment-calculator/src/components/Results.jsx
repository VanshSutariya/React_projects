import { calculateInvestmentResults, formatter } from "../util/investment.js";

export default function Results({ input }) {
  const results = calculateInvestmentResults(input);
  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;
  return (
    <>
      <table id="result">
        <thead className="thead">
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Interest Capital</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {results.map((items) => {
            const totalInterest =
              items.valueEndOfYear -
              items.annualInvestment * items.year -
              initialInvestment;
            const totalAmountInvested = items.valueEndOfYear - totalInterest;
            return (
              <tr key={items.year}>
                <td>{items.year}</td>
                <td>{formatter.format(items.valueEndOfYear)}</td>
                <td>{formatter.format(items.interest)}</td>
                <td>{formatter.format(totalInterest)}</td>
                <td>{formatter.format(totalAmountInvested)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      ;
    </>
  );
}
