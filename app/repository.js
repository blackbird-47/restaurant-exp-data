import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('restaurant_menu');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.withTransactionAsync((tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, title text, price text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.withTransactionAsync((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.withTransactionAsync((tx) => {
    const values = menuItems.map(item => `('${item.id}', '${item.title}', '${item.price}', '${item.category}')`).join(',');
    tx.executeSql(
      `insert into menuitems (id, title, price, category) values ${values}`
    )}
  );
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    const categoriesPlaceholder = activeCategories.map(() => '?').join(',');
    db.withTransactionAsync((tx) => {
      tx.executeSql(
        `select * from menuitems where title like ?`,
        [query],
        (_, { rows }) => {
        resolve(rows._array);
        }
      );
      },
      reject
    );
  });
}
