import { FastifyRequest, FastifyReply } from 'fastify'
import { registerUser, loginUser } from '@/services/auth.service'
import { RegisterSchema, LoginSchema } from '@/schemas/auth.schema'

export async function registerController(
  request: FastifyRequest<{ Body: RegisterSchema }>,
  reply: FastifyReply
) {
  const user = await registerUser(request.body, request.server)
  reply.code(201).send(user)
}

export async function loginController(
  request: FastifyRequest<{ Body: LoginSchema }>,
  reply: FastifyReply
) {
  const user = await loginUser(request.body, request.server)
  const token = request.server.jwt.sign({
    id: user.id,
    email: user.email,
    role: user.role
  })
  reply.send({ token })
}
