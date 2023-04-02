import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../../utils/withRouter";
import { Card, Image, Nav, Navbar } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { addFiles, removeFile } from "./CreateTestActions";
import { CreateTestReducer } from "./CreateTestReducer";

class DropZone extends Component {
  handleDrop = (acceptedFiles) => {
    const files = acceptedFiles.map(file => {return {name:file.name, path: file.path, type: file.type}});
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    this.props.addFiles(this.props.id, files, previews);
  };

  handleOpenPDF = (preview) => {
    window.open(preview, "_blank");
  };

  handleRemoveFile = (fileIndex) => {
    this.props.removeFile(this.props.id, fileIndex);
  };

  render() {
    const { files, previews } = this.props;
    return (
      <>
        <Dropzone onDrop={this.handleDrop} multiple>
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
        {previews.length > 0 &&
          previews.map((preview, index) => (
            <Navbar.Brand key={index} as="li" style={{ alignItems: "center" }}>
              {files[index].type.startsWith("image") ? (
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
                    onClick={() => this.handleRemoveFile(index)}
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
                    onClick={() => this.handleOpenPDF(preview)}
                  >
                    {files[index].name}
                  </span>
                  <i
                    key={index + "i"}
                    className="bi bi-x"
                    style={{ marginLeft: 5 }}
                    onClick={() => this.handleRemoveFile(index)}
                  ></i>
                </>
              )}
            </Navbar.Brand>
          ))}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
    createTest: state.createTest,
  };
}

export default withRouter(
  connect(mapStateToProps, { addFiles, removeFile })(DropZone)
);
