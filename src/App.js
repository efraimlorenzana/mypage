import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Content from './Pages/Content';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Navigation />
        <Content />
      </main>
    );
  }
}

export default App;
