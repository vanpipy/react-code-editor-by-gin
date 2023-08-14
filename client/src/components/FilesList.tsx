import React, {ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {queryStorage, remove} from '../models/files.model';

type Props = {
  activeIndex?: number;
  onFileChange?: (code: string) => void;
}

const FilesList = forwardRef((props: Props, ref: ForwardedRef<{ update: () => void }>) => {
  const [filesList, setFilesList] = useState<Array<{ id: string; code: string }>>([]);
  const onFileClick = (file: { id: string; code: string }) => {
    if (typeof props.onFileChange === 'function') {
      props.onFileChange(file.code);
    }
  };
  const onFileRemove = (event: any, file: { id: string; code: string }) => {
    event?.stopPropagation();
    remove(file.id);
    update();
  };
  const update = () => {
    const latestFilesList = queryStorage();
    setFilesList(latestFilesList);
  };
  useImperativeHandle(ref, () => ({ update  }), []);
  useEffect(() => {
    update();
  }, []);
  return (
    <div className="files-list" style={{ maxHeight: '100%', overflow: 'hidden auto' }}>
      <ul>
        {filesList.map((file, i) =>
          <li key={i} onClick={() => onFileClick(file)}>
            <span className="files-list__saved">Saved {file.id}</span>
            <span className="files-list__close" onClick={(event) => onFileRemove(event, file)}>x</span>
          </li>)
        }
      </ul>
    </div>
  );
})

export default FilesList;
