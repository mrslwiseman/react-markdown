import React from 'react'
import ReactMarkdown from 'react-markdown'
import {BUTTON} from '../constants'
import {MdEdit, MdOpenInNew, MdFileDownload, MdContentCopy, MdCompare} from 'react-icons/lib/md'

const Output = ({ source, onToggleEditorBar, onTogglePreviewBar, inputPaneVisible, outputPaneVisible, onToggleSplitView, onDownloadHTML }) => {
    const onCopyOutput = (e) => {
        const input = document.createElement('input')
        const outputHTML = document.querySelector('.output__src').innerHTML
        input.value = outputHTML
        document.body.append(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
    }
    return (
        <div className="output">
            <div className="view__buttons">
                {
                    outputPaneVisible && !inputPaneVisible &&
                    <span>
                        <button
                        title={BUTTON.toggleEditor}
                        onClick={onToggleEditorBar}>
                        <MdEdit />
                        </button>
                        <button
                        title={BUTTON.toggleSplitView}
                        onClick={onToggleSplitView}>
                        <MdCompare />
                        </button>
                    </span>

                }
           
                
                {
                    outputPaneVisible && inputPaneVisible &&
                    <button 
                    title={BUTTON.expandPreview}
                    onClick={onTogglePreviewBar}>
                    <MdOpenInNew />
                    </button>
                }
                <button
                    title={BUTTON.copyHTML}
                    onClick={(e) => onCopyOutput(e)}>
                    <MdContentCopy />
                </button>
                <button
                    title={BUTTON.downloadHTML}
                    onClick={onDownloadHTML}>
                    <MdFileDownload />
                </button>

            </div>
            <ReactMarkdown className="output__src" source={source}></ReactMarkdown>
        </div >
    )
}

export default Output