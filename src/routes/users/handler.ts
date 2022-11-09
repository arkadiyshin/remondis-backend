import { type RouteHandler } from 'fastify'
import { UserNotFound, Params, Querystring, BodyNew, BodyChange, Reply, ReplyList } from './schema'

export const getUsersHandler: RouteHandler<{
    Querystring: Querystring
    Reply: ReplyList
}> = async function (req, reply) {

    const { role } = req.query;    
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

    const {email_address} = req.body;  
    const userFind = await req.server.prisma.user.findFirst({
        where: {
            email: email_address
        }
    })

    if (userFind?.hash_password){
        reply.code(300).send({success: false, message: "User already exist" })
    } else {
    const token = await req.server.jwt.sign({sub: email_address})   
    const userToken = await req.server.prisma.user.upsert({
        create: {            
            email: email_address || "",
            token: token
        },
        update: {            
            token: token
        },
        where : {
            email: email_address
        }
    })
    //here should be sending token by email
    reply.send({success: true, message: 'User created'}) 
    }
}

export const confirmedUserHandler: RouteHandler<{
    Params: Params;
    Reply: Reply;
}> = async function (req, reply) {
    const {user_id} = req.params;
    const id = parseInt(user_id);
    if(req.headers.authorization===undefined){
        console.error('Token undefined')
    } else {
    const [method, token] = req.headers.authorization.split(" ")
    
    if (method==="Bearer"){
        const findToken = await req.server.prisma.user.findFirst({
            where:{
                id: id
            }
        })
        if(findToken?.token===token) {
            reply.send({success: true, message: 'User verified'})
        }
        else {
            reply.send({success: false, message: 'Invalid token'})
        }
        
    } else {
        reply.send({success: true, message: 'Invalid method'})
    }
}
}

export const updateUserHandler: RouteHandler<{
    Body: BodyChange
    Params: Params;
    Reply: Reply;
}> = async function (req, reply) {

    const {id, username, email_address, role} = req.body
    const userFind = await req.server.prisma.user.findFirst({
        where: {
            id: id
        }
    })
    const updateUser = await req.server.prisma.user.update({
        where: {
            id: id
        },
        data: {
            username: username,
            role: role,
            email_address: email_address,
        }
    })

}

// export const changeUserRoleHandler: RouteHandler = async function (req, reply) {
//     reply.send('ok')
// }

export const setNewPassHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const forgotPassHandler: RouteHandler = async function (req, reply) {
    reply.send('ok')
}

export const deleteUserHandler: RouteHandler<{
    Params: Params;
    Reply: Reply;
}> = async function (req, reply) {

    const {user_id} = req.params;
    const id = parseInt(user_id);

    const deleteUser = await req.server.prisma.user.delete({
        where: {
            id: id
        }
    })
    reply.send({success: true, message: 'User deleted'})
}