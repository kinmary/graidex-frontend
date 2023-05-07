import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { SetOpen } from "../MainAction";
import {
  Form,
  InputGroup,
  Card,
  Container,
  Col,
  Row,
  Image,
  Badge
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { createClient } from 'pexels';
import { PEXEL_CLIENT_ID } from "../../constants/config";
import { updateSubject } from "../Dashboard/SubjectActions";


class ChangeImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImg: this.getCurrentImage(),
      search: "",
      images: this.addDefaultImages([]),
    };
  }
  closeModal() {
    this.setState({
      selectedImg: this.getCurrentImage(),
      search: "",
      images: this.addDefaultImages([]),
    });
    
    this.props.SetOpen("changeImgModal", false);
  }
  onAddImage(event) {
    event.preventDefault();

    let currentSubject = this.props.main.allSubjects
      .find(obj => obj.id.toString() === this.props.main.selectedSubjectId.toString());
    
    this.props.updateSubject(
      currentSubject.id,
      currentSubject.customId,
      currentSubject.title,
      this.state.selectedImg);

    let data = [];
    data.push(null);
    if (this.state.selectedImg !== null) {
      data.push(this.state.selectedImg);
    }

    this.setState({
      search: "",
      images: data,
    });

    this.props.SetOpen("changeImgModal", false);
  }

  getCurrentImage(){
    let currentImage = this.props.main.allSubjects
      .find(obj => obj.id.toString() === this.props.main.selectedSubjectId.toString())
      .imageUrl;

    return currentImage;
  }

  addDefaultImages(images){
    let currentImage = this.getCurrentImage();

    if (currentImage !== null) {
      images = images.filter((imageUrl) => imageUrl !== currentImage);
      images.push(null);
      images.push(currentImage);
    }
    else{
      images.push(null);
    }

    return images;
  }

  async handleSearch(event, data) {
    if (event.key && event.key !== "Enter"){
      return;
    }
    
    event.preventDefault();

    this.setState({
      selectedImg: this.getCurrentImage()
    });

    const query = this.state.search;
    if (!query.trim()) {
      let images = this.addDefaultImages([]);
      this.setState({
        images: images,
      });
      return;
    }

    let apiData = [];

    const client = createClient(PEXEL_CLIENT_ID);
    await client.photos.search({ query, per_page: 8 }).then(photos => {
      photos.photos.map(photo => { 
        apiData.push(photo.src.medium);
      });
    });

    let images = this.addDefaultImages(apiData);
    this.setState({images: images});
  }

  handleInputChange(event, data) {
    //check if event.target.value is right in console => source
    this.setState({ selectedImg: event.target.value });
  }
  render() {
    const { changeImgModal } = this.props.main;

    return (
      <>
        <Modal
          size="lg"
          show={changeImgModal}
          onHide={this.closeModal.bind(this)}
          centered
        >
          <Modal.Header closeButton>Choose new image</Modal.Header>
          <Modal.Body>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(event) => {this.setState({search: event.target.value})}}
                value={this.state.search}
                onKeyDown={this.handleSearch.bind(this)}
                />
              <InputGroup.Text
                id="image-search"
                aria-label="Search"
                onClick = {this.handleSearch.bind(this)}
                >
                  <i
                    className="bi bi-search"
                    style={{
                    fontSize: "1rem",
                    cursor: "pointer",
                    }}
                    ></i>
              </InputGroup.Text>
            </InputGroup>
                <Container fluid>
                  <Row xs={1} md={2} className="g-4 my-1">
                    {this.state.images.map((imageUrl, idx) => (
                      <Col key={idx}>
                        <Card 
                          className="border-light" 
                          onClick={ () => { this.setState({ selectedImg: imageUrl }) } }>
                          <Card.Img src={imageUrl ?? "/static/media/GraidexLogoDarkJPG.1a3333888e257918b9ef.jpg"}
                            alt="Card image" className={
                              imageUrl === this.state.selectedImg 
                              ? "border border-primary border-5 rounded-3"
                              : "border border-light border-5 rounded-3"}/>
                          <Card.ImgOverlay>
                            <Card.Title>
                              <Badge bg={imageUrl === this.state.selectedImg ? "primary" : "info" } size="md" pill>
                                { imageUrl === this.state.selectedImg ? <i className="bi bi-check" style={{ fontSize: "1rem" }}></i> : "" }
                                { imageUrl === this.state.selectedImg && idx === this.state.images.length - 1 ? " " : "" }
                                { idx === this.state.images.length - 1 ? "Current" : "" }
                              </Badge>
                            </Card.Title>
                          </Card.ImgOverlay>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal.bind(this)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.onAddImage.bind(this)}>
              Change image
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    main: state.main,
    auth: state.auth,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    SetOpen,
    updateSubject,
  })(ChangeImageModal)
);
