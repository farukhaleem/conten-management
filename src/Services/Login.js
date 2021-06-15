const axios = require('axios').default;

export const logIn = (username, password) => {
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const res = axios.post('/area/api/login.php', formData)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
     
    return res;
}