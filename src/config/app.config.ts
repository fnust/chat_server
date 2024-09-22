import { config } from 'dotenv';
import { IsInt, IsString, validateSync } from 'class-validator';

config();

class Configuration {
  @IsString()
  readonly POSTGRES_HOST: string;

  @IsInt()
  readonly POSTGRES_PORT: number;

  @IsString()
  readonly POSTGRES_DB: string;

  @IsString()
  readonly POSTGRES_USER: string;

  @IsString()
  readonly POSTGRES_PASSWORD: string;

  @IsInt()
  readonly SERVER_PORT: number;

  constructor() {
    this.POSTGRES_HOST = process.env.POSTGRES_HOST;
    this.POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
    this.POSTGRES_DB = process.env.POSTGRES_DB;
    this.POSTGRES_USER = process.env.POSTGRES_USER;
    this.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
    this.SERVER_PORT = Number(process.env.SERVER_PORT);

    this.validateConfig();
  }

  private validateConfig(): void {
    const errors = validateSync(this);

    if (errors.length > 0) {
      console.log(`Config validation error: ${JSON.stringify(errors)}`);
      process.exit(1);
    }
  }
}

export const Config = new Configuration();
