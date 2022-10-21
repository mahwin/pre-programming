import axios from "axios";

async function getVoca() {
  return axios.get("http://localhost:3000/vocas/next");
}

export { getVoca };
