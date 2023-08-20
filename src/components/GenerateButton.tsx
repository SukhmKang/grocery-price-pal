import React from 'react';
import { FidgetSpinner } from 'react-loader-spinner';
import { WalmartItem } from '../constants';

interface IProps {
    gridItemList: { name: string; image_src: string; selected: boolean; }[];
    setShowResults: (show: boolean) => void;
    setWalmartItems: (items: WalmartItem[][]) => void;
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
        const { gridItemList, setShowResults, setWalmartItems } = this.props;

        const selectedItems = gridItemList.filter((item) => item.selected == true);
        const selectedString = selectedItems.map((item) => item.name).join('_');
        
        this.setState({
            spinner: true
        });

        fetch(`/fetch_item_lists/${selectedString}`, {
            method: "GET"
        }).then(res => res.json()
        ).then((res : WalmartItem[][]) => {
            this.setState({
                spinner: false,
                error: false,
            });
            setWalmartItems(res);
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