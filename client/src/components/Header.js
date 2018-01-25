import React from 'react'
import Icon from './Icon'
import { ICONS } from '../constants'

const Header = ({onToggleEditorBar, onTogglePreviewBar, onToggleSplitView, loadSampleData, loadFile, inputPaneVisible, outputPaneVisible}) => {
    const onFileUploadClick = () => {
        const fileInput = document.querySelector('input[type="file"]')
        fileInput.click();
    }
    return (
        <header>
            <h1 className='logo'>Yame.</h1>
            <p className='tagline'>Yet Another Markdown Editor.</p>
            <nav>
                <ul>

                    <button 
                        className="nav__button fileContainer" 
                        onClick={onFileUploadClick}>
                        <Icon icon={ICONS.UPLOAD} />
                        <input onChange={loadFile} type="file" />
                    </button>
                    

                    
                    
                    <button 
                        className="nav__button">
                        <Icon icon={ICONS.DOWNLOAD} />
                        <span>Download</span>
                    </button>
              

                    <button 
                        className="nav__button" 
                        onClick={loadSampleData}>
                        Load Sample
                    </button>
                </ul>

            </nav>
        </header>

    )
}

export default Header