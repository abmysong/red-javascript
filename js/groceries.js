// const queryString = new URLSearchParams(window.location.search);
// const nameText = queryString.get('input-text');
// const inputTextObjects = document.getElementsByName('input-text');
// const inputTextObject = inputTextObjects[0];

// const inputTextObject = document.getElementsByName('input-text')[0];
// inputTextObject.value = nameText;
// const inputHiddens = queryString.getAll('input-hidden');
// const inputHidden = inputHiddens[0];

// inputTextObject.focus();
// inputTextObject.blur();

let groceries;

const groceriesCreate = function(index, uuid) {
  const grocery = {
    uuid: uuid,
    name: document.getElementsByName('items-name')[index].innerHTML,
    enter: document.getElementsByName('items-enter')[index].innerHTML,
    expire: document.getElementsByName('items-expire')[index].value
  };
  axios.post('http://localhost:3100/api/v1/groceries', grocery);
};

const groceriesRead = function() {
  const successFunction = function(response) {
    groceries = response.data.groceries;
    const tagTbodyParent = document.getElementById('tag-tbody-parent');
    tagTbodyParent.innerHTML = '';
    const tagTrChild = document.getElementById('tag-tr-child');
    for (let index in groceries) {
      const newDivChild = tagTrChild.cloneNode(true);
      tagTbodyParent.appendChild(newDivChild);
      const groceriesNoObject = document.getElementsByName('groceries-no')[index];
      const groceriesNameObject = document.getElementsByName('groceries-name')[index];
      const groceriesEnterObject = document.getElementsByName('groceries-enter')[index];
      const groceriesExpireObject = document.getElementsByName('groceries-expire')[index];
      const groceriesDeleteObject = document.getElementsByName('groceries-delete')[index];
      const groceriesUpdateObject = document.getElementsByName('groceries-update')[index];
      groceriesNoObject.innerHTML = Number(index) + 1;
      groceriesNameObject.innerHTML = groceries[index].name;
      groceriesEnterObject.innerHTML = groceries[index].enter;
      groceriesExpireObject.innerHTML = groceries[index].expire;
      groceriesDeleteObject.uuid = groceries[index].uuid;
      groceriesUpdateObject.uuid = groceries[index].uuid;
    }
    console.log('Readed', groceries);
  };
  axios.get('http://localhost:3100/api/v1/groceries').then(successFunction);
};

const groceriesDelete = function(uuid, from) {
  const url = 'http://localhost:3100/api/v1/groceries/' + uuid;
  axios.delete(url).then(function() {
    if (from === 'items') return;
    groceriesRead();
  });
};

const groceriesUpdate = function(uuid) {
  console.log(uuid);
  const url = 'http://localhost:3100/api/v1/groceries/' + uuid;
  const groceryNameObject = document.getElementsByName('grocery-name')[0];
  const groceryEnterObject = document.getElementsByName('grocery-enter')[0];
  const groceryExpireObject = document.getElementsByName('grocery-expire')[0];
  const grocery = {
    name: groceryNameObject.value,
    enter: groceryEnterObject.value,
    expire: groceryExpireObject.value
  };
  axios.patch(url, grocery).then(groceriesRead);
};

// groceriesRead();
