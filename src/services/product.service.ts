import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';
import { IProductRepository } from '../repositories/product.repository';
import { NotFoundException } from '../exceptions/not-found.exception';
import { ValidationException } from '../exceptions/validation.exception';

export class ProductService {
    constructor(private readonly productRepository: IProductRepository) {}

    async createProduct(dto: CreateProductDto): Promise<Product> {
        const existingProduct = await this.productRepository.findByName(dto.name);
        if (existingProduct) {
            throw new ValidationException('Product with this name already exists');
        }

        if (dto.price <= 0) {
            throw new ValidationException('Price must be a positive value');
        }

        if (!dto.name || dto.name.trim().length === 0) {
            throw new ValidationException('Product name is required');
        }

        if (!dto.category || dto.category.trim().length === 0) {
            throw new ValidationException('Product category is required');
        }

        const product = new Product(
            dto.name.trim(),
            dto.price,
            dto.description?.trim() || '',
            dto.category.trim()
        );

        return await this.productRepository.create(product);
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        if (dto.name && dto.name.trim() !== existingProduct.name) {
            const productWithName = await this.productRepository.findByName(dto.name);
            if (productWithName && productWithName.id !== id) {
                throw new ValidationException('Product with this name already exists');
            }
        }

        if (dto.price !== undefined && dto.price <= 0) {
            throw new ValidationException('Price must be a positive value');
        }

        const updateData: Partial<Product> = {};
        if (dto.name) updateData.name = dto.name.trim();
        if (dto.price !== undefined) updateData.price = dto.price;
        if (dto.description !== undefined) updateData.description = dto.description.trim();
        if (dto.category) updateData.category = dto.category.trim();

        const updatedProduct = await this.productRepository.update(id, updateData);
        if (!updatedProduct) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return updatedProduct;
    }

    async deleteProduct(id: string): Promise<void> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        const deleted = await this.productRepository.delete(id);
        if (!deleted) {
            throw new NotFoundException(`Failed to delete product with id ${id}`);
        }
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        const allProducts = await this.productRepository.findAll();
        return allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    async searchProducts(query: string): Promise<Product[]> {
        const allProducts = await this.productRepository.findAll();
        const lowerQuery = query.toLowerCase();
        return allProducts.filter(
            p => p.name.toLowerCase().includes(lowerQuery) || 
                 p.description.toLowerCase().includes(lowerQuery)
        );
    }
}