import { IpcNetConnectOpts } from 'net';
import React from 'react';
import './ShoppingCart.css';

interface IProps {
    gridItemsList: { name: string; image_src: string; selected: boolean; }[];
    changeSelected: (name: string, selected: boolean) => void;
    showCart: boolean;
    setShowCart: (show: boolean) => void;
}

class ShoppingCart extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }

    render() {
        const { gridItemsList, changeSelected, showCart, setShowCart } = this.props

        return (
            <div>
                <button onClick={() => setShowCart(true)}>ShoppingCart</button>
                {showCart && <div className="popup-cart">
                    <div className="popup-box">
                        <h1>Your Shopping Cart</h1>
                        <div className="cart-list">
                            {gridItemsList.map((item, i) => {
                                if (item.selected) {
                                    return (
                                        <div className="cart-item" key={i}>
                                            <p>{item.name}</p>
                                            <p>{item.image_src}</p>
                                            <button onClick={() => changeSelected(item.name, false)}>Remove</button>
                                        </div>
                                    );
                                }
                            }
                            )}
                        </div>
                        <button className="close-button" onClick={() => setShowCart(false)}>Close</button>
                    </div>
                </div>}
            </div>
        );
    }
}

export default ShoppingCart;