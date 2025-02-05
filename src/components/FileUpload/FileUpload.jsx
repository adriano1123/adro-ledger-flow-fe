import React from 'react';

function FileUpload({ onFileUploaded }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileUploaded(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    onFileUploaded(file);
  };

  const preventDefaults = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
        onDragEnter={preventDefaults}
        onDragOver={preventDefaults}
        onDrop={handleDrop}
        style={{
            border: '2px dashed #ccc',
            borderRadius: '20px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer'
        }}
    >
      <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} id="fileElem" />
      <p>Drag & drop CSV file here or click to select file</p>
    </div>
  );
}

export default FileUpload;