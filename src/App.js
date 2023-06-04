import React, { useState, useEffect } from "react";
import web3 from './web3';
import lottery from './lottery.js'


function App() {

 const [ manager, setManager ] = useState('');
 const [ players, setPlayers ] = useState([]);
 const [ balance, setBalance ] = useState('');
 const [ value, setValue ] = useState('');

 useEffect(() => {
  const fetchData = async () => {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    setManager(manager);
    setPlayers(players);
    setBalance(balance);
  }; 
  fetchData();
 }, []);

 /*
 state = {
  manager: '',
  players: [],
  balance: '',
  value: ''
 };

  async componentDidMount() { 
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }
  */

  /*web3.eth.getAccounts().then(console.log);*/

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send()({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    });
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}.
        There are currently {players.length} people entered,
        competing to win {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />
      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={event => setValue(event.target.value)} />
        </div>
        <button>Enter</button>
      </form>
    </div>
  );
  
}

export default App;
