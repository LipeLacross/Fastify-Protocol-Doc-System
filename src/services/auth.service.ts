import bcrypt from 'bcryptjs'
import { RegisterSchema, LoginSchema } from '@/schemas/auth.schema'
import { FastifyInstance } from 'fastify'

export async function registerUser(data: RegisterSchema, fastify: FastifyInstance) {
  const hashed = await bcrypt.hash(data.password, 10)
  const user = await fastify.prisma.user.create({
    data: { ...data, password: hashed }
  })
  return { id: user.id, email: user.email, role: user.role, name: user.name }
}

export async function loginUser(data: LoginSchema, fastify: FastifyInstance) {
  const user = await fastify.prisma.user.findUnique({ where: { email: data.email } })
  if (!user) throw new Error('Credenciais inválidas')
  const valid = await bcrypt.compare(data.password, user.password)
  if (!valid) throw new Error('Credenciais inválidas')
  return user
}
