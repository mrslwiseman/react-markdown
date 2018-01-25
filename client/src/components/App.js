import React, { Component } from 'react';
import 'normalize.css';
import '../styles/App.scss';
import axios from 'axios'
import { debounce } from 'lodash'
import Input from './Input'
import Output from './Output'
import Icon from './Icon'
import { ICONS } from '../constants'



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
    console.log(e.target.files);

    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          md: e.target.result
        })
      }
      reader.readAsText(file)
    }
  }

  onFileUploadClick = () => {
    this.fileInput.click()
  }





updateSrc = (md) => {
  this.setState({md})
}


  render() {
    return (
      <div className="app">
        <header>
          <h1>Yame.</h1>
          <p>Yet Another Markdown Editor.</p>
          <nav>
            <ul>

              <button className="nav__button fileContainer" onClick={this.onFileUploadClick}>
                <Icon icon={ICONS.UPLOAD} />
                <input ref={input => this.fileInput = input} onChange={this.loadFile} type="file" name="file" id="file" />
              </button>
              <button className="nav__button" onClick={this.onToggleEditorBar}>
                <Icon icon={ICONS.EDIT} />
                <span>Toggle Editor</span>
              </button>
              <button className="nav__button" onClick={this.onTogglePreviewBar}>
                <Icon icon={ICONS.PREVIEW} />
                <span>Toggle Preview</span>
              </button>
              <button className="nav__button" onClick={this.onCopyInput}>
                <Icon icon={ICONS.COPY} />
                <span>Copy</span>
              </button>
              <button className="nav__button" onClick={this.onTogglePreviewBar}>
                <Icon icon={ICONS.DOWNLOAD} />
                <span>Download</span>
              </button>
              <button className="nav__button" onClick={this.onTogglePreviewBar}>
                <Icon icon={ICONS.SHARE} />
                <span>Share</span>
              </button>

              <button className="nav__button" onClick={this.loadSampleData}>
                Load Sample
              </button>
            </ul>

          </nav>
        </header>
        <main className="main">
          {
            this.state.showEditor &&
            <Input updateSrc={this.updateSrc} source={this.state.md} />
            
          }

          {
            this.state.showPreviewBar &&
            <Output source={this.state.md} />
          }
        </main>

      </div>
    );
  }
}

export default App;
