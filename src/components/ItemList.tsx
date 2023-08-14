import React from 'react';
import GroceryItemNode from './GroceryItemNode';
import { SupplementaryInfo, WalmartItem } from '../constants';
import Button from 'react-bootstrap/Button'

function getListPerm(items: WalmartItem[], ordering: number[]) {
    return ordering.map(n => items[n]);
}

interface IProps {
    items: WalmartItem[]
}
interface ItemListState {
    ordering: number[],
    fetchItemDetails: () => void;
}
class ItemList extends React.Component<IProps, ItemListState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            ordering: (new Array<number>).fill(0).map((x, ind) => ind),
            fetchItemDetails: (() => {
                fetch(`/fetch_detailed_items/${encodeURIComponent(this.props.items[0].urlLink!)}`, {
                    method: "GET"
                }).then(res => res.json()
                ).then((res : SupplementaryInfo[]) => console.log(res)
                ).catch((e) => console.log(e));
            }).bind(this)
        };
    }

    render() {
        return (
            <div>
                <Button onClick={this.state.fetchItemDetails}>
                    See Detailed Info
                </Button>
                <div className="flex-container">
                    <ul>
                        {this.props.items.map((item, ind) => (new GroceryItemNode).listItemFromItem(item, ind))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ItemList;