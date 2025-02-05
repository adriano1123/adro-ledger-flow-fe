import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon } from '@mui/icons-material';
import './FileUpload.css'

function FileUpload({ onFileUploaded }) {
  const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      if (file) onFileUploaded(file);
    }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: '.csv',
      multiple: false
    });

  return (
    <div
          {...getRootProps()}
          className={`upload-container ${isDragActive ? 'active' : ''}`}
        >
          <input {...getInputProps()} />
          <UploadIcon fontSize="large" />
          <p>
            {isDragActive
              ? 'Drop the CSV file here'
              : 'Drag & drop CSV file, or click to select'}
          </p>
        </div>
  );
}

export default FileUpload;