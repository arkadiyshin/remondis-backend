import { type RouteHandler } from 'fastify'
import { UserNotFound, Params, Querystring, BodyNew, BodyChange, Reply, ReplyList } from './schema'





export const getUsersHandler: RouteHandler<{
    Querystring: Querystring
    Reply: ReplyList
}> = async function (req, reply) {

    const userList = await req.server.prisma.user.findMany();
    reply.send({ users: userList })
}

export const getUserHandler: RouteHandler<{
    Params: Params;
    Reply: Reply | UserNotFound;
}> = async function (req, reply) {

    const { user_id } = req.params;
    const id = parseInt(user_id);

    const findUser = await req.server.prisma.user.findUnique({
        where: {
            id: id
        }
    });
    if (findUser)
        reply
            .code(200)
            .send({ success: true, message: "User found", user: findUser });
    else reply.code(404).send({ success: false, message: "User not found" });

}

export const createUserHandler: RouteHandler <{
    Body: BodyNew;
    Reply: Reply;
}> = async function (req, reply) {
    
    const token = await req.server.jwt.sign({sub: req.body.email_address})
}

export const confirmedUserHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const updateUserHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const changeUserRoleHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const setNewPassHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const forgotPassHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const deleteUserHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}