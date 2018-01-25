import React from 'react'
import ReactMarkdown from 'react-markdown'
import Icon from './Icon'
import { ICONS } from '../constants'


const Output = ({ source }) => {
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
                <button onClick={(e) => onCopyOutput(e)}>
                  <Icon icon={ICONS.COPY} />
                </button>
              </div>
              <ReactMarkdown className="output__src" source={source}></ReactMarkdown>
            </div>
    )
}

export default Output