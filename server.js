const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

// TODO: CORS
app.use(cors());

// TODO: Middleware 
app.use(express.json());

const uri =
  "mongodb+srv://heal_scape:3av2f3B6GP92fRhK@cluster0.b1d0rx9.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const serviceCollection = client.db("heal_scape").collection("services");

    app.get("/services", async(req,res)=>{
      const services = await serviceCollection.find({}).toArray();
      console.log(services)
      res.send(services)
    })

  } finally {
  }
}
run().catch(console.dir);



// TODO: CONTACT DETAILS:
const users = [
  {id:1 , name :"muyed"},
  {id:2 , name :"muyed 2"},
  {id:3 , name :"muyed 3"}
]

app.get("/users", async (req, res) => {
  res.send(users);
});

app.post("/users", async(req,res) => {
  const user= req.body
   user.id = users.length + 1;
  users.push(user)
 console.log(user)
 res.send(user)
})



app.get("/", async (req, res) => {
  res.send("hello request from user");
});


// 3av2f3B6GP92fRhK
app.listen(port, () => {
  console.log(`port is running on: ${port}`);
});
