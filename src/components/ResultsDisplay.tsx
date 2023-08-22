import React from 'react';
import { ItemCache, WalmartItem } from '../constants';
import WalmartItemDisplay from './WalmartItemDisplay'

interface IProps {
    setShowResults: (show: boolean) => void;
    walmartItems: ItemCache;
}
class ResultsDisplay extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { setShowResults, walmartItems } = this.props;
        console.log("here is for results")
        console.log(walmartItems);
        return (
            <div>

                <h1>Your Grocery List</h1>
                <button onClick={() => setShowResults(false)}>Go Back</button>
                {Object.entries(walmartItems).map(([itemName, itemOptions]) =>
                    <WalmartItemDisplay key={itemName} itemOptions={itemOptions}></WalmartItemDisplay>
                )}
            </div>
        );
    }
}

export default ResultsDisplay;