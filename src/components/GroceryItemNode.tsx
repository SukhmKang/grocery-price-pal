import React, { ReactNode } from 'react';
import { WalmartItem } from '../constants';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Egg } from "react-bootstrap-icons";
import '../assets/scss/GroceryItemNode.scss';

export default class GroceryItemNode {

    public listItemFromItem(item: WalmartItem, ind: number) : ReactNode {
        return (
            <li key={`li-${ind}`}>
                <Row>
                    <Col>
                        <img src={item.image} />
                    </Col>
                    <Col>
                        <Row>
                            <h2 className='cardheader'>Asparagus <Egg></Egg></h2>
                        </Row>
                        <Row>
                            <h2>{item.title}</h2>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <h2>{item.price}</h2>
                        </Row>
                    </Col>
                </Row>
            </li>
            );
          }    
}