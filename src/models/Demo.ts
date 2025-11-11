import { model, models, Schema } from "mongoose";

interface IDemo {
  name: string;
}

const demoSchema = new Schema({
  name: { type: String, required: true },
});

const demo = models?.Demo || model<IDemo>("Demo", demoSchema);

export default demo;
