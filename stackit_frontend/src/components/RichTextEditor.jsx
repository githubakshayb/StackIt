// RichTextEditor.jsx
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  return (
    <div style={{ width: "100%", marginBottom: "16px" }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: "white",
          color: "#000",
          borderRadius: "6px",
        }}
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            ['clean'],
          ],
        }}
        formats={[
          'bold', 'italic', 'underline', 'strike',
          'list', 'bullet', 'link', 'image', 'align',
        ]}
      />
    </div>
  );
};

export default RichTextEditor;
