
export const getOrderDetails = async(user, auth_token) => {
    if(user !== null){
        const res = fetch(`/api/data.php?order_user=${user}&auth_token=${auth_token}`)
        .then(response => response.json());
        
        return await res;
    }
}

export const getOrder = async(OrderId) => {
    if(typeof(OrderId[0]) !== 'undefined'){
        const res = fetch(`/api/data.php?get_order=${OrderId}`)
        .then(response => response.json());
        
        return await res;
    }
}

export const fetchCurrency = () => {
    const res = fetch(`/api/data.php?currency=all`)
    .then(response => response.json());
    return res;
}

export const fetchBrandDetails = () => {
    const res = fetch('/api/brand_details.php?domain='+window.location.host)
    .then(response => response.json())
    return res;
}