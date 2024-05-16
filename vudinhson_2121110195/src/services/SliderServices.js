import httpAxios from "../httpAxios";

function getAll() {
    return httpAxios.get("sliders"); // Updated URL
}


function getByPosition(position) {
    // return httpAxios.get(`sliders/image/${position}`); // Updated URL
}


const SliderService = {
    getByPosition: getByPosition,
    getAll: getAll,
  
};

export default SliderService;
