import React, { Component } from 'react'
import Loading from '../widgets/Loading';
import DataHandler from '../../data/DataHandler';

class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      leads: []
    };
  }
  
  async componentDidMount() {
    let leads = await DataHandler.getAllLeads();
    this.setState({
      loading: false,
      leads
    });
  }
  
  render() {
    if(this.state.loading) {
      return (
        <Loading />
      );
    }
    
    return (
      <main id='app'>
      </main>
    )
  }
}

export default Home;
