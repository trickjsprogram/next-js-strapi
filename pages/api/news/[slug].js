const { news } = require("./data.json");

export default (req, res) => {
  const newsArticle = news.filter((item) => item.slug === req.query.slug);
  if (req.method === "GET") {
    res.status(200).json(newsArticle);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
