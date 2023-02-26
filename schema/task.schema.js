const {Entity, Schema} = require("redis-om");

class Task extends Entity {
    toJSON() {
        return {
            id: this.entityId,
            name: this.name,
            complete: this.complete
        }
    }
}

const taskSchema = new Schema(Task, {
    name: {
        type: 'string'
    },
    complete: {
        type: 'boolean'
    }
}, {
    dataStructure: 'JSON'
});

module.exports = taskSchema
