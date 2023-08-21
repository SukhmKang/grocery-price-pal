import React from 'react';
import { FidgetSpinner } from 'react-loader-spinner';
import { WalmartItem, ItemCache, GenericItem } from '../constants';

interface IProps {
    gridItemList: GenericItem[];
    setShowResults: (show: boolean) => void;
    setWalmartItems: (items: ItemCache) => void;
    cache: ItemCache
}
interface GenerateState {
    spinner: boolean,
    error: boolean
}
class GenerateButton extends React.Component<IProps, GenerateState> {
    constructor(props: IProps) {
        super(props);
        this.makeFetchList = this.makeFetchList.bind(this);
        this.state = {
            spinner: false,
            error: false
        }
    }

    makeFetchList() {
        const { gridItemList, setShowResults, setWalmartItems, cache } = this.props;

        const selectedItems = gridItemList.filter(
            (item) => item.selected === true && !Object.keys(cache).includes(item.name)
        );
        const selectedString = selectedItems.map((item) => item.name).join('_');
        if (selectedString === "") {
            setShowResults(true);
            return;
        };
        
        this.setState({
            spinner: true
        });

        fetch(`/fetch_item_lists/${selectedString}`, {
            method: "GET"
        }).then(res => res.json()
        ).then((res : ItemCache) => {
            this.setState({
                spinner: false,
                error: false,
            });
            setWalmartItems({...cache, ...res});
            setShowResults(true);
            console.log(res);
        }).catch((e) => {
            console.log(e);
            this.setState({
                spinner: false,
                error: true,
            });
        });
    }

    render() {
        const { makeFetchList } = this;
        const { spinner, error } = this.state;

        return (
            <div>
                {!spinner && <button onClick={makeFetchList}>Generate List</button>}
                {spinner && <FidgetSpinner backgroundColor="#F4442E" ballColors={['#000000', '#000000', '#000000']} height={70} width={70} />}
                {error && <img src="https://upload.wikimedia.org/wikipedia/commons/0/06/Face-sad.svg"></img>}
            </div>
        );
    }
}

export default GenerateButton;