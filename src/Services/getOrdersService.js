
export const getOrderDetails = async(user, auth_token) => {
    const res = fetch(`/area/api/data.php?order_user=${user}&auth_token=${auth_token}`)
    .then(response => response.json());
    
    return await res;
}

export const getOrder = async(OrderId) => {
    const res = fetch(`/area/api/data.php?get_order=${OrderId}`)
    .then(response => response.json());
    
    return await res;
}

export const fetchCurrency = () => {
    const res = fetch(`/area/api/data.php?currency=all`)
    .then(response => response.json());
    return res;
}