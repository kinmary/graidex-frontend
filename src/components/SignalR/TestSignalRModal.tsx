import { HubConnection } from "@microsoft/signalr";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { loginToHub, logoutFromHub } from "./GraidexHubConnection";
import { clear } from "console";

const TestSignalRModal = ({ showModal, setShowModal }: { showModal: boolean, setShowModal: any }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const handleLogin = () => {
    loginToHub().then((conn) => {
      setConnection(conn);
    });
  };

  const handleLogout = () => {
    if (connection) {
      logoutFromHub(connection);
      setConnection(null);
    }
  };

  // Example method to be called from the client
  const CallMethodOnServer = () => {
    connection?.invoke('CallMethodOnServer');
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>SignalR test</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{minHeight: "300px"}}>
        <Row>
          <Col className="d-flex flex-column gap-1 border-end">
            <h6 className="mb-0">Connection state</h6>
            <p className="mb-2">{connection?.state ?? 'Logged out'}</p>
            <h6 className="mb-0">Hub actions</h6>
            <Button disabled={connection !== null} variant="success" size="sm" onClick={handleLogin}>
              Login
            </Button>
            <Button disabled={connection?.state !== "Connected"} variant="danger" size="sm" onClick={handleLogout}>
              Logout
            </Button>

            <h6 className="mt-2 mb-0">Data actions</h6>
            <Button variant="outline-danger" size="sm">
              Clear invocations
            </Button>
            <Button variant="outline-danger" size="sm">
              Clear notifications
            </Button>

            <h6 className="mt-2 mb-0">Tests</h6>
            <Button size="sm" onClick={CallMethodOnServer} disabled={connection?.state !== "Connected"}>
              Call method on the server
            </Button>
          </Col>
          <Col className="border-end">
            <h6 className="mb-0">Invocations</h6>
            {/* {invocations.map((invocation, index) => (
              <p className="mb-0" key={index}>{invocation}</p>
            ))} */}
          </Col>
          <Col>
            <h6 className="mb-0">Notifications</h6>
            {/* {notifications.map((notification, index) => (
              <p className="mb-0" key={index}>{notification}</p>
            ))} */}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  );
}

export default TestSignalRModal;