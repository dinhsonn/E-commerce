import httpAxios from "../httpAxios";


function getAll()
{
    return httpAxios.get("topics");
}
function getById(id)
{
    return httpAxios.get("topic/show/" + id);
}
function getTopicBySlug(slug)
{
    return httpAxios.get("topic/show/"+slug);
}
const TopicService = {
    getAll:getAll,
    getById:getById,
    getTopicBySlug:getTopicBySlug
}
export default TopicService;