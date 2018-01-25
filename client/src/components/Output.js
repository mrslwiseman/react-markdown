import React from 'react'
import ReactMarkdown from 'react-markdown'
import Icon from './Icon'
import { ICONS, BUTTON } from '../constants'


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
                    <button
                        title={BUTTON.toggleEditor}
                        onClick={onToggleEditorBar}>
                        <Icon icon={ICONS.EDIT} />
                    </button>


                }
                {
                    outputPaneVisible && !inputPaneVisible &&
                    <button
                        title={BUTTON.toggleSplitView}
                        onClick={onToggleSplitView}>
                        <Icon icon={ICONS.SPLIT} />
                    </button>


                }
                
                {
                    outputPaneVisible && inputPaneVisible &&
                    <button 
                    title={BUTTON.expandPreview}
                    onClick={onTogglePreviewBar}>
                        <Icon icon={ICONS.EXPAND} />
                    </button>
                }
                <button
                    title={BUTTON.copyHTML}
                    onClick={(e) => onCopyOutput(e)}>
                    <Icon icon={ICONS.COPY} />
                </button>
                <button
                    title={BUTTON.downloadHTML}
                    onClick={onDownloadHTML}>
                    <Icon icon={ICONS.DOWNLOAD} />
                </button>

            </div>
            <ReactMarkdown className="output__src" source={source}></ReactMarkdown>
        </div >
    )
}

export default Output