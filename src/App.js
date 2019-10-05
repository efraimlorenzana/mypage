import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Content from './Pages/Content';
import Loading from './Data/Images/loading.gif';

import { request } from 'graphql-request';
import { GRAPHCMS_ENDPOINT, GRAPHQL_QUERY_ALL } from './Data/graphql-cms-api';

class App extends Component {
  constructor() {
      super();
      this.state = {
          data : {},
          isLoading: true
      }
  }

  async componentDidMount() {
      /// Retrieved personalInfoes schema data from GraphqlCMS
      const data = await request(GRAPHCMS_ENDPOINT, GRAPHQL_QUERY_ALL);
      this.setState({ data });
      this.setState({isLoading : false});
  }
  render() {
    const { data, isLoading } = this.state;
    //console.log(data);
    return isLoading ? <img className="loading-ui" src={Loading} alt="Loading..." /> : (
      <main className="App">
        <Navigation />
        <Content data={data}/>
      </main>
    );
  }
}

export default App;
