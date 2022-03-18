import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("wedding.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Token (token TEXT PRIMARY KEY NOT NULL)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject();
        }
      );
    });
  });
  return promise;
};

export const setToken = (token) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Token (token) VALUES (?)",
        [token],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject();
        }
      );
    });
  });
  return promise;
};

export const getToken = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Token",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject();
        }
      );
    });
  });
  return promise;
};
