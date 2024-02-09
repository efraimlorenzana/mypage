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
          SVG_ICONS : {},
          isLoading: true
      }
  }

  async componentDidMount() {
      /// Retrieved personalInfoes schema data from GraphqlCMS
      const data = await request(GRAPHCMS_ENDPOINT, GRAPHQL_QUERY_ALL);
      this.setState({ data });

      const SVG_ICONS = await this.handleSvgIcons(data);
      this.setState({ SVG_ICONS });
      this.setState({ isLoading : false });
      
  }
  
  handleSvgIcons = (data) => {
    const SVG_ICONS = {};

    data.svgIcons.map(i => SVG_ICONS[i.id] = i);

    return SVG_ICONS;
  }
  
  render() {
    const { data, isLoading, SVG_ICONS } = this.state;
   
    return isLoading ? <img className="loading-ui" src={Loading} alt="Loading..." /> : (
      <main className="App">
        <Navigation resume={data.resume} />
        <Content data={data} SVG_ICONS_OBJECT={SVG_ICONS}/>
      </main>
    );
  }
}

export default App;
