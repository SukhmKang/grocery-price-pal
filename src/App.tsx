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

interface IProps {

}
interface AppState{
    inputText: string
};
class App extends Component<IProps, AppState> {    

}

export default App;
