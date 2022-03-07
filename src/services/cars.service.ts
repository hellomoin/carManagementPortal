import { CreateCarDto, UpdateCarDto } from '@dtos/cars.dto';
import { HttpException } from '@exceptions/HttpException';
import { Car } from '@interfaces/cars.interface';
import carModel from '@models/cars.model';
import { isEmpty } from '@utils/util';
import { ajvValidate } from '@utils/ajvValidate';

class CarService {
  public cars = carModel;

  public async findAllCars(): Promise<Car[]> {
    const cars: Car[] = await this.cars.find().select('_id make model');

    return JSON.parse(JSON.stringify(cars));
  }

  public async findCarById(carId: string): Promise<Car> {
    if (isEmpty(carId)) throw new HttpException(400, 'carId is empty');

    const car: Car = (await this.cars.findOne({ _id: carId })) as Car;
    if (!car) throw new HttpException(409, 'car not found');

    return JSON.parse(JSON.stringify(car));
  }

  public async createCar(carData: CreateCarDto): Promise<Car> {
    if (isEmpty(carData)) throw new HttpException(400, 'carData not found');

    if (!ajvValidate(carData)) throw new HttpException(409, 'Provided invalid Data');

    const car: Car = await this.cars.create({ ...carData });
    return JSON.parse(JSON.stringify(car));
  }

  public async updateCar(carId: string, carData: UpdateCarDto): Promise<Car> {
    if (isEmpty(carData)) throw new HttpException(400, 'carData is Empty');

    const car: Car = (await this.cars.findByIdAndUpdate(carId, { ...carData }, { new: true })) as Car;
    if (!car) throw new HttpException(409, 'Car data is not updated');

    return JSON.parse(JSON.stringify(car));
  }

  public async deleteCar(carId: string): Promise<Car> {
    const car: Car = (await this.cars.findByIdAndDelete(carId)) as Car;
    if (!car) throw new HttpException(409, 'car not found');

    return JSON.parse(JSON.stringify(car));
  }
}

export default CarService;
