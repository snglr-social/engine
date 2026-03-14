import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

const ConfigSchema = z.object({
  name: z.string(),
  chats: z.array(z.object({
    id: z.string(),
    name: z.string(),
    access: z.record(z.string(), z.array(z.string()))
  })),
});

@Injectable()
export class ConfigService implements OnModuleInit {
  private readonly logger = new Logger(ConfigService.name);
  private config: any;

  onModuleInit() {
    this.loadConfig();
  }

  loadConfig() {
    try {
      const configPath = path.join(process.cwd(), '../../config.yaml');
      const fileContents = fs.readFileSync(configPath, 'utf8');
      this.config = yaml.load(fileContents);
      
      ConfigSchema.parse(this.config);
      
      this.logger.log(`Config "${this.config.name}" loaded successfully`);
    } catch (e) {
      this.logger.error('Failed to load config.yaml', e.stack);
      process.exit(1);
    }
  }

  get(key: string) {
    return this.config[key];
  }
}