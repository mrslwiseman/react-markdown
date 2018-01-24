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
      showEditor: true,
      file: null
    };
  }

  // LIFE CYCLE HOOKS

  componentWillMount() {
    this.setDimensionsState()
    //this.loadSampleData();
    window.addEventListener('resize', debounce(() => this.setDimensionsState(), 50))
  }
  componentWillUnmount() {
    window.removeEventListener('resize')
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

  onToggleEditorBar = () => {
    const { showEditor } = this.state;
    
    this.setState({
      showEditor: !showEditor

    })
  }
  onTogglePreviewBar = () => {
    const { showPreviewBar } = this.state;
    this.setState({
      showPreviewBar: !showPreviewBar,

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



  loadFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      // do something with the file ie upload to cloud
      this.setState({
        md: e.target.result
      })
      console.log(e.target.result)
    }
    reader.readAsText(file)
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>React Markdown Previewer</h1>
          <nav>
          <button className="nav__button" onClick={this.loadSampleData}>Sample</button>
          <button className="nav__button" onClick={this.onTogglePreviewBar}>Toggle</button>
          <button className="nav__button" onClick={this.onToggleEditorBar}>Toggle</button>
            <form>
              <input type="file" name="markdown" id="markdown" onChange={this.loadFile} />
            </form>
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
