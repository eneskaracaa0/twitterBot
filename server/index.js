const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("monk")(process.env.MONGO_CONNECT);
const tweetscollection = db.get("tweets");

app.use(express.json());
app.use(cors());

app.post("/tweets", (req, res) => {

  const tweet = {
    name: req.body.name.toString(),
    content: req.body.content.toString(),
    created: new Date(),
  };

  tweetscollection
    .insert(tweet)
    .then((createdTwit) => {
      res.json(createdTwit);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Tweet eklenirken bir hata oluştu" });
    });
});

app.get("/", (req, res) => {
  res.json({
    MESSAGE: "SELAMLAR",
  });
});

app.get('/tweets',(req,res)=>{
  tweetscollection.find()
  .then(twits=>{
    res.json(twits);
  });
  
})

const port = process.env.PORT || 3000; // .env'de PORT tanımlanmamışsa varsayılan olarak 3000 portunu kullan
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor`);
});
