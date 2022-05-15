const URL = "http://127.0.0.1:8000/api/"

const GET = (url = "/",params: any = "") => URL + url + "?" + new URLSearchParams(params).toString();
declare const $: any;

export default {
  URL,
  GET
}
