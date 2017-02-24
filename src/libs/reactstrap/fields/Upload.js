// @flow
import React from 'react';
import {Input} from 'reactstrap';
import {FormFieldProps} from '../../../types';
import Dropzone from 'react-dropzone';

export default ({value, name, onChange, onBlur, field}: FormFieldProps) => {
  const {placeholder, multiple} = field;
  return <div>
          <Dropzone
            multiple={multiple}
            onBlur={() => onBlur(name)}
            onDrop={files => onChange(name, files)}>
            <div>{placeholder}</div>
          </Dropzone>

           {value !== '' ? <div>
                      {value.map((file) => {
                        if (file.type.indexOf('image') !== -1) {
                          return <img style={{width: '75px'}} src={file.preview} />;
                        } else {
                          return <div>{file.name}</div>;
                        }
                      }
                      )}
                    </div> : null}
        </div>;
}
