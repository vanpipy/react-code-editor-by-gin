import React, {useRef, useState} from 'react';
import CodeEditor from './components/CodeEditor';
import FilesList from './components/FilesList';
import Console, {Log} from './components/Console';
import {save} from './models/files.model';
import {executeCode} from './models/code.model';
import {debounce} from './utils';
import './App.css';

function App() {
  const codeEditorRef = useRef<{ update: (code: string) => void }>(null);
  const filesListRef = useRef<{ update: () => void }>(null);
  const consoleRef = useRef<{ update: (log: Log) => void }>(null);
  const [code, setCode] = useState('');
  const onCodeChange = (newCodeValue: string) => {
    setCode(newCodeValue);
  };
  const onFileChange = (changedCodeValue: string) => {
    setCode(changedCodeValue);
    codeEditorRef.current?.update(changedCodeValue);
  };
  const onRunCode = debounce(async () => {
    const result = await executeCode(code);
    consoleRef.current?.update(result);
  });
  const onSaveCode = debounce(() => {
    save(Date.now(), code);
    filesListRef.current?.update();
  }, 100);
  return (
    <div className="app">
      <div className="app-layout">
        <div className="app__code-editor app-layout__half">
          <CodeEditor ref={codeEditorRef} onChange={onCodeChange}/>
        </div>
        <div className="app-layout__half">
          <div className="app__files-list">
            <FilesList ref={filesListRef} onFileChange={onFileChange} />
            <div className="app__operation">
              <button className="app__button" onClick={onRunCode}>Run</button>
              <button className="app__button" onClick={onSaveCode}>Save</button>
            </div>
          </div>
          <div className="app__console">
            <Console ref={consoleRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
