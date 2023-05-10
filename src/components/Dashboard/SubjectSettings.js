import React, { Component, useState, useRef, useMemo } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";
import { SetOpen, SetMessageOpen } from "../MainAction";
import logoDark from "../../images/GraidexLogoDarkJPG.jpg";
import { getStudentsList, updateSubject } from "./SubjectActions";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, } from 'react-leaflet'
//import "../../styles/subjectpage.css"
import L from 'leaflet';
import 'leaflet-control-geocoder';
import { useEffect } from "react";
import LocationMap from "../LocationMap";

const center = {lat: 54.9, lng: 23.9}
var subjectLocation = {lat: 54.9, lng: 23.9};

class SubjectSettings extends Component {
  constructor(props) {
    super(props);
    const selectedSubject = this.props.main.allSubjects.find(
      (obj) =>
        obj.id.toString() === this.props.main.selectedSubjectId.toString()
    );
    this.state = {
      id: selectedSubject.id,
      subjectId: selectedSubject.customId,
      subjectName: selectedSubject.title,
      imageUrl: selectedSubject.imageUrl || logoDark,
      latitude: selectedSubject.latitude,
      longitude: selectedSubject.longitude,
    };
  }

  handleSubjectChange(event){
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDeleteSubject() {
    this.props.SetOpen("deleteSubjectModal", true);
  };

  handleChangeImageClick() {
    this.props.SetOpen("changeImgModal", true);
  };
  handleUpdateSubject() {
    let {id, subjectId, subjectName, imageUrl, latitude, longitude} = this.state;
    this.props.updateSubject(id, subjectId, subjectName, imageUrl, latitude, longitude);
  }

  handleChangeMarkerPosition(markerPosition) {
    this.setState((prevState) => ({
      ...prevState,
      latitude: markerPosition.lat,
      longitude: markerPosition.lng
    }))
  }

  async handleManageStudents(){
    await this.props.getStudentsList(this.state.id);
    this.props.SetOpen("manageStudentsModal", true);
  }


  render() {
    const { selectedSubjectId, tests } = this.props.main;
    const selectedSubject = this.props.main.allSubjects.find(obj => obj.id.toString() === selectedSubjectId.toString());

    return (
      <Container
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginTop: 25,
          height: "100%",
          padding: 0,
        }}
      >
        <Col xs={8}>
          <Form>
            <h3>
              Settings of subject{" "}
              <Button
                variant="danger"
                size="sm"
                style={{ marginLeft: 10 }}
                onClick={this.handleDeleteSubject.bind(this)}
              >
                Delete subject
              </Button>
            </h3>
            <Form.Group style={{ marginTop: 20 }}>
              <Form.Label>Subject name </Form.Label>
              <Form.Control
                type="text"
                name="subjectName"
                placeholder="Subject name"
                style={{ width: "40%" }}
                value={this.state.subjectName}
                onChange={this.handleSubjectChange.bind(this)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: 20 }}>
              <Form.Label>Subject Id </Form.Label>
              <Form.Control
                type="text"
                name="subjectId"
                placeholder="Subject id"
                style={{ width: "40%" }}
                value={this.state.subjectId}
                onChange={this.handleSubjectChange.bind(this)}
              />
            </Form.Group>

            <Form.Group style={{ marginTop: 20 }}>
              <Form.Label>Share link </Form.Label>
              <InputGroup style={{ width: "50%" }}>
                <InputGroup.Text>
                  <i className="bi bi-link"></i>
                </InputGroup.Text>
                <Form.Control readOnly value={"https://example.com/users/"} />
                <InputGroup.Text>
                  <Button size="sm">Copy</Button>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ marginTop: 20 }}>
              <Form.Label>Manage Participants </Form.Label>
              <InputGroup style={{ width: "40%" }}>
                <Button onClick={this.handleManageStudents.bind(this)} >Manage Student List</Button>
              </InputGroup>
            </Form.Group>
            <Form.Group style={{ marginTop: 20 }}>
              <InputGroup style={{ width: "40%" }}>
                <Button variant="success" onClick = {this.handleUpdateSubject.bind(this)}>Save changes</Button>
              </InputGroup> 
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Card id="IF3333_EN" style={{ marginLeft: -40, height: 350 }}>
            <Card.Img variant="top" src={selectedSubject.imageUrl ?? logoDark} style={{height:"80%", objectFit: "cover"}}/>
            <Card.Body>
              <Button
                onClick={this.handleChangeImageClick.bind(this)}
                style={{ width: "100%" }}
              >
                Change image
              </Button>
            </Card.Body>
          </Card>
          <Card style={{height: "500px", marginLeft: -40}}>
            <Card.Header style={{ fontWeight: "bold", textAlign: "center" }}>{"Location"}</Card.Header>
          <div>
        {/* <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeocoderControl />
          <DraggableMarker/>
        </MapContainer> */}
        <LocationMap defaultPosition={{lat: this.state.latitude || 0, lng: this.state.longitude || 0}} positionChanged={this.handleChangeMarkerPosition.bind(this)} />
        </div>
          </Card>
        </Col>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    main: state.main,
  };
}

function GeocoderControl() {
  const map = useMap();
  useEffect(() => {
    L.Control.geocoder({
      geocoder: L.Control.Geocoder.nominatim(),
      defaultMarkGeocode: false
    })
    .on('markgeocode', function(e) {
      var position = e.geocode.center;
      map.flyTo(position);
    })
    .addTo(map);
  }, [])
  return null;
}

function DraggableMarker() {
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          subjectLocation = marker.getLatLng()
          setPosition(subjectLocation)
        }
      },
    }),
    [],
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
        <Popup>
          {subjectLocation.lat.toFixed(4)};
          {subjectLocation.lng.toFixed(4)}
        </Popup>
    </Marker>
  )
}

export default withRouter(
  connect(mapStateToProps, { SetOpen, SetMessageOpen, updateSubject, getStudentsList })(SubjectSettings)
);

