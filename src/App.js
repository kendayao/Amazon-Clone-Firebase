import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import "./App.css";
import { Route, Switch, Redirect} from 'react-router-dom';
import "react-router-dom";

function App() {
  return (
    <div className="app">
        <Header />  
        <Route exact path="/" component={Home} />
        <Route exact path="/checkout" component={Checkout} />
    </div>
  );
}

export default App;
