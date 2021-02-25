import {db} from '../database.js';

export function create(table, values) {
  db.transaction('rw', db[table], function () {
    db[table]
      .add(values)
      .catch((e) => {
        console.log('Error adding');
      })
      .then((r) => {
        if (r) console.log('Tour destination added Success!');
      });
  })
    .then(() => {
      console.log('Transaction complete');
    })
    .catch(() => {
      console.log('Transaction fail');
    });
}

export async function retrieve(table, id) {
  const result = async () => {
    const c = await retrieveResult(table, id);
    return c;
  };

  return result();
}

export async function retrieveAll(table) {
  const result = async () => {
    const c = await db[table].toArray();
    return c;
  };

  return result();
}

export function retrieveResult(table, id) {
  return db[table].get({ id }).then((r) => {
    if (r) {
      // console.log(r);
      return r;
    } else {
      console.log('failure');
    }
  });
}

export function update(table, object) {
  db[table].update(object.id, object.value).then(function (updated) {
    if (updated) {
      console.log('Entry update successfully');
    } else {
      console.log("Can't find tour with this id");
    }
  });
}

export function deleteEntry(table, id) {
  db[table].delete(id).then(function (deleteCount) {
    console.log('Dleted' + deleteCount + ' objects');
  });
}

// class DbHelper{
//   constructor(){

//   }

// }