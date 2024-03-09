import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { API_BASE_URL } from "../../constants/config";

export const loginToHub = async () => {
  const connection = new HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/hub`)
      .withAutomaticReconnect()
      .build();

    // Register methods which can be called from the server
    connection.on(NotifyAboutTestStart.name, NotifyAboutTestStart);
    connection.on('NotifyAboutTestSubmittion', NotifyAboutTestSubmittion);

    await connection.start();
    connection.invoke('Login', "token string");

    return connection;
}

export const logoutFromHub = async (connection: HubConnection) => {
  await connection.invoke('Logout');
  await connection.stop();
}

// Example methods to be called from the server
function NotifyAboutTestStart(){
  console.log('Test started');
}
function NotifyAboutTestSubmittion(){
  console.log('Test submited');
}