import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("categories");
}


function getCategoryBySlug(slug)
{
    return httpAxios.get("category/show/"+slug);
}
const CategoryService = {
    getAll:getAll,
    getCategoryBySlug:getCategoryBySlug
}
export default CategoryService;