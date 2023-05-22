export default function handler(req: any, res: any) {
  res.status(200).json({
    frontEnd: [
      { title: "React", ok: true, amount: "1963", install: "17,000k" },
      { title: "Next", ok: true, amount: "1284", install: "3,400k" },
      { title: "React-redux", ok: true, amount: "583", install: "6,400k" },
      { title: "React-query", ok: true, amount: "408", install: "1,400k" },
      { title: "React-router", ok: true, amount: "849", install: "8,800k" },
      {
        title: "React-hook-form",
        ok: true,
        amount: "532",
        install: "2,600k",
      },
      {
        title: "Styled-components",
        ok: true,
        amount: "423",
        install: "4,700k",
      },
      { title: "Axios", ok: true, amount: "173", install: "35,000k" },
      { title: "Recoil", ok: true, amount: "443", install: "330k" },
      { title: "Tailwindcss", ok: true, amount: "797", install: "4,080k" },
      { title: "Vue", ok: false, amount: "not yet", install: "not yet" },
      { title: "Angular", ok: false, amount: "not yet", install: "not yet" },
    ],
  });
}
