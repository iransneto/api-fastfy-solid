import 'dotenv/config';
import {z} from 'zod';

const envScheme = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3333),
})

const _env = envScheme.safeParse(process.env)

if(!_env.success) {
    console.error('Invalid enviroment variables', _env.error)

    throw new Error('Invalid enviroment variables ', )
}

export const env = _env.data;