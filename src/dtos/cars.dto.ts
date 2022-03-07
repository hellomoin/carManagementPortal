import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsString()
  public make: string;

  @IsString()
  public model: string;

  @IsString()
  public color: string;

  @IsString()
  public fuelType: string;

  @IsNumber()
  public price: number;
}

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  public make: string;

  @IsString()
  @IsOptional()
  public model: string;

  @IsString()
  @IsOptional()
  public color: string;

  @IsString()
  @IsOptional()
  public fuelType: string;

  @IsNumber()
  @IsOptional()
  public price: number;
}
