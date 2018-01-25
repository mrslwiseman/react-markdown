import React from 'react'
import Icon from './Icon'
import { ICONS } from '../constants'

const Header = ({onToggleEditorBar, onTogglePreviewBar, loadSampleData, loadFile}) => {
    const onFileUploadClick = () => {
        const fileInput = document.querySelector('input[type="file"]')
        fileInput.click();
    }
    return (
        <header>
            <h1>Yame.</h1>
            <p>Yet Another Markdown Editor.</p>
            <nav>
                <ul>

                    <button 
                        className="nav__button fileContainer" 
                        onClick={onFileUploadClick}>
                        <Icon icon={ICONS.UPLOAD} />
                        <input onChange={loadFile} type="file" />
                    </button>
                    <button 
                        className="nav__button" 
                        onClick={onToggleEditorBar}>
                        <Icon icon={ICONS.EDIT} />
                        <span>Toggle Editor</span>
                    </button>
                    <button 
                        className="nav__button" 
                        onClick={onTogglePreviewBar}>
                        <Icon icon={ICONS.PREVIEW} />
                        <span>Toggle Preview</span>
                    </button>
                    <button 
                        className="nav__button">
                        <Icon icon={ICONS.DOWNLOAD} />
                        <span>Download</span>
                    </button>
                    <button 
                        className="nav__button"> 
                        <Icon icon={ICONS.SHARE} />
                        <span>Share</span>
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