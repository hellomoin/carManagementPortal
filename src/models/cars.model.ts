import { model, Schema, Document } from 'mongoose';

import { Car } from '@interfaces/cars.interface';

const carSchema: Schema = new Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const carModel = model<Car & Document>('Car', carSchema);

export default carModel;
