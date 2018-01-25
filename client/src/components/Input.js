import React from 'react'
import Icon from './Icon'
import { ICONS } from '../constants'

const Input = ({ onUploadFile, onInputChange, source, onToggleEditorBar, onTogglePreviewBar, inputPaneVisible, outputPaneVisible, onToggleSplitView, onDownloadMarkdown }) => {
    const onFileUploadClick = () => {
        const fileInput = document.querySelector('input[type="file"]')
        fileInput.click();
    }

    const onCopyInput = () => {
        window.getSelection().removeAllRanges();
        const input = document.querySelector('.input__src')
        const range = document.createRange();
        range.selectNode(input);
        window.getSelection().addRange(range);

        try {
            document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }

    return (
        <div className="input">
            <div className="view__buttons">


                {
                    !outputPaneVisible && inputPaneVisible &&
                    <button
                        onClick={onTogglePreviewBar}>
                        <Icon icon={ICONS.PREVIEW} />
                    </button>

                }
                {
                    !outputPaneVisible && inputPaneVisible &&
                    <button
                        onClick={onToggleSplitView}>
                        <Icon icon={ICONS.SPLIT} />
                    </button>

                }

                {
                    outputPaneVisible && inputPaneVisible &&
                    <button onClick={onToggleEditorBar}>
                        <Icon icon={ICONS.EXPAND} />
                    </button>
                }
                <button 
                className="fileContainer" 
                onClick={onFileUploadClick}>
                <Icon icon={ICONS.UPLOAD} />
                <input onChange={onUploadFile} type="file" />
            </button>
                <button onClick={onCopyInput}>
                    <Icon icon={ICONS.COPY} />
                </button>
                <button
                    onClick={onDownloadMarkdown}>
                    <Icon icon={ICONS.DOWNLOAD} />
                </button>
            </div>
            <textarea
                onChange={(e) => onInputChange(e.target.value)}
                className="input__src"
                spellCheck={true}
                autoFocus={true}
                value={source}
            >
            </textarea>

        </div>
    )
}

export default Input