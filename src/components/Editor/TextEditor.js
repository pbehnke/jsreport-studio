import React, { Component } from 'react'
import MonacoEditor from 'react-monaco-editor'
import { subscribeToSplitResize } from '../../lib/configuration.js'

export default class TextEditor extends Component {
  static propTypes = {
    value: React.PropTypes.string,
    onUpdate: React.PropTypes.func.isRequired,
    mode: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.editorWillMount = this.editorWillMount.bind(this)
  }

  componentDidMount () {
    this.refs.monaco.editor.focus()

    this.unsubscribe = subscribeToSplitResize(() => {
      this.refs.monaco.editor.layout()
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  get mainEditor () {
    return this.refs.monaco
  }

  render () {
    const { value, onUpdate, name, mode } = this.props

    const editorOptions = {
      roundedSelection: false,
      automaticLayout: false,
      dragAndDrop: false
    }

    return (
      <MonacoEditor
        name={name}
        ref='monaco'
        width='100%'
        language={mode}
        value={value || ''}
        editorWillMount={this.editorWillMount}
        options={editorOptions}
        onChange={(v) => onUpdate(v)}
      />
    )
  }
}
