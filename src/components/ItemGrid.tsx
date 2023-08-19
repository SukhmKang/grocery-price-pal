import { update } from 'lodash';
import React from 'react';
import './ItemGrid.css';

interface IProps {
    gridItemsList: { name: string; image_src: string; selected: boolean; }[];
    changeSelected: (name: string, selected: boolean) => void;
}
class ItemGrid extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { gridItemsList } = this.props;
        const { changeSelected } = this.props
        return (
            <div className="grid-container">
                <div className="item-grid">
                    {gridItemsList.map((item, i) => {
                        const backgroundString: string = item.selected ? 'darkslategrey' : 'slategrey'
                        const background: React.CSSProperties = {
                            backgroundColor: backgroundString
                        }

                        return (
                            <div onClick={() => changeSelected(item.name, !item.selected)} className="grid-box" style={background} key={i}>
                                <p>{item.image_src}</p>
                                <p>{item.name}</p>
                            </div>
                        );
                    }
                    )}
                </div>
            </div>
        );
    }
}

export default ItemGrid;