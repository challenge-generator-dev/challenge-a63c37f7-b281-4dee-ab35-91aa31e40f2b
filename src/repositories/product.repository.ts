import { Product } from '../models/product.model';

/**
 * Interfaz para el repositorio de productos.
 * Define las operaciones de persistencia para Producto.
 */
export interface IProductRepository {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    update(id: string, product: Partial<Product>): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
    findByName(name: string): Promise<Product | null>;
}

/**
 * Implementación del repositorio de productos.
 * En esta versión inicial, se simula la persistencia en memoria.
 */
export class ProductRepository implements IProductRepository {
    private products: Product[] = [];

    async create(product: Product): Promise<Product> {
        const newProduct = { ...product, id: this.generateId() };
        this.products.push(newProduct);
        return newProduct;
    }

    async findAll(): Promise<Product[]> {
        return [...this.products];
    }

    async findById(id: string): Promise<Product | null> {
        return this.products.find(p => p.id === id) || null;
    }

    async update(id: string, product: Partial<Product>): Promise<Product | null> {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;

        const updatedProduct = { ...this.products[index], ...product, id };
        this.products[index] = updatedProduct;
        return updatedProduct;
    }

    async delete(id: string): Promise<boolean> {
        const initialLength = this.products.length;
        this.products = this.products.filter(p => p.id !== id);
        return this.products.length !== initialLength;
    }

    async findByName(name: string): Promise<Product | null> {
        return this.products.find(p => p.name === name) || null;
    }

    public generateId(): string {
        return Math.random().toString(36).substring(2, 9);
    }
}