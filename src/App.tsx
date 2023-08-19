import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Scraper from './components/Scraper';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { query } from 'express';
import itemGridList from './components/ItemGridList';
import ItemGrid from './components/ItemGrid';
import ShoppingCart from './components/ShoppingCart';

interface IProps {

}
interface AppState{
    inputText: string,
    gridItemList: { name: string; image_src: string; selected: boolean; }[],
    showCart: boolean
};
class App extends Component<IProps, AppState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            inputText: "",
            gridItemList: itemGridList,
            showCart: false
        }
        this.changeSelected = this.changeSelected.bind(this)
        this.setShowCart = this.setShowCart.bind(this)
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

    render() {
        const { changeSelected, setShowCart } = this;
        const { inputText, gridItemList, showCart } = this.state;

        return (
            <div>
                <h1>This is App</h1>
                <ShoppingCart gridItemsList={gridItemList} changeSelected={changeSelected} showCart={showCart} setShowCart={setShowCart}></ShoppingCart>
                <ItemGrid gridItemsList={gridItemList} changeSelected={changeSelected}></ItemGrid>
            </div>
        );
    }
}

export default App;
