import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("order/index");
}
function getById(id)
{
    return httpAxios.get("order/show/" + id);
}
function create(data)
{
    return httpAxios.post("order/store", data);
}
function update(data, id)
{
    return httpAxios.post("order/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("order/destroy/" + id);
}
const OrderService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove
}
export default OrderService;