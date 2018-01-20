import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import fs from 'fs'
import 'normalize.css'; 
import '../styles/App.scss';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      md: ''
    };
  }

loadSampleData = () => {
  
axios.get('/api/sample')
.then(res => this.setState({md: res.data}))
.catch(e => alert('That didnt work.' + e))

}

  render() {
    return (
      <div className="app">
        <header>
          <h1>React Markdown Previewer</h1>
          <nav>
              <button className="nav__button" onClick={this.loadSampleData}>LOAD SAMPLE DATA</button>
              <button className="nav__button">Share</button>
              <button className="nav__button">Upload .md</button>
              <button className="nav__button">Download HTML</button>
          </nav>
        </header>
        <main className="main">
          <div className="input">
            <textarea 
              onChange = {e => this.setState({md: e.target.value})} 
              ref={input => this.textarea = input} 
              name="md-input" 
              id="md-input" 
              cols="30" 
              rows="10"
              spellcheck
              autofocus
              value={this.state.md}
              >
            </textarea>
            </div>
            <div className="output">
            <ReactMarkdown className={'output__rendered'} source={this.state.md} />
            </div>
            </main>
            <footer>
              <button>Upload .md</button>
              <button>Download .md</button>
              <button>Copy to Clipboard</button>
              <button>Download .html</button>
              <button>Copy to Clipboard</button>
            </footer>
      </div>
    );
  }
}

export default App;
