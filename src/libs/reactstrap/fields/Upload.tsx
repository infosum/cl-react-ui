/// <reference path="../../../interfaces.d.ts" />
import * as React from 'react';
import * as Dropzone from 'react-dropzone';
import {Input} from 'reactstrap';

export default ({value, name, onChange, onBlur, field}: FieldUpload) => {
  const {placeholder, multiple} = field;
  return <div>
          <Dropzone
            className="drop"
            multiple={multiple}
            onBlur={() => onBlur(name)}
            onDrop={(files) => {
              onChange(name, files);
              onBlur(name);
            }}>
            <div>{placeholder}</div>
          </Dropzone>

           {value !== '' ? <div>
                      {value.map((file) => {
                        if (file.type.indexOf('image') !== -1) {
                          return <img style={{width: '75px'}} src={file.preview} />;
                        } else {
                          return <div>{file.name}</div>;
                        }
                      },
                      )}
                    </div> : null}
        </div>;
};
