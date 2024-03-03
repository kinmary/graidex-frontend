import React, { Component, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
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
import { ErrorResponse, PhotosWithTotalResults, createClient } from 'pexels';
import { PEXEL_CLIENT_ID } from "../../constants/config";
import { updateSubject } from "../Dashboard/SubjectActions";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const ChangeImageModal = () => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const getCurrentImage = () =>{
    let currentImage = main.allSubjects
      .find((obj:any) => obj.id.toString() === main.selectedSubjectId.toString())
      .imageUrl;

    return currentImage;
  }

  const addDefaultImages = (images: any) =>{
    let currentImage = getCurrentImage();

    if (currentImage !== null) {
      images = images.filter((imageUrl: string) => imageUrl !== currentImage);
      images.push(null);
      images.push(currentImage);
    }
    else{
      images.push(null);
    }

    return images;
  }
  
  const [state, setState] = useState({selectedImg: getCurrentImage(),
    search: "",
    images: addDefaultImages([])})
  
  const closeModal = () =>{
    setState({
      selectedImg: getCurrentImage(),
      search: "",
      images: addDefaultImages([]),
    });
    
    dispatch(SetOpen("changeImgModal", false));
  }
  const onAddImage = (event: any) => {
    event.preventDefault();

    let currentSubject = main.allSubjects
      .find((obj:any) => obj.id.toString() === main.selectedSubjectId.toString());
    
    dispatch(updateSubject(
      currentSubject.id,
      currentSubject.customId,
      currentSubject.title,
      state.selectedImg));

    let data = [];
    data.push(null);
    if (state.selectedImg !== null) {
      data.push(state.selectedImg);
    }

    setState({
      ...state,
      search: "",
      images: data,
    });

    dispatch(SetOpen("changeImgModal", false));
  }

  

  const handleSearch = async (event: any) => {
    if (event.key && event.key !== "Enter"){
      return;
    }
    
    event.preventDefault();

    setState({...state, 
      selectedImg: getCurrentImage()
    });

    const query = state.search;
    if (!query.trim()) {
      let images = addDefaultImages([]);
      setState({...state,
        images: images,
      });
      return;
    }

    let apiData: any= [];

    const client = createClient(PEXEL_CLIENT_ID);
    await client.photos.search({ query, per_page: 8 }).then((response) => {
      if ('photos' in response) {
        response.photos.map(photo => { 
          apiData.push(photo.src.medium);
          return null; 
        });
      }
    });
    

    let images = addDefaultImages(apiData);
    setState({...state, images: images});
  }

  const handleInputChange = (event: any, data: any) =>{
    //check if event.target.value is right in console => source
    setState({...state, selectedImg: event.target.value });
  }
    const { changeImgModal } = main;

    return (
      <>
        <Modal
          size="lg"
          show={changeImgModal}
          onHide={closeModal}
          centered
        >
          <Modal.Header closeButton>Choose new image</Modal.Header>
          <Modal.Body>
            <InputGroup>
              <InputGroup.Text id="pexel-logo">
                <a href="https://www.pexels.com" target="_blank" rel="noreferrer">
                  <img src="https://images.pexels.com/lib/api/pexels.png" alt="" style={{height: "1.5rem"}} />
                </a>
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search"
                autoComplete="off"
                aria-label="Search"
                onChange={(event) => {setState({...state, search: event.target.value})}}
                value={state.search}
                onKeyDown={handleSearch}
                />
              <InputGroup.Text
                id="image-search"
                aria-label="Search"
                onClick = {handleSearch}
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
                    {state.images.map((imageUrl: string, idx: number) => (
                      <Col key={idx} >
                        <Card 
                          className="border-light" 
                          style={{height: 250}}
                          onClick={ () => { setState({...state, selectedImg: imageUrl }) } }>
                          <Card.Img src={imageUrl ?? "/static/media/GraidexLogoDarkJPG.1a3333888e257918b9ef.jpg"}
                          style={{height:"100%", objectFit: 'cover'}}
                            alt="Card image" className={
                              imageUrl === state.selectedImg 
                              ? "border border-primary border-5 rounded-3"
                              : "border border-light border-5 rounded-3"}/>
                          <Card.ImgOverlay>
                            <Card.Title>
                              <Badge bg={imageUrl === state.selectedImg ? "primary" : "info" } 
                              //size="md" 
                              pill>
                                { imageUrl === state.selectedImg ? <i className="bi bi-check" style={{ fontSize: "1rem" }}></i> : "" }
                                { imageUrl === state.selectedImg && idx === state.images.length - 1 ? " " : "" }
                                { idx === state.images.length - 1 ? "Current" : "" }
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
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onAddImage}>
              Change image
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default ChangeImageModal;
