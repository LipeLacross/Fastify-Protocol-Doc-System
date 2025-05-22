import { FastifyRequest, FastifyReply } from 'fastify'
import { registerUser, loginUser } from '../services/auth.service'
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema'
import { PrismaClient } from '@prisma/client'

export async function registerController(
  request: FastifyRequest<{ Body: RegisterSchema }>,
  reply: FastifyReply
) {
  try {
    const prisma = request.server.prisma as PrismaClient
    const user = await registerUser(request.body, prisma)

    reply.code(201).send({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    })
  } catch (error) {
    reply.code(400).send({
      message: "Erro no registro",
      details: error instanceof Error ? error.message : "Erro desconhecido"
    })
  }
}

export async function loginController(
  request: FastifyRequest<{ Body: LoginSchema }>,
  reply: FastifyReply
) {
  try {
    const prisma = request.server.prisma as PrismaClient
    const user = await loginUser(request.body, prisma)

    const token = request.server.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
    }, { expiresIn: "1h" })

    reply.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    })
  } catch (error) {
    reply.code(401).send({
      message: "Credenciais inválidas",
      details: error instanceof Error ? error.message : "Erro desconhecido"
    })
  }
}
