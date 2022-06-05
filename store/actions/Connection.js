export const SET_CONNECTION = "SET_CONNECTION";

export const setConnection = (connectionInfo) => {
  return { type: SET_CONNECTION, connectionInfo: connectionInfo };
};
