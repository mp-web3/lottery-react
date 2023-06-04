import React from "react";
import web3 from './web3';
import lottery from './lottery.js'

class App extends React.Component {
  /*
  constructor(props) {
    super(props);

    this.state = { manager: ''};
  }
  */
 /* Refactor the constructor */

 state = {
  manager: '',
  players: [],
  balance: ''
 };

  async componentDidMount() { /*automatically called whenever the app component is placed on the screen*/
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  render() {
    /*web3.eth.getAccounts().then(console.log);*/

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
      </div>
    );
  }
}
export default App;
