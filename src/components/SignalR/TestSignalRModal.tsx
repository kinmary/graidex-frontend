import { HubConnection } from "@microsoft/signalr";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { loginToHub, logoutFromHub } from "./NotificationsHub";
import { clear } from "console";

const TestSignalRModal = ({ showModal, setShowModal }: { showModal: boolean, setShowModal: any }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const handleLogin = () => {
    loginToHub().then((conn) => {
      setConnection(conn ?? null);
    });
  };

  const handleLogout = () => {
    if (connection) {
      logoutFromHub(connection);
      setConnection(null);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>SignalR test</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-1">
        <h6 className="mb-0">Connection state</h6>
        <p className="mb-2 font-monospace">{connection?.state ?? 'Logged out'}</p>
        <h6 className="mb-1">Hub actions</h6>
        <Button disabled={connection !== null} variant="primary" size="sm" onClick={handleLogin}>
          Login
        </Button>
        <Button disabled={connection?.state !== "Connected"} variant="danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <span className="text-center flex-fill">Open console to see notifications</span>
      </Modal.Footer>
    </Modal>
  );
}

export default TestSignalRModal;