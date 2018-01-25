import React, { Component } from 'react';
import 'normalize.css';
import '../styles/App.scss';
import axios from 'axios'
import { debounce } from 'lodash'
import Header from './Header'
import Input from './Input'
import Output from './Output'
import {saveAs} from 'file-saver'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      md: '',
      outputPaneVisible: true,
      inputPaneVisible: true,
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


  onDownloadMarkdown = () => {
    const file = new File([this.state.md], "yame.md", {type: "text/plain;charset=utf-8"});
    saveAs(file)
  }

  onDownloadHTML = () => {
    const html = document.querySelector('.output__src').innerHTML
    const file = new File([html], "yame.html", {type: "text/plain;charset=utf-8"});
    saveAs(file)
  }



  loadSampleData = () => {
    axios.get('/api/sample')
      .then(res => this.setState({ md: res.data }))
      .catch(e => alert('That didnt work.' + e))
  }

  onToggleEditorBar = () => {
    this.setState({
      outputPaneVisible: false,
      inputPaneVisible: true
    })
  }
  onTogglePreviewBar = () => {
    this.setState({
      outputPaneVisible: true,
      inputPaneVisible: false
    })
  }
  onToggleSplitView = () => {
    if(window.innerWidth > 768){

      this.setState({
        outputPaneVisible: true,
        inputPaneVisible: true
      })
    } 
  }

  setDimensionsState = () => {
    const { inputPaneVisible, outputPaneVisible } = this.state;
    if (window.innerWidth < 768) {
      if (inputPaneVisible && outputPaneVisible) {
        // ie its in full screen mode
        this.setState({
          inputPaneVisible: true,
          outputPaneVisible: false
        })
      }
    } else {
      this.setState({
        inputPaneVisible: true,
        outputPaneVisible: true
      })
    }
  }

  onUploadFile = (e) => {
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


onInputChange = (md) => {
  this.setState({md})
}

  render() {
    return (
      <div className="app">
        <Header 
        onToggleEditorBar={this.onToggleEditorBar}
        onTogglePreviewBar={this.onTogglePreviewBar}
        loadSampleData={this.loadSampleData}
        
        outputPaneVisible={this.state.outputPaneVisible}
        inputPaneVisible={this.state.inputPaneVisible}
        
        />
        <main className="main">
          {
            this.state.inputPaneVisible &&
            <Input onUploadFile={this.onUploadFile} onDownloadMarkdown={this.onDownloadMarkdown} onToggleSplitView={this.onToggleSplitView} inputPaneVisible={this.state.inputPaneVisible} outputPaneVisible={this.state.outputPaneVisible} onTogglePreviewBar={this.onTogglePreviewBar} onToggleEditorBar={this.onToggleEditorBar} onInputChange={this.onInputChange} source={this.state.md} />
            
          }

          {
            this.state.outputPaneVisible &&
        
        <Output onDownloadHTML={this.onDownloadHTML} onToggleSplitView={this.onToggleSplitView} inputPaneVisible={this.state.inputPaneVisible} outputPaneVisible={this.state.outputPaneVisible} onToggleEditorBar={this.onToggleEditorBar} onTogglePreviewBar={this.onTogglePreviewBar} source={this.state.md} />
          }
        </main>

      </div>
    );
  }
}

export default App;
