// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { news } = require("./data.json");

export default (req, res) => {
  if (req.method === "GET") {
    res.status(200).json(news);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
