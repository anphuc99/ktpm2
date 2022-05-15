const URL = "https://fashion.api.devmini.com/api/"

const GET = (url = "/",params: any = "") => URL + url + "?" + new URLSearchParams(params).toString();
declare const $: any;

export default {
  URL,
  GET
}
