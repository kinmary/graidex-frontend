import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image, Nav, Navbar } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { addFiles, removeFile } from "./CreateTestActions";
import { CreateTestReducer } from "./CreateTestReducer";
import { useAppDispatch } from "../../../app/hooks";
interface DropZoneProps {
  id: number;
  files?: any[]| undefined;
  previews?: any[] | undefined;
  onDrop: (acceptedFiles: any[]) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ id, files, previews, onDrop }) => {
  const dispatch = useAppDispatch();

  const handleDrop = (acceptedFiles: any[]) => {
    const files = acceptedFiles.map(file => {return {name:file.name, path: file.path, type: file.type}});
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    dispatch(addFiles(id, files, previews));
  };

  const handleOpenPDF = (preview: any) => {
    window.open(preview, "_blank");
  };

  const handleRemoveFile = (fileIndex: number) => {
    dispatch(removeFile(id, fileIndex));
  };


    return (
      <div style={{marginBottom: 20}}>
        <Dropzone onDrop={handleDrop} multiple>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Card
                className="text-center"
                style={{ padding: 10, border: "3px dashed #ced4da" }}
              >
                <Card.Title style={{ fontSize: "36px" }}>
                  <i className="bi bi-image"></i>
                </Card.Title>
                <Card.Text>
                  Drop images or files here, or click to select
                </Card.Text>
              </Card>
            </div>
          )}
        </Dropzone>
        {previews && previews.length > 0 &&
          previews.map((preview, index) => (
            <Navbar.Brand key={index} as="li" style={{ alignItems: "center" }}>
              {files && files[index].type.startsWith("image") ? (
                <>
                  <Image
                    key={index}
                    src={preview}
                    alt="Preview"
                    fluid
                    style={{ width: "20%" }}
                  />
                  <i
                    key={index + "i"}
                    className="bi bi-x"
                    style={{ marginLeft: 5 }}
                    onClick={() => handleRemoveFile(index)}
                  ></i>
                </>
              ) : (
                <>
                  <span
                    key={index}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                    onClick={() => handleOpenPDF(preview)}
                  >
                    {files && files[index].name}
                  </span>
                  <i
                    key={index + "i"}
                    className="bi bi-x"
                    style={{ marginLeft: 5 }}
                    onClick={() => handleRemoveFile(index)}
                  ></i>
                </>
              )}
            </Navbar.Brand>
          ))}
      </div>
    );
  }

export default DropZone;
 