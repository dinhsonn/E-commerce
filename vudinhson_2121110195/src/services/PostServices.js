import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("posts");
}
function getById(id)
{
    return httpAxios.get(`posts/${id}`);
}
function create(data)
{
    return httpAxios.post("post/store", data);
}
function update(data, id)
{
    return httpAxios.post("post/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("post/destroy/" + id);
}
function getByType(limit, type)
{
    return httpAxios.get(`post_list/${limit}/${type}`);
}
function getPostAll(limit, page=1)
{
    return httpAxios.get(`post_all/${limit}/${page}`);
}
function getPostByTopicId(limit, topic_id) 
{
    return httpAxios.get(`/topic/${topic_id}`, { params: { limit } });
}
function getPostNew()
{
    return httpAxios.get("post_new");
}
const PostService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getByType:getByType,
    getPostAll:getPostAll,
    getPostByTopicId:getPostByTopicId,
    getPostNew:getPostNew,
}
export default PostService;