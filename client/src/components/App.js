import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import fs from 'fs'
import 'normalize.css';
import '../styles/App.scss';
import axios from 'axios'
import { debounce } from 'lodash'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      md: '',
      showPreviewBar: true,
      showEditor: true
    };
  }

  loadSampleData = () => {

    axios.get('/api/sample')
      .then(res => this.setState({ md: res.data }))
      .catch(e => alert('That didnt work.' + e))

  }

  toggleBar = () => {
    // if both editor and preview are visible, toggle preview
    const { showEditor, showPreviewBar } = this.state;

    this.setState({
      showPreviewBar: !showPreviewBar,
      showEditor: !showEditor

    })
  }

  setDimensionsState = () => {
    const { showEditor, showPreviewBar } = this.state;
    if (window.innerWidth < 768) {
      if (showEditor && showPreviewBar) {
        // ie its in full screen mode
        this.setState({
          showEditor: true,
          showPreviewBar: false
        })
      }
    } else {
      this.setState({
        showEditor: true,
        showPreviewBar: true
      })
    }
  }

    componentWillMount(){
      this.setDimensionsState()
      window.addEventListener('resize', debounce(() => this.setDimensionsState(), 50))
    }
    componentWillUnmount(){
      window.removeEventListener('resize')
    }
    render() {
      return (
        <div className="app">
          <header>
            <h1>React Markdown Previewer</h1>
            <nav>
              <button className="nav__button" onClick={this.loadSampleData}>LOAD SAMPLE DATA</button>
              <button className="nav__button" onClick={this.toggleBar}>Toggle Preview</button>
              <button className="nav__button">Upload .md</button>
              <button className="nav__button">Download HTML</button>
            </nav>
          </header>
          <main className="main">
            {
              this.state.showEditor &&
              <div className="input">
                <textarea
                  onChange={e => this.setState({ md: e.target.value })}
                  ref={input => this.textarea = input}
                  name="md-input"
                  id="md-input"

                  spellCheck={true}
                  autoFocus={true}
                  value={this.state.md}
                >
                </textarea>
              </div>
            }

            {
              this.state.showPreviewBar &&
                <ReactMarkdown className={'output'} source={this.state.md} />


            }
          </main>
          
        </div>
      );
    }
  }

  export default App;
