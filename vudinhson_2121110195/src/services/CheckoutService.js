import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("contact/index");
}
function getById(id)
{
    return httpAxios.get("contact/show/" + id);
}
function order(data)
{
    return httpAxios.post("orders", data);
}
function orderdetail(data)
{
    return httpAxios.post("orderdetails", data);
}
const CheckoutService = {
    getAll:getAll,
    getById:getById,
    order:order,
    orderdetail:orderdetail

}
export default CheckoutService;