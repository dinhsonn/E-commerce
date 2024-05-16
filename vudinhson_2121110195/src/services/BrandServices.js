import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("brand");
}
function getImg(endpoint,imageName)
{
    return httpAxios.get(`${endpoint}/image/${imageName}`)
}
const BrandService = {
    getAll:getAll,
    getImg:getImg

}
export default BrandService;