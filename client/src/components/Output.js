import React from 'react'
import ReactMarkdown from 'react-markdown'
import Icon from './Icon'
import { ICONS } from '../constants'


const Output = ({ source, onToggleEditorBar, onTogglePreviewBar, inputPaneVisible, outputPaneVisible, onToggleSplitView }) => {
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
                        onClick={onToggleEditorBar}>
                        <Icon icon={ICONS.EDIT} />
                    </button>


                }
                {
                    outputPaneVisible && !inputPaneVisible &&
                    <button
                    onClick={onToggleSplitView}>
                    <Icon icon={ICONS.SPLIT} />
                </button>


                }
                {
                    !outputPaneVisible && inputPaneVisible &&
                    <button
                        onClick={onTogglePreviewBar}>
                        <Icon icon={ICONS.PREVIEW} />
                    </button>
                }
                {
                    outputPaneVisible && inputPaneVisible &&
                    <button onClick={onTogglePreviewBar}>
                        <Icon icon={ICONS.EXPAND} />
                    </button>
                }
                <button onClick={(e) => onCopyOutput(e)}>
                    <Icon icon={ICONS.COPY} />
                </button>

            </div>
            <ReactMarkdown className="output__src" source={source}></ReactMarkdown>
        </div >
    )
}

export default Output