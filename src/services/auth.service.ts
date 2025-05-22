import bcrypt from 'bcryptjs'
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema'
import { PrismaClient } from '@prisma/client'

export async function registerUser(
  data: RegisterSchema,
  prisma: PrismaClient
) {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role,
      name: data.name
    },
    select: {
      id: true,
      email: true,
      role: true,
      name: true
    }
  })

  return user
}

export async function loginUser(
  data: LoginSchema,
  prisma: PrismaClient
) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      name: true
    }
  })

  if (!user) throw new Error('Usuário não encontrado')

  const valid = await bcrypt.compare(data.password, user.password)
  if (!valid) throw new Error('Senha incorreta')

  return user
}
