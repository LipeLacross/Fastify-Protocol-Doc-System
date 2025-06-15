import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from "fastify";
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const dbPlugin: FastifyPluginAsync = async (fastify) => {
  let prisma: PrismaClient;

  try {
    // Verificar se DATABASE_URL existe
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL não está definida no arquivo .env');
    }

    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });

    // Testar conexão com timeout
    await Promise.race([
      prisma.$connect(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout na conexão com banco')), 10000)
      )
    ]);

    fastify.log.info('✅ Conexão com banco de dados estabelecida com sucesso');

    // Decorar instância Fastify
    fastify.decorate('prisma', prisma);

    // Hook para fechar conexão
    fastify.addHook('onClose', async (instance) => {
      await instance.prisma.$disconnect();
      fastify.log.info('🔌 Conexão com banco de dados fechada');
    });

  } catch (error) {
    fastify.log.error('❌ Erro na conexão com banco de dados:', error);
    throw error; // Re-throw para que o Fastify falhe adequadamente
  }
};

export default fp(dbPlugin, {
  name: 'db-plugin',
  dependencies: []
});
