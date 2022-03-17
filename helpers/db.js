import { SQLite } from "expo-sqlite";

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
