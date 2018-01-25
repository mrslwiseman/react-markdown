import React, { Component } from 'react';
import 'normalize.css';
import '../styles/App.scss';
import axios from 'axios'
import { debounce } from 'lodash'
import Header from './Header'
import Input from './Input'
import Output from './Output'

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
        loadFile={this.loadFile}

        />
        <main className="main">
          {
            this.state.showEditor &&
            <Input onInputChange={this.onInputChange} source={this.state.md} />
            
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
