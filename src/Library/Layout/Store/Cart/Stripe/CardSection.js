import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

class CardSection extends React.Component {
  render() {
    return (
      <div>
        <div>
          <label htmlFor="card-element">Credit or debit card</label>

          <div>
            <fieldset style={{ border: 'none' }}>
              <div className="form-row">
                <div id="card-element" style={{ width: '100%' }}>
                  <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
                <br />
                <div className="order-button-wrapper">
                  <button onClick={this.props.submitOrder}>Confirm order</button>
                </div>
                {this.props.stripeError ? <div>{this.props.stripeError.toString()}</div> : null}
                <div id="card-errors" role="alert" />
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}
export default CardSection;
