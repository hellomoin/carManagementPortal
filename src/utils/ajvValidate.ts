import Ajv, { JSONSchemaType } from 'ajv';
import { Car } from '@interfaces/cars.interface';

const ajv = new Ajv();

const schema: JSONSchemaType<Car> = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    make: { type: 'string' },
    model: { type: 'string' },
    color: { type: 'string' },
    fuelType: { type: 'string' },
    price: { type: 'number' },
  },
  required: ['make', 'model', 'color', 'fuelType', 'price'],
  additionalProperties: false,
};

export const ajvValidate = ajv.compile(schema);
