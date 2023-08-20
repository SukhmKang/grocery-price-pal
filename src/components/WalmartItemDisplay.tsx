import React from 'react';
import { WalmartItem } from '../constants';
import './WalmartItemDisplay.css';

interface IProps {
    itemOptions: WalmartItem[];
}
class WalmartItemDisplay extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { itemOptions } = this.props;
        const firstOption = itemOptions[0];

        return (
            <div className="product">
                <img className="product-img" src={firstOption.image}></img>
                <a href={firstOption.urlLink}>{firstOption.title}</a>
                <p>{firstOption.price}</p>
                <button>See More Options</button>
            </div>
        );
    }
}

export default WalmartItemDisplay;