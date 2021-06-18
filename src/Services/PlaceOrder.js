const axios = require('axios').default;

export const submitFormData = (formData) => {

    const res = axios.post('/api/place_order.php', formData)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });  
    return res;
}
