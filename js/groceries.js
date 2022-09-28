let groceries;

const groceriesCreate = function(item_pk) {
  const item = {
    item_pk: item_pk
  };
  axios.post('http://localhost:3100/api/v1/groceries', item);
};

const groceriesRead = function(q, orderByKey, orderByType) {
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
      groceriesDeleteObject.grocery_pk = groceries[index].grocery_pk;
      groceriesUpdateObject.grocery_pk = groceries[index].grocery_pk;
    }
    console.log('Readed', groceries);
  };
  axios.get('http://localhost:3100/api/v1/groceries?q=' + q + '&orderByKey=' + orderByKey + '&orderByType=' + orderByType).then(successFunction);
};

// callback 적용
const groceriesCount = function() {
  const successFunction = function(response) {
    document.getElementById('menu-groceries-counter').innerHTML = response.data.count;
  };
  axios.get('http://localhost:3100/api/v1/groceries/count').then(successFunction);
};

const groceriesDelete = function(grocery_pk, from) {
  const url = 'http://localhost:3100/api/v1/groceries/' + grocery_pk;
  axios.delete(url).then(function() {
    if (from === 'items') return;
    groceriesRead(q, orderByKey, orderByType);
  });
};

const groceriesUpdate = function(grocery_pk) {
  console.log(grocery_pk);
  const url = 'http://localhost:3100/api/v1/groceries/' + grocery_pk;
  const groceryNameObject = document.getElementsByName('grocery-name')[0];
  const groceryEnterObject = document.getElementsByName('grocery-enter')[0];
  const groceryExpireObject = document.getElementsByName('grocery-expire')[0];
  const grocery = {
    name: groceryNameObject.value,
    enter: groceryEnterObject.value,
    expire: groceryExpireObject.value
  };
  
  axios.patch(url, grocery).then(function() {
    // alert창 보이기, 모달창 닫기, groceriesRead 함수 호출
    window.alert('완료');
    modalToggle();
    groceriesRead(q, orderByKey, orderByType);
  });
};

// groceriesRead();
