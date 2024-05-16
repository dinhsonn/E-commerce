import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("menu");
}
function getByParentId(position, parent_id)
{
    return httpAxios.get(`menu/${position}/${parent_id}`);
}
const MenuService = {
    getAll:getAll,
    getByParentId: getByParentId,
}
export default MenuService;