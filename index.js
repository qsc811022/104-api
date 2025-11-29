import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/jobs", async (req, res) => {
  const keyword = req.query.keyword || "";
  const url =
    "https://www.104.com.tw/jobs/search/list?keyword=" +
    encodeURIComponent(keyword);

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json"
      }
    });

    const list = response.data.data.list;

    const result = list.map((job) => ({
      name: job.jobName,
      company: job.custName,
      link: "https://www.104.com.tw/job/" + job.jobNo,
    }));

    res.json(result);
  } catch (err) {
    console.error("104 抓取失敗:", err.message);
    res.status(500).json({ error: "抓取失敗" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
