import React from 'react';
import { FidgetSpinner } from 'react-loader-spinner';
import { WalmartItem } from '../constants';

function WalmartItemToString(w: WalmartItem, index: number) : string {
    return w.title ?? "Missing title";
}

interface IProps {
    queryString: string
}
interface ScraperState {
    spinner: boolean,
    displayText: string,
    error: boolean
}
class Scraper extends React.Component<IProps, ScraperState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            spinner: true,
            displayText: "",
            error: false
        };
    }

    makeFetch() {
        fetch(`/express_backend/${this.props.queryString}`, {
            method: "GET"
        }).then(res => res.json()
        ).then((res : WalmartItem[]) => {
            this.setState({
            spinner: false,
            error: false,
            displayText: res.map((r, index) => WalmartItemToString(r, index)).join(", ")
            });
            console.log(res);
    }
        ).catch((e) => {
            console.log(e);
            this.setState({
                spinner: false,
                error: true,
                displayText: ""
            });
        });
    }

    componentDidMount() {
        if (this.props.queryString) {
            this.makeFetch();
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<ScraperState>, snapshot?: any): void {
        if ((prevProps.queryString !== this.props.queryString) && this.props.queryString) {
            this.makeFetch();
        }
    }

    render() {
        if (this.state.spinner) {
            return (
            <div>
                <FidgetSpinner backgroundColor="#F4442E" ballColors={['#000000', '#000000', '#000000']} height={70} width={70} />
            </div>
            );
        } else if (this.state.error) {
            return (
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/06/Face-sad.svg"></img>
            </div>
            );
        } else {
            return (
            <div>
                <p>{this.state.displayText}</p>
            </div>
            );
        };
    }
}

export default Scraper;