import React from 'react'

const Header = ({onToggleEditorBar, onTogglePreviewBar, onToggleSplitView, loadSampleData, onLoadFile, inputPaneVisible, outputPaneVisible, downloadMarkdown, downloadHTML}) => {

    return (
        <header>
            <h1 className='logo'>Yame.</h1>
            <p className='tagline'>Yet Another Markdown Editor.</p>
        </header>

    )
}

export default Header