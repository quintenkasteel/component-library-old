import React from 'react';
import { ElementsConsumer, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';

// import Strapi from "strapi-sdk-javascript/build/main";
import Input from '../../../../components/Form/Inputs/Input';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
// const strapi = new Strapi(apiUrl);

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        address: '',
        city: '',
        state: '',
        stripe_id: '',
      },
      error: '',
    };
    this.submitOrder = this.submitOrder.bind(this);
  }

  onChange(propertyName, e) {
    const { data } = this.state;
    data[propertyName] = e.target.value;
    this.setState({ data });
  }

  submitOrder() {
    const { context } = this.props;
    const { data } = this.state;

    console.log(context);
    console.log(this.props.stripe.createToken());
    this.props.stripe
      .createToken()
      .then((res) => {
        // strapi
        //   .createEntry("orders", {
        //     amount: context.total,
        //     products: context.items,
        //     address: data.address,
        //     city: data.city,
        //     state: data.state,
        //     token: res.token.id
        //   })
      })
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    return (
      <div className="paper">
        <h5>Your information:</h5>
        <hr />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '0.90', marginRight: 10 }}>
            <Input label="Address" onChange={this.onChange.bind(this, 'address')} />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '0.65', marginRight: '6%' }}>
            <Input label="City" onChange={this.onChange.bind(this, 'city')} />
          </div>
          <div style={{ flex: '0.25', marginRight: 0 }}>
            <Input label="City" onChange={this.onChange.bind(this, 'state')} />
          </div>
        </div>

        <CardSection
          context={this.props.context}
          data={this.state.data}
          submitOrder={this.submitOrder}
        />
      </div>
    );
  }
}

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => <CheckoutForm elements={elements} stripe={stripe} />}
    </ElementsConsumer>
  );
};

export default InjectedCheckoutForm;

// class CheckoutForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(this);

//     this.state = {
//       elements: null,
//       card: null
//     };
//   }

//   componentWillReceiveProps() {
//     this.setState({ elements: this.props.stripe.elements() }, () => {
//       this.setState({ card: this.state.elements.create('card') }, () => {
//         this.state.card.mount('#card-element');
//       });
//     });
//   }

//   handleSubmit(ev) {
//     ev.preventDefault();
//     this.props.stripe.createToken(this.state.card).then((token) => {
//       console.log('Received Stripe token:', token);
//     });
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div className="row">
//           <label >
//             Credit or debit card
//           </label>
//           <div id="card-element"/>
//           <div id="card-errors" role="alert"/>
//         </div>
//         <button>Submit Payment</button>
//       </form>
//     );
//   }
// }

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {stripe: window.Stripe('test_key')};
//   }

//   render() {
//     return (
//       <CheckoutForm stripe={this.state.stripe}/>
//     );
//   }
// }

// export default App;
