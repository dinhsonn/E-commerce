import httpAxios from "../httpAxios";

export function GET_IMG(endpoint, imgName) {
    return httpAxios.get(`/${endpoint}/image/${imgName}`);
  }

const ImageService = {
    GET_IMG:GET_IMG
};
export default ImageService;