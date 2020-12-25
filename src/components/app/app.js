import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';


import Background from './food-bg.jpg';

const App = ({items}) => {

    let total = 0;
    if (items.length > 0) {
        items.forEach(item => {
            const sum = item.price * item.quantity;
            total += sum;
        });
    }
    
    return (
        <Router>
            <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
                <AppHeader total={total}/>
                <Route path='/' exact component={MainPage}/>
                <Route path='/menu' component={MainPage}/>
                <Route path='/cart' exact component={CartPage}/>
            </div>
        </Router>
        
    )
}

const mapStateToProps = ({items}) => {
    return {
       items 
    }
};

// const mapDispatchToProps = {
//     deleteFromCart
// }


export default connect(mapStateToProps)(App);