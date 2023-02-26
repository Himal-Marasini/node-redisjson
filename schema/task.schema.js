const { Entity, Schema } = require("redis-om");
const client = require("../redis");

class Task extends Entity {
  toJSON() {
    return {
      id: this.entityId,
      name: this.name,
      complete: this.complete,
    };
  }
}

const taskSchema = new Schema(
  Task,
  {
    name: {
      type: "string",
    },
    complete: {
      type: "boolean",
    },
  },
  {
    dataStructure: "JSON",
  }
);

const taskRepository = client.fetchRepository(taskSchema);

(async () => {
  await taskRepository.dropIndex();
  await taskRepository.createIndex();
})();

module.exports = taskRepository;
