import * as SQLite from "expo-sqlite";
import { Place } from "../components/models/place";

const database = SQLite.openDatabase("places.db");

// create sqlite db if it doesn't exist
export const init = () => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "create table if not exists places (id integer primary key not null, title text not null, imageUri text not null, address text not null, lat real not null, lng real not null)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const insertPlace = (place) => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        // use ? as a placeholder for the values
        "insert into places (title, imageUri, address, lat, lng) values (?, ?, ?, ?, ?)",
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log("Sqlite insert result: ", result);
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const fetchDbPlaces = () => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "select * from places",
        [],
        (_, result) => {
          // result format is different from ui data format so reformat here according to our Place modal
          const places = [];
          for (let i = 0; i < result.rows._array.length; i++) {
            places.push(
              // everytime push reformatted Place instance to places array. Every element is reformatted object
              new Place(
                result.rows._array[i].title,
                result.rows._array[i].imageUri,
                {
                  address: result.rows._array[i].address,
                  lat: result.rows._array[i].lat,
                  lng: result.rows._array[i].lng,
                },
                result.rows._array[i].id
              )
            );
          }
          // resolve reformatted places array
          resolve(places);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const fetchPlaceById = (id) => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "select * from places where id = ?",
        [id],
        (_, result) => {
          // result format is different from ui data format so reformat here according to our Place modal
          const place = new Place(
            result.rows._array[0].title,
            result.rows._array[0].imageUri,
            {
              address: result.rows._array[0].address,
              lat: result.rows._array[0].lat,
              lng: result.rows._array[0].lng,
            },
            result.rows._array[0].id
          );
          // resolve reformatted place item
          resolve(place);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};
