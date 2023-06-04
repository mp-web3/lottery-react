import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { manager: ''};
  }

  async componentDidMount() { /*automatically called whenever the app component is placed on the screen*/
    const manager = await lottery.methods.manager().call();

    this.setState({ manager });
  }

  render() {
    /*web3.eth.getAccounts().then(console.log);*/

    return (
      
    );
  }
}
export default App;
