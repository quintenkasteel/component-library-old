/* components/Cart/Cart.js */

import React from 'react';
import { compose } from 'recompose';
import { withContext } from '../Context/StoreProvider';

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  addItem(item) {
    this.props.context.addItem(item);
  }

  removeItem(item) {
    this.props.context.removeItem(item);
  }

  render() {
    const { items } = this.props.context;
    return (
      <div>
        <div style={{ padding: '10px 5px' }} className="cart">
          <h2 style={{ margin: 10 }}>Your Order:</h2>
          <hr />
          <div style={{ padding: 10 }}>
            <div style={{ marginBottom: 6 }}>
              <small>Items:</small>
            </div>
            <div>
              {items
                ? items.map((item) => {
                    if (item.quantity > 0) {
                      return (
                        <div className="items-one" style={{ marginBottom: 15 }} key={item._id}>
                          <div>
                            <span id="item-price">&nbsp; ${item.price}</span>
                            <span id="item-name">&nbsp; {item.name}</span>
                          </div>
                          <div>
                            <a
                              style={{
                                height: 25,
                                padding: 0,
                                width: 15,
                                marginRight: 5,
                                marginLeft: 10,
                              }}
                              onClick={this.addItem.bind(this, item)}
                              color="link">
                              +
                            </a>
                            <a
                              style={{
                                height: 25,
                                padding: 0,
                                width: 15,
                                marginRight: 10,
                              }}
                              onClick={this.removeItem.bind(this, item)}
                              color="link">
                              -
                            </a>
                            <span style={{ marginLeft: 5 }} id="item-quantity">
                              {item.quantity}x
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })
                : null}
              {items.length > 0 ? (
                <div>
                  <div style={{ width: 200, padding: 10 }} color="light">
                    <h5 style={{ fontWeight: 100, color: 'gray' }}>Total:</h5>
                    <h3>${this.props.context.total}</h3>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default compose(withContext)(Cart);
