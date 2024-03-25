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
      
    // Register methods which can be called from the server:
    // connection.on(ReceiveApplicationTestNotification.name, ReceiveApplicationTestNotification);
    // const ReceiveApplicationTestNotification = (message: string) => {
    //  console.log(message);
    // };
    // 
    // or :
    // connection.on('ReceiveAnotherNotification', () => {
    //   console.log('Another notification received');
    // });

    connection.on("ReceiveNewSubjectRequestNotification", LogRecievedNotification);
    connection.on("ReceiveSubjectRequestAcceptedNotification", LogRecievedNotification);

    connection.on("ReceiveTestOpensNotification", LogRecievedNotification);

    connection.on("ReceiveStudentStartedTestNotification", LogRecievedNotification);
    connection.on("ReceiveStudentSubmittedTestNotification", LogRecievedNotification);
    connection.on("ReceiveTestResultShownToStudentNotification", LogRecievedNotification);
    connection.on("ReceiveTestResultReviewedByTeacherNotification", LogRecievedNotification);
    
    connection.on("ReceiveLoginNotification", LogRecievedNotification);

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

const LogRecievedNotification = (obj: any) => {
  console.log(obj);
};