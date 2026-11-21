
import { UrlRespository } from "./url.repository.js";
import { UrlService } from "./url.service.js";

const urlRepository = new UrlRespository();
const urlService = new UrlService(urlRepository);

export { urlService };