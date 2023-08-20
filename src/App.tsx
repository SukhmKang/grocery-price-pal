import React, { Component } from 'react';
import './App.css';
import itemGridList from './components/ItemGridList';
import ItemGrid from './components/ItemGrid';
import ShoppingCart from './components/ShoppingCart';
import GenerateButton from './components/GenerateButton';
import ResultsDisplay from './components/ResultsDisplay'
import { WalmartItem } from './constants';

interface IProps {

}
interface AppState{
    gridItemList: { name: string; image_src: string; selected: boolean; }[],
    showCart: boolean,
    showResults: boolean,
    walmartItems: WalmartItem[][]
};
class App extends Component<IProps, AppState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            gridItemList: itemGridList,
            showCart: false,
            showResults: false,
            walmartItems: []
        }
        this.changeSelected = this.changeSelected.bind(this)
        this.setShowCart = this.setShowCart.bind(this)
        this.setShowResults = this.setShowResults.bind(this)
        this.setWalmartItems = this.setWalmartItems.bind(this)
    }

    changeSelected(name: string, selected: boolean) {
        const { gridItemList } = this.state;

        const newList: { name: string; image_src: string; selected: boolean; }[]
            = gridItemList.map((item) => {
                if (item.name == name) {
                    return ({
                        name: item.name,
                        image_src: item.image_src,
                        selected: selected
                    })
                } else {
                    return item;
                }
            });
        
        this.setState({
            gridItemList: newList
        })
    }

    setShowCart(show: boolean) {
        this.setState({
            showCart: show
        })
    }

    setShowResults(show: boolean) {
        this.setState({
            showResults: show
        });
    }

    setWalmartItems(items: WalmartItem[][]) {
        this.setState({
            walmartItems: items
        })
    }

    render() {
        const { changeSelected, setShowCart, setShowResults, setWalmartItems } = this;
        const { gridItemList, showCart, showResults, walmartItems } = this.state;

        return (
            <div className="App">
                <h1>Welcome to Grocery Price Pal!</h1>
                {!showResults &&
                    <ShoppingCart gridItemList={gridItemList}
                                  changeSelected={changeSelected}
                                  showCart={showCart}
                                  setShowCart={setShowCart}></ShoppingCart>}
                {!showResults &&
                    <GenerateButton gridItemList={gridItemList}
                                    setShowResults={setShowResults}
                                    setWalmartItems={setWalmartItems}></GenerateButton>}
                {!showResults &&
                    <ItemGrid gridItemList={gridItemList}
                              changeSelected={changeSelected}></ItemGrid>}
                {showResults &&
                    <ResultsDisplay setShowResults={setShowResults}
                                    walmartItems={walmartItems}></ResultsDisplay>}
            </div>
        );
    }
}

export default App;
