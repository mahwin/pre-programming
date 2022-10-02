export default function handler(req: any, res: any) {
  res.status(200).json({
    data: {
      "front-End": [
        "HTML",
        "CSS",
        "Java script",
        "React",
        "Vue.js",
        "Angular",
        "Svelte",
        "Preact",
      ],
      "back-End": [
        "Java script",
        "Express",
        "Gatsby",
        "Nuxt",
        "Nest",
        "Strapi",
        "Fastify",
        "SvelteKit",
      ],
    },
  });
}
