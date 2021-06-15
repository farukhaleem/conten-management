const axios = require('axios').default;

export const ResetPass = (newPass, resPass) => {
    console.log(newPass, resPass);
    const formData = new FormData();
    formData.append('newPass', newPass);
    formData.append('resPass', resPass);
    formData.append('user_id', localStorage.getItem('id'));

    const res = axios.post('/area/api/reset.php', formData)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
     
    return res;
}