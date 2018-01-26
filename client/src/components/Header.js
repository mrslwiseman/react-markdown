import React from 'react'

const Header = ({onToggleEditorBar, onTogglePreviewBar, onToggleSplitView, loadSampleData, onLoadFile, inputPaneVisible, outputPaneVisible, downloadMarkdown, downloadHTML}) => {

    return (
        <header>
            <h1 className='logo'>Yame<span className='tagline'>Yet Another Markdown Editor.</span></h1>
            
        </header>

    )
}

export default Header