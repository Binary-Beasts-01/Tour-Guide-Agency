function create(table, values) {
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

async function retrieve(table, id) {
  const result = async () => {
    const c = await retrieveResult(table, id);
    console.log('object', c);
    return c;
  };

  return result();
}

async function retrieveAll(table) {
  const result = async () => {
    const c = await db[table].toArray();
    return c;
  };

  return result();
}

function retrieveResult(table, id) {
  return db[table].get({ id }).then((r) => {
    if (r) {
      // console.log(r);
      return r;
    } else {
      console.log('failure');
    }
  });
}

function update(table, object) {
  db[table].update(object.id, object.value).then(function (updated) {
    if (updated) {
      console.log('Entry update successfully');
    } else {
      console.log("Can't find tour with this id");
    }
  });
}

function deleteEntry(table, id) {
  db[table].delete(id).then(function (deleteCount) {
    console.log('Dleted' + deleteCount + ' objects');
  });
}

// class DbHelper{
//   constructor(){

//   }

// }
