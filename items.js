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
      itemsNameObject.innerHTML = items[index].name;
      itemsEnterObject.innerHTML = items[index].enter;
      itemsExpireObject.value = items[index].expire;
      // itemsUpdateObject.index = index;
      // itemsDeleteObject.index = index;
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
  const name = document.getElementsByName('items-name')[index].value;
  const age = document.getElementsByName('items-age')[index].value;
  const item = {
    name: name,
    age: age
  };
  axios.patch(url, item).then(itemsRead);
};

itemsRead();
