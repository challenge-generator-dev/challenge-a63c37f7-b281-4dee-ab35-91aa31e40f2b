import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class Product {
  @Expose()
  id?: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  @Expose()
  name: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un valor positivo' })
  @Expose()
  price: number;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @Length(10, 500, { message: 'La descripción debe tener entre 10 y 500 caracteres' })
  @Expose()
  description: string;

  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  @Expose()
  category: string;

  constructor(
    name: string,
    price: number,
    description: string,
    category: string,
    id?: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
  }
}

export class CreateProductDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  name!: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un valor positivo' })
  price!: number;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @Length(10, 500, { message: 'La descripción debe tener entre 10 y 500 caracteres' })
  description!: string;

  @IsString({ message: ' categoría debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  category!: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un valor positivo' })
  price?: number;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @Length(10, 500, { message: 'La descripción debe tener entre 10 y 500 caracteres' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  category?: string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export { generateId };