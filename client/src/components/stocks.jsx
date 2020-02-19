import React from 'react';
import './stocks.styles.css';

class Stocks extends React.Component {
    state = {
        stocks: []
    };


    async componentDidMount() {
        const response = await fetch('/api/stocks');
        const resJson = await response.json();
        this.setState({ stocks: resJson })
    };

    render() {
        console.log(this.state);
        // const { ticker, price, change, changePercent } = this.state.stocks;
        return (
            <div>
                <h1 className='stock'>Stocks</h1>
                {
                    this.state.stocks.length > 0 ? 
                        this.state.stocks.map(stock => {
                            return(
                                <div className={`stock ${parseFloat(stock.change) < 0 ? 'stock-down' : 'stock-up'}`} key={stock.id}>
                                    <div className="stock-head">
                                        <p className='stock-symbol'>{stock.ticker}</p>
                                    </div>
                                    <hr />
                                    <div className="stock-body">
                                        <p>${parseFloat(stock.price)}</p>
                                        <p>{parseFloat(stock.changePercent)}%</p>
                                    </div>
                                    {/* <p>Change: ${stock.change}</p> */}
                                </div>)
                    }) :
                        <div className='stock'>Loading...</div>
                }
            </div>
        );
    };
};

export default Stocks;