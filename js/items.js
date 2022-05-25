const queryString = new URLSearchParams(window.location.search);
const nameText = queryString.get('input-text');
// const inputTextObjects = document.getElementsByName('input-text');
// const inputTextObject = inputTextObjects[0];

// const inputTextObject = document.getElementsByName('input-text')[0];
// inputTextObject.value = nameText;
// const inputHiddens = queryString.getAll('input-hidden');
// const inputHidden = inputHiddens[0];

// inputTextObject.focus();
// inputTextObject.blur();

let items;

const itemsCreate = function(form) {
  const itemNameObject = form['name'];
  const item = {
    uuid: uuidv4(),
    name: itemNameObject.value,
    enter: moment().format('YYYY-MM-DD'),
    expire: moment().add(14, 'days').format('YYYY-MM-DD')
  };
  axios.post('http://localhost:3100/api/v1/items', item).then(function() {
    itemNameObject.value = '';
    itemsRead();
  });
};

const itemsRead = function() {
  const successFunction = function(response) {
    items = response.data.items;
    const tagTbodyParent = document.getElementById('tag-tbody-parent');
    tagTbodyParent.innerHTML = '';
    const tagTrChild = document.getElementById('tag-tr-child');
    for (let index in items) {
      const newDivChild = tagTrChild.cloneNode(true);
      tagTbodyParent.appendChild(newDivChild);
      const itemsNameObject = document.getElementsByName('items-name')[index];
      const itemsEnterObject = document.getElementsByName('items-enter')[index];
      const itemsExpireObject = document.getElementsByName('items-expire')[index];
      const itemsDeleteObject = document.getElementsByName('items-delete')[index];
      const itemsCheckObject = document.getElementsByName('items-check')[index];
      itemsNameObject.innerHTML = items[index].name;
      itemsEnterObject.innerHTML = items[index].enter;
      itemsExpireObject.value = items[index].expire;
      itemsExpireObject.index = index;
      itemsDeleteObject.index = index;
      itemsCheckObject.index = index;
    }
    console.log('Readed', items);
  };
  axios.get('http://localhost:3100/api/v1/items').then(successFunction);
};

const itemsDelete = function(index) {
  const url = 'http://localhost:3100/api/v1/items/' + index;
  axios.delete(url).then(itemsRead);
};

const itemsUpdate = function(index) {
  const url = 'http://localhost:3100/api/v1/items/' + index;
  const expire = document.getElementsByName('items-expire')[index].value;
  const item = {
    expire: expire
  };
  axios.patch(url, item).then(itemsRead);
};

const itemsCheck = function(event, index) {
  console.log(event, index, items);
  const uuid = items[index].uuid;
  groceriesDelete(uuid);

  // if (event.target.checked) {
  //   groceriesCreate(index);
  // } else {
  //   groceriesDelete(index);
  // }
};

itemsRead();
