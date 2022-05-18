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

let groceries;

const groceriesCreate = function(form) {
  const groceryNameObject = form['name'];
  const grocery = {
    name: groceryNameObject.value,
    enter: moment().format('YYYY-MM-DD'),
    expire: moment().add(14, 'days').format('YYYY-MM-DD')
  };
  axios.post('http://localhost:3100/api/v1/groceries', grocery).then(function() {
    groceryNameObject.value = '';
    groceriesRead();
  });
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
      const groceriesNameObject = document.getElementsByName('groceries-name')[index];
      const groceriesEnterObject = document.getElementsByName('groceries-enter')[index];
      const groceriesExpireObject = document.getElementsByName('groceries-expire')[index];
      const groceriesDeleteObject = document.getElementsByName('groceries-delete')[index];
      groceriesNameObject.innerHTML = groceries[index].name;
      groceriesEnterObject.innerHTML = groceries[index].enter;
      groceriesExpireObject.value = groceries[index].expire;
      groceriesExpireObject.index = index;
      groceriesDeleteObject.index = index;
    }
    console.log('Readed', groceries);
  };
  axios.get('http://localhost:3100/api/v1/groceries').then(successFunction);
};

const groceriesDelete = function(index) {
  const url = 'http://localhost:3100/api/v1/groceries/' + index;
  axios.delete(url).then(groceriesRead);
};

const groceriesUpdate = function(index) {
  const url = 'http://localhost:3100/api/v1/groceries/' + index;
  const expire = document.getElementsByName('groceries-expire')[index].value;
  const grocery = {
    expire: expire
  };
  axios.patch(url, grocery).then(groceriesRead);
};

groceriesRead();
