import React from 'react'
import { format } from '../format'
import { BUTTON } from '../constants'
import {
    MdOpenInNew, MdFileDownload, MdRemoveRedEye as MdPreview, MdContentCopy, MdCompare, MdFileUpload,
    MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdCode, MdStrikethroughS, MdFormatQuote, MdFormatSize
} from 'react-icons/lib/md'

const Input = ({ onUploadFile, onInputChange, source, onToggleEditorBar, onTogglePreviewBar, inputPaneVisible, outputPaneVisible, onToggleSplitView, onDownloadMarkdown }) => {
    let textarea;
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
            alert('That didnt work. Try Select All > Copy');
        }
    }

    const onFormat = (e) => {
        const formatType = e.target.dataset.format
        const updatedValue = format(formatType, textarea)

        onInputChange(updatedValue)
    }

    return (
        <div className="input">
            <div className="view__buttons">

                <div className="view__format-buttons">
                    <button data-format={'h1'} onClick={onFormat}>
                        H1
                    </button>
                    <button data-format={'h2'} onClick={onFormat}>
                        H2
                    </button>
                    <button data-format={'h3'} onClick={onFormat}>
                        H3
                    </button>
                    <button data-format={'bold'} onClick={e => onFormat(e)}>
                        <MdFormatBold />
                    </button>
                    <button data-format={'italic'} onClick={onFormat}>
                        <MdFormatItalic />
                    </button>
                    <button data-format={'strikethrough'} onClick={onFormat}>
                        <MdStrikethroughS />
                    </button>
                    <button data-format={'list_bullet'} onClick={onFormat}>
                        <MdFormatListBulleted />
                    </button>
                    <button data-format={'list_number'} onClick={onFormat}>
                        <MdFormatListNumbered />
                    </button>
                    <button data-format={'code'} onClick={onFormat}>
                        <MdCode />
                    </button>
                    <button data-format={'blockquote'} onClick={onFormat}>
                        <MdFormatQuote />
                    </button>
                </div>

                {
                    !outputPaneVisible && inputPaneVisible &&
                    <span>
                        <button
                        title={BUTTON.togglePreview}
                        onClick={onTogglePreviewBar}>
                        <MdPreview />
                        </button>
                        <button
                        title={BUTTON.toggleSplitView}
                        onClick={onToggleSplitView}>
                        <MdCompare />
                        </button>
                    </span>
                }
                
                <button
                    title={BUTTON.upload}
                    className="fileContainer"
                    onClick={onFileUploadClick}>
                    <MdFileUpload />
                    <input onChange={onUploadFile} type="file" />
                </button>

                <button
                    title={BUTTON.copyMD}
                    onClick={onCopyInput}>
                    <MdContentCopy />
                </button>

                <button
                    title={BUTTON.downloadMD}
                    onClick={onDownloadMarkdown}>
                    <MdFileDownload />
                </button>

                {
                    outputPaneVisible && inputPaneVisible &&
                    <button
                        title={BUTTON.expandEditor}
                        onClick={onToggleEditorBar}>
                        <MdOpenInNew />
                    </button>
                }
            </div>
            <textarea
                ref={x => textarea = x}
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