import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CarsController } from '@controllers/cars.controller';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Cars', () => {
  describe('[GET] /cars/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const carId = 'qpwoeiruty';

      const carsController = new CarsController();
      const cars = carsController.carService.cars;

      cars.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        make: 'Maker1',
        model: 'Model1',
        color: 'White',
        fuelType: 'Benzin',
        price: 100000,
      });

      (mongoose as any).connect = jest.fn();

      const app = new App([CarsController]);
      return request(app.getServer()).get(`/cars/${carId}`).expect(200);
    });
  });
});
