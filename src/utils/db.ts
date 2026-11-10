import dotenv from 'dotenv';

dotenv.config();

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface ConnectionStatus {
  connected: boolean;
  timestamp: Date;
  database: string;
}

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private config: DatabaseConfig;
  private isConnected: boolean = false;
  private connectionTimestamp: Date | null = null;

  private constructor() {
    this.config = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      database: process.env.DB_NAME || 'techstore',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres'
    };
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('Ya existe una conexión activa a la base de datos');
      return;
    }

    try {
      console.log(`Conectando a la base de datos: ${this.config.database} en ${this.config.host}:${this.config.port}`);
      
      await this.simulateConnection();
      
      this.isConnected = true;
      this.connectionTimestamp = new Date();
      console.log('Conexión a la base de datos establecida exitosamente');
    } catch (error) {
      this.isConnected = false;
      throw new Error(`Error al conectar con la base de datos: ${(error as Error).message}`);
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      console.log('No hay conexión activa para cerrar');
      return;
    }

    try {
      await this.simulateDisconnect();
      this.isConnected = false;
      this.connectionTimestamp = null;
      console.log('Conexión a la base de datos cerrada correctamente');
    } catch (error) {
      throw new Error(`Error al cerrar la conexión: ${(error as Error).message}`);
    }
  }

  public getStatus(): ConnectionStatus {
    return {
      connected: this.isConnected,
      timestamp: this.connectionTimestamp || new Date(0),
      database: this.config.database
    };
  }

  public isHealthy(): boolean {
    return this.isConnected;
  }

  private async simulateConnection(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  private async simulateDisconnect(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  public getConfig(): DatabaseConfig {
    return { ...this.config };
  }

  public getConnectionString(): string {
    const { user, password, host, port, database } = this.config;
    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
  }
}

export const db = DatabaseConnection.getInstance();