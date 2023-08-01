const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    await client.connect();
    const serviceCollection = client.db("heal_scape").collection("services");

    // TODO: get services from database
    app.get("/services", async (req, res) => {
      const services = await serviceCollection.find({}).toArray();
      console.log(services);
      res.send(services);
    });


    // TODO: add product in database
    app.post("/add-service", async (req, res) => {
      try {
        // data collect from body
        const data = req.body;

        //* Check if data exists in the request body
        if (Object.keys(data).length === 0) {
          return res.send({
            status: false,
            error: "Data not found in request body.",
          });
        }
        const result = await serviceCollection.insertOne(data);
        res.send({
          status: true,
          result: result,
          reslut2: "data insert successfully",
        });
      } 
      catch (error) {
        res.send({ status: false, error });
      }
    });


    // TODO: update service in the database
    
    app.put("/update-service/:id", async (req, res) => {
      try {
        //* Which id need to update/change
        const id = req.params;
        console.log(id);

        //* which data need to update/change
        const data = req.body;

        //* filter / query for updating which id
        const filter = { _id: new ObjectId(id) };
        console.log(filter);
        const updateDoc = { $set: data };
        const option = { upsert: true };

        const result = await serviceCollection.updateOne(
          filter,
          updateDoc,
          option
        );
        res.send({
          status: true,
          result: result,
        });
      } 
      catch (error) {
        res.send({
          status: false,
          error: "data is not updated",
        });
      }
    });


    // TODO: delete service from database
    app.delete("/delete-service/:id", async (req, res) => {
      
      try {
        // Which id need to delete
        const id = req.params;
        console.log(id);

        // need find/ filter/query for which data need to delete
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const result = await serviceCollection.deleteOne(filter, option);

        res.send({
          status: true,
          result: { "data delete successfuly": result },
        });
      } catch (error) {
        res.send({
          status: false,
          error: "id not found",
        });
      }
    });
    
    // TODO: Delete all services from service Collection
    app.delete("/remove-all-services", async (req, res) => {
      try {
        const result = await serviceCollection.deleteMany({});
        res.send({
          status: true,
          result: result,
          message: "All data removed from serviceCollection",
        });
      } catch (error) {
        res.send({
          status: false,
          error: "Failed to remove all data",
        });
      }
    });
  } finally {
  }
}
run().catch(console.dir);


// TODO: ------------body--------->
app.get("/dummy-user/body/user", async (req, res) => {
  const data = req.body;
  res.send(data);
});
// END-----------params--------------->


// TODO: ------------query--------->
app.get("/dummy-user/query/user", async (req, res) => {
  const { id, name } = req.query;
  console.log(id);
  console.log(name);
  res.json({ id, name });
});
// END-----------params--------------->


// TODO: ------------params--------->
app.get("/dummy-user/params/:id", async (req, res) => {
  const { id } = req.params;
  res.json(id);
});
// END-----------params--------------->


// TODO: CONTACT DETAILS:------------->
const users = [
  { id: 1, name: "muyed" },
  { id: 2, name: "muyed 2" },
  { id: 3, name: "muyed 3" },
  { id: 4, name: "muyed 4" },
];

app.get("/users", async (req, res) => {
  res.send(users);
});

app.post("/users", async (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  console.log(user);
  res.send(user);
});
//<-----END------CONTACT DETAILS:------------->


app.get("/", async (req, res) => {
  res.send(`hello from localhost: ${port}`);
});


// 3av2f3B6GP92fRhK
app.listen(port, () => {
  console.log(`port is running on: ${port}`);
});
