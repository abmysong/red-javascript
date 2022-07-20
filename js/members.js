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
  debugger;
  axios.get('http://localhost:3100/api/v1/members/login').then(function(response) {
    console.log(response.data.decoded);
  });
};