import React from 'react';
import { compose } from 'recompose';
import StoreProvider, { withContext } from './Context/StoreProvider';

class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  addItem(item) {
    this.props.context.addItem(item);
  }

  render() {
    const { router, context, isAuthenticated } = this.props;

    const products = [
      {
        _id: '1',
        name: 'name 1',
        description: 'description 1',
        price: 20,
      },
      {
        _id: '2',
        name: 'name 2',
        description: 'description 2',
        price: 20,
      },
      {
        _id: '3',
        name: 'name 3',
        description: 'description 3',
        price: 20,
      },
      {
        _id: '4',
        name: 'name 4',
        description: 'description 4',
        price: 20,
      },
    ];
    if (products) {
      return (
        <div style={{ display: 'inline-block' }} className="h-100">
          <h1>Products</h1>
          {products.map((res) => (
            <div style={{ width: '30%', margin: '0 10px' }} key={res._id}>
              {/* <CardImg
                      top={true}
                      style={{ height: 250 }}
                      src={`http://localhost:1337${res.image.url}`}
                    /> */}
              <div>
                <h2>{res.name}</h2>
                <h2>{res.description}</h2>
              </div>
              <div className="card-footer">
                <a onClick={this.addItem.bind(this, res)}>+ Add To Cart</a>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return <h1>Loading</h1>;
  }
}

export default compose(withContext)(Products);
