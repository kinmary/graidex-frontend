import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { API_BASE_URL } from "../../constants/config";

export const loginToHub = async () => {
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    throw new Error("No token found");
  }

  const connection = new HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/notifications`, { accessTokenFactory: () => authToken })
      .withAutomaticReconnect()
      .build();
      
    // Register methods which can be called from the server, e.g.:
    connection.on(ReceiveApplicationTestNotification.name, ReceiveApplicationTestNotification);
    // or (this one is just example):
    connection.on('ReceiveAnotherNotification', () =>{
      console.log('Another notification received');
    });

    try {
      await connection.start();
      return connection;
    } catch (error) {
      console.log('Error while establishing connection: ' + error);
    }
}

export const logoutFromHub = async (connection: HubConnection) => {
  await connection.stop();
}

const ReceiveApplicationTestNotification = (message: string) => {
  console.log(message);
}