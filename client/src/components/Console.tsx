import React, {ForwardedRef, forwardRef, useImperativeHandle, useState} from 'react';

export type Log = {
  msg?: string | null;
  error?: { Msg: string; Pos: { Line: number } }[] | null;
}

const Console = forwardRef((_, ref: ForwardedRef<{ update: (log: Log) => void }>) => {
  const [logs, setLogs] = useState<Log[]>([]);
  useImperativeHandle(ref, () => ({
    update: (log: Log) => {
      setLogs([...logs, log]);
    }
  }));
  return (
    <div className="local-console" style={{ height: '100%', overflow: 'hidden auto' }}>
      <h3>Console</h3>
      <ul>
        {logs.map((log, i) =>
          <li key={i}>
            {log.error ? (
              <span className="local-console__error">
                {`> ${log.error.length
                  ? log.error.map((each) => `line ${each.Pos.Line}: ${each.Msg}`).join('\n')
                  : ''}`
                }
              </span>
            ) : ''}
            {!log.error ? (
              <span>{`> ${log.msg}`}</span>
            ) : ''}
          </li>)
        }
      </ul>
    </div>
  );
})

export default Console;
