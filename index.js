const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

const taskRepository = require("./schema/task.schema");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/tasks", async (req, res) => {
  const task = await taskRepository.search().returnAll();
  res.send(task);
});

app.post("/tasks", async (req, res) => {
  const task = taskRepository.createEntity();

  task.name = req.body.name;
  task.complete = false;
  task.id = await taskRepository.save(task);

  res.send(task);
});

app.put("/tasks/:id", async (req, res) => {
  const task = await taskRepository.fetch(req.params.id);

  task.complete = req.body.complete;
  await taskRepository.save(task);

  res.send(task);
});

app.delete("/tasks/:id", async (req, res) => {
  await taskRepository.remove(req.params.id);

  res.send(null);
});

app.listen(8000, () => {
  console.log("App is running at port 8000 !!");
});
