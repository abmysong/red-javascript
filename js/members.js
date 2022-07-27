const axiosDefaultsHeaders = function(token) {
  if (token) {
    localStorage.setItem('x-jwt-token', token);
    axios.defaults.headers.common['x-jwt-token'] = token;
  } else if (localStorage.getItem('x-jwt-token')) {
    axios.defaults.headers.common['x-jwt-token'] = localStorage.getItem('x-jwt-token');
  }
};
axiosDefaultsHeaders();

const membersLogin = function(form) {
  const memberNameObject = form['name'];
  const memberAgeObject = form['age'];
  const member = {
    name: memberNameObject.value,
    age: memberAgeObject.value
  };
  axios.post('http://localhost:3100/api/v1/members/login', member).then(function(response) {
    axiosDefaultsHeaders(response.data.token);
    window.location.href = '/';
  });
};

const membersCheck = function() {
  const loginButton = document.getElementById('loginButton');
  const loginName = document.getElementById('loginName');
  const logoutButton = document.getElementById('logoutButton');
  axios.get('http://localhost:3100/api/v1/members/login').then(function(response) {
    console.log(response.data.decoded);
    loginButton.style.display = 'none';
    loginName.style.display = 'block';
    loginName.innerHTML = 'Hello ' + response.data.decoded.name + '!';
    logoutButton.style.display = 'block';
  }).catch(function() {
    loginButton.style.display = 'block';
    loginName.style.display = 'none';
    logoutButton.style.display = 'none';
  });
};

const membersLogout = function() {
  axios.defaults.headers.common['x-jwt-token'] = null;
  localStorage.removeItem('x-jwt-token');
  window.location.href = '/login.html';
};
