import { api } from "@api/index";

async function getVocabulary() {
  try {
    const response = await api.get(`/vocas/all`);
    return response;
  } catch (error: any) {
    new Error(error.message);
  }
}

// async function getCategorizedVocabulary() {
//   try {
//     const response = await api.get(`/vocas/all`);
//     return response;
//   } catch (error: any) {
//     new Error(error.message);
//   }
// }
// getCategorizedVocabulary
export { getVocabulary };
