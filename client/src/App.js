import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import Display from "./components/Display";
import EditProduct from "./components/EditProducts";
import Category from "./components/Categories";
import Footer from "./components/Footer";

function App() {
 

  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Display />
          </Route>
          <Route exact path="/add_product">
            <AddProduct />
          </Route>
          <Route exact path="/category">
            <Category />
          </Route>
          <Route exact path="/edit_product/:id">
            <EditProduct />
          </Route>
        </Switch>
        <Footer/>
      </Router>

     
    </div>
  );
}

export default App;