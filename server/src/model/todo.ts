import { Schema, model } from 'mongoose';

const TodoSchema = new Schema({
    text: String,
    done: {
        type: Boolean,
        default: false,
    },
});

export default model('todo', TodoSchema);
