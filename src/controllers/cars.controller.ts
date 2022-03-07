import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateCarDto, UpdateCarDto } from '@dtos/cars.dto';
import { Car } from '@interfaces/cars.interface';
import carService from '@/services/cars.service';
import { validationMiddleware } from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

@Controller()
export class CarsController {
  public carService = new carService();

  @Get('/cars')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return a list of cars' })
  async getCars() {
    const findAllCarsData: Car[] = await this.carService.findAllCars();
    return { data: findAllCarsData, message: 'findAll' };
  }

  @Get('/cars/:id')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return find a car' })
  async getCarById(@Param('id') _Id: string) {
    const findOneCarData: Car = await this.carService.findCarById(_Id);
    return { data: findOneCarData, message: 'findOne' };
  }

  @Post('/cars')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateCarDto, 'body'))
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Create a new car' })
  async createCar(@Body() carData: CreateCarDto) {
    const createCarData: Car = await this.carService.createCar(carData);
    return { data: createCarData, message: 'created' };
  }

  @Put('/cars/:id')
  @UseBefore(validationMiddleware(UpdateCarDto, 'body'))
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Update a car' })
  async updateCar(@Param('id') _Id: string, @Body() carData: UpdateCarDto) {
    const updateCarData: Car = await this.carService.updateCar(_Id, carData);
    return { data: updateCarData, message: 'updated' };
  }

  @Delete('/cars/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Delete a car' })
  async deleteCar(@Param('id') _Id: string) {
    const deleteCarData: Car = await this.carService.deleteCar(_Id);
    return { data: deleteCarData, message: 'deleted' };
  }
}
