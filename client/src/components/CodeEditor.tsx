import React, {ForwardedRef, forwardRef, useImperativeHandle, useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage  } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go'
import {debounce} from '../utils';

type Props = {
  onChange?: (code: string) => void;
}

const CodeEditor = forwardRef((props: Props, ref: ForwardedRef<{ update: (code: string) => void }>) => {
  const [localCode, setLocalCode] = useState('');
  const onCodeChange = debounce((value: string) => {
    setLocalCode(value)
    if (typeof props.onChange === 'function') {
      props.onChange(value)
    }
  });
  useImperativeHandle(ref, () => ({
    update: (code: string) => {
      setLocalCode(code);
    }
  }), []);
  return (
    <div className="code-editor" style={{ maxHeight: '100%', overflow: 'hidden auto' }}>
      <CodeMirror
        theme="dark"
        placeholder="Take a try with going ship!"
        minHeight="500px"
        extensions={[StreamLanguage.define(go)]}
        value={localCode}
        onChange={onCodeChange}
      />
    </div>
  );
})

export default CodeEditor;
