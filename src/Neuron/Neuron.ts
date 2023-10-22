import { random } from "../helpers";
import { Value } from "../Value";

/**
 * A neural network neuron.
 */
export class Neuron {
  weights: Value[];
  bias: Value;

  constructor(numInputs: number) {
    this.weights = [...Array(numInputs)].map(() => new Value(random(-1, 1)));
    this.bias = new Value(random(-1, 1));
  }

  /**
   * Get the parameters.
   */
  parameters(): Value[] {
    return [...this.weights, this.bias];
  }

  /**
   * Fire the neuron.
   *
   * Returns the yhat (w * x + b).
   */
  fire(values: Value[]): Value {
    return values
      .reduce((acc, xi, i) => {
        const wi = this.weights[i];
        const wixi = wi.mul(xi);
        acc = acc.add(wixi);
        return acc;
      }, this.bias)
      .tanh();
  }
}