import { Request, Response, NextFunction } from 'express';
import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';
import { ValidationException } from '../exceptions/validation.exception';
import { NotFoundException } from '../exceptions/not-found.exception';
import { HttpException } from '../exceptions/http.exception';

export class ProductController {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, price, description, category } = req.body;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new ValidationException('El nombre del producto es requerido y debe ser una cadena no vacía');
      }

      if (typeof price !== 'number' || price <= 0) {
        throw new ValidationException('El precio debe ser un número positivo');
      }

      if (description && typeof description !== 'string') {
        throw new ValidationException('La descripción debe ser una cadena de texto');
      }

      if (category && typeof category !== 'string') {
        throw new ValidationException('La categoría debe ser una cadena de texto');
      }

      const existingProduct = await this.productRepository.findByName(name.trim());
      if (existingProduct) {
        throw new ValidationException(`Ya existe un producto con el nombre "${name}"`);
      }

      const createProductDto: CreateProductDto = {
        name: name.trim(),
        price: price,
        description: description ? description.trim() : '',
        category: category ? category.trim() : 'general'
      };

      const newProduct = new Product(
        createProductDto.name,
        createProductDto.price,
        createProductDto.description,
        createProductDto.category,
        this.productRepository.generateId()
      );

      const createdProduct = await this.productRepository.create(newProduct);

      res.status(201).json({
        success: true,
        data: {
          id: createdProduct.id,
          name: createdProduct.name,
          price: createdProduct.price,
          description: createdProduct.description,
          category: createdProduct.category
        },
        message: 'Producto creado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.productRepository.findAll();

      const productsResponse = products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category
      }));

      res.status(200).json({
        success: true,
        data: productsResponse,
        count: productsResponse.length,
        message: productsResponse.length > 0 
          ? `${productsResponse.length} producto(s) encontrado(s)` 
          : 'No hay productos disponibles'
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id || typeof id !== 'string' || id.trim().length === 0) {
        throw new ValidationException('El ID del producto es requerido');
      }

      const product = await this.productRepository.findById(id.trim());

      if (!product) {
        throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
      }

      res.status(200).json({
        success: true,
        data: {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category
        },
        message: 'Producto encontrado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;
      const { name, price, description, category } = req.body;

      if (!id || typeof id !== 'string' || id.trim().length === 0) {
        throw new ValidationException('El ID del producto es requerido');
      }

      const trimmedId = id.trim();
      const existingProduct = await this.productRepository.findById(trimmedId);
      if (!existingProduct) {
        throw new NotFoundException(`Producto con ID "${trimmedId}" no encontrado`);
      }

      if (name !== undefined) {
        if (typeof name !== 'string' || name.trim().length === 0) {
          throw new ValidationException('El nombre del producto debe ser una cadena no vacía');
        }

        const productWithSameName = await this.productRepository.findByName(name.trim());
        if (productWithSameName && productWithSameName.id !== trimmedId) {
          throw new ValidationException(`Ya existe otro producto con el nombre "${name}"`);
        }
      }

      if (price !== undefined) {
        if (typeof price !== 'number' || price <= 0) {
          throw new ValidationException('El precio debe ser un número positivo');
        }
      }

      if (description !== undefined && typeof description !== 'string') {
        throw new ValidationException('La descripción debe ser una cadena de texto');
      }

      if (category !== undefined && typeof category !== 'string') {
        throw new ValidationException('La categoría debe ser una cadena de texto');
      }

      const updateData: UpdateProductDto = {
        name: name ? name.trim() : undefined,
        price: price,
        description: description ? description.trim() : undefined,
        category: category ? category.trim() : undefined
      };

      const updatedProduct = await this.productRepository.update(trimmedId, updateData);

      if (!updatedProduct) {
        throw new NotFoundException(`No se pudo actualizar el producto con ID "${trimmedId}"`);
      }

      res.status(200).json({
        success: true,
        data: {
          id: updatedProduct.id,
          name: updatedProduct.name,
          price: updatedProduct.price,
          description: updatedProduct.description,
          category: updatedProduct.category
        },
        message: 'Producto actualizado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id || typeof id !== 'string' || id.trim().length === 0) {
        throw new ValidationException('El ID del producto es requerido');
      }

      const trimmedId = id.trim();
      const existingProduct = await this.productRepository.findById(trimmedId);
      if (!existingProduct) {
        throw new NotFoundException(`Producto con ID "${trimmedId}" no encontrado`);
      }

      const deleted = await this.productRepository.delete(trimmedId);

      if (!deleted) {
        throw new HttpException(500, 'Error al eliminar el producto');
      }

      res.status(200).json({
        success: true,
        data: {},
        message: 'Producto eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}