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
    itemsRead(orderByKey, orderByType);
  });
};

const itemsRead = function(orderByKey, orderByType) {
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
      itemsCheckObject.index = index;
      // backend에서 checked = true를 받으면 check 하기
      itemsCheckObject.checked = items[index].checked;
      itemsDeleteObject.item_pk = items[index].item_pk;
      itemsExpireObject.item_pk = items[index].item_pk;
    }
    console.log('Readed', items);
  };
  axios.get('http://localhost:3100/api/v1/items?orderByKey=' + orderByKey + '&orderByType=' + orderByType).then(successFunction);
};

const itemsDelete = function(item_pk) {
  const url = 'http://localhost:3100/api/v1/items/' + item_pk;
  axios.delete(url).then(function() {
    itemsRead(orderByKey, orderByType);
  });
};

const itemsUpdate = function(index, item_pk) {
  const url = 'http://localhost:3100/api/v1/items/' + item_pk;
  const expire = document.getElementsByName('items-expire')[index].value;
  const item = {
    expire: expire
  };
  axios.patch(url, item).then(function() {
    itemsRead(orderByKey, orderByType);
  });
};

const itemsCheck = function(event, index) {
  console.log(event, index, items);
  const item_pk = items[index].item_pk;
  
  if (event.target.checked) {
    groceriesCreate(item_pk);
  } else {
    groceriesDelete(item_pk, 'items');
  }
};

// itemsRead();
// HTML에서 itemsRead 호출 중복 통신
