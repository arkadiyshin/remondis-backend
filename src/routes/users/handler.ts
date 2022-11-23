import { type RouteHandler } from 'fastify'
import * as bcrypt from "bcrypt";
import type { UserNotFound, Params, Querystring, BodyNew, BodyChange, Reply, ReplyList, BodyLogin } from './schema'
import { Role, UserState } from '@prisma/client';
import { FRONTEND_URL } from '../../configuration'


export const getUsersHandler: RouteHandler<{
    Querystring: Querystring
    Reply: ReplyList
}> = async function (req, reply) {
    const where: any = {};
    for (const [key, value] of Object.entries(req.query)) {
        where[key] = value
    }
    const userList = await req.server.prisma.user.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            role: true,
            state: true,
        },
        where: where

    });

    reply.send({ success: true, message: "List of users", users: userList })
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
    if (findUser) {
        const {email, state, ...user} = findUser;
        reply
            .code(200)
            .send({ success: true, message: "User found", user: {email_address: email, state: state as UserState, ...user} });
    }
    else reply.code(404).send({ success: false, message: "User not found" });

}

export const createUserHandler: RouteHandler<{
    Body: BodyNew;
    Reply: Reply;
}> = async function (req, reply) {

    const { email_address } = req.body;
    const userFind = await req.server.prisma.user.findFirst({
        where: {
            email: email_address
        }
    })

    if (userFind?.hash_password) {
        reply.code(300).send({ success: false, message: "User already exist" })
    } else {
        const token = await req.server.jwt.sign({ sub: email_address })
        await req.server.prisma.user.upsert({
            create: {
                email: email_address || "",
                token: token
            },
            update: {
                token: token
            },
            where: {
                email: email_address
            }
        })

        const html = await req.server.view("/src/templates/confirm-mail.ejs", {
            username: email_address,
            confirm_link: `${FRONTEND_URL}/confirm?email=${email_address}&token=${token}`
        });

        //here should be sending token by email
        const msg = {
            to: email_address, // Change to your recipient
            from: 'noreplay.remondis@gmail.com', // Change to your verified sender
            subject: 'Confirm your e-mail',
            html: html,
        }

        try {
            await req.server.sgMail.send(msg);
            reply.send({ success: true, message: 'Email sended' })
        } catch (error) {
            reply.send({ success: false, message: 'Email not sended' })
        }

    }
}

export const confirmedUserHandler: RouteHandler<{
    Body: BodyChange;
    Reply: Reply;
}> = async function (req, reply) {
    const { email_address } = req.body;    
    if (req.headers.authorization === undefined) {
        console.error('Token undefined')
    } else {
        const [method, token] = req.headers.authorization.split(" ")

        if (method === "Bearer") {
            const findToken = await req.server.prisma.user.findFirst({
                where: {
                    email: email_address
                }
            })
            if (findToken?.token === token) {
                const {token, hash_password, state, ...user} = findToken;
                reply.send({ success: true, message: 'User verified', user: {state: state as UserState, ...user} })
            }
            else {
                reply.send({ success: false, message: 'Invalid token' })
            }

        } else {
            reply.send({ success: true, message: 'Invalid method' })
        }
    }
}

export const updateUserHandler: RouteHandler<{
    Body: BodyChange
    Params: Params;
    Reply: Reply;
}> = async function (req, reply) {

    const {user_id} = req.params;
    const id = parseInt(user_id);

    const { username, phone, role, email_address, password, state } = req.body;
    console.log(req.body)
    let hash_password = '';
    if(password) {
        hash_password = await bcrypt.hash(password!, 13);
    }

    let condData = {};
    condData = !role ? {...condData} : {role: role as Role};
    condData = !username ? {...condData} : {...condData, username: username};
    condData = !phone ? {...condData} : {...condData, phone: phone};
    condData = !email_address? {...condData} : {...condData, email: email_address};
    condData = !hash_password? {...condData} : {...condData, hash_password: hash_password};
    condData = !state? {...condData} : {...condData, state: state as UserState};

    const updateUser = await req.server.prisma.user.update({
        where: {
            id: id
        },
        data: {...condData},
    })

    if (updateUser) {
        const { hash_password, token, state, ...sendUser } = updateUser;
        reply
            .code(200)
            .send({ success: true, message: "User changed", user: {state: state as UserState, ...sendUser} });
    } else {
        reply.code(404).send({ success: false, message: "User not found" });
    }
}

export const forgotPassHandler: RouteHandler<{
    Body: BodyNew;
    Params: Params;
    Reply: Reply;
}> = async function (req, reply) {
    const { user_id } = req.params;
    const id = parseInt(user_id);
    const { email_address } = req.body;
    const userFind = await req.server.prisma.user.findFirst({
        where: {
            email: email_address
        }
    })
    if (!userFind) {
        reply.code(404).send({ success: false, message: "User not found" })
    } else {
        const token = await req.server.jwt.sign({ sub: email_address })
        await req.server.prisma.user.update({
            data: {
                token: token
            },
            where: {
                id: id
            }
        });
        // should send email where user should press on button and go to the page for changing password
        const html = await req.server.view("/src/templates/confirm-mail.ejs", {
            username: userFind.username,
            confirm_link: `${FRONTEND_URL}/confirm?email=${email_address}&token=${token}`
        });
        const msg = {
            to: email_address, // Change to your recipient
            from: 'noreplay.remondis@gmail.com', // Change to your verified sender
            subject: 'Confirm your e-mail',
            //text: `click here: ${token}`,
            html: html,
        }

        try {
            await req.server.sgMail.send(msg);
            reply.send({ success: true, message: 'Email sended' })
        } catch (error) {
            reply.send({ success: false, message: 'Email not sended' })
        }

    }
}

// export const setNewPassHandler: RouteHandler<{
//     Params: Params;
//     Reply: Reply;
//     Body: BodyChange;
// }> = async function (req, reply) {
//     const { user_id } = req.params;
//     const id = parseInt(user_id);
//     const { password } = req.body;
//     if (req.headers.authorization === undefined) {
//         console.error('Token undefined')
//     } else {
//         const [method, token] = req.headers.authorization.split(" ")

//         if (method === "Bearer") {
//             const findToken = await req.server.prisma.user.findFirst({
//                 where: {
//                     id: id
//                 }
//             })
//             if (findToken?.token === token) {
//                 reply.send({ success: true, message: 'User verified' })

//             }
//             else {
//                 reply.send({ success: false, message: 'Invalid token' })
//             }

//         } else {
//             reply.send({ success: true, message: 'Invalid method' })
//         }
//     }

// }

// export const deleteUserHandler: RouteHandler<{
//     Params: Params;
//     Reply: Reply;
// }> = async function (req, reply) {

//     const { user_id } = req.params;
//     const id = parseInt(user_id);

//     const deleteUser = await req.server.prisma.user.delete({
//         where: {
//             id: id
//         }
//     })
//     reply.send({ success: true, message: 'User deleted' })
// }

export const loginUserHandler: RouteHandler<{
    Body: BodyLogin;
    Reply: Reply;
}> = async function (req, reply) {

    const { username, password } = req.body;
    const findUser = await req.server.prisma.user.findFirst({
        where: {
            username: username
        }
    })

    if (!findUser) {
        reply.send({ success: false, message: 'User undefined' })
    } else {
        if (findUser.hash_password) {
            const verifyPassword = await bcrypt.compare(password!, findUser.hash_password!);
            if (verifyPassword) {
                reply.send({ success: true, message: 'Login success', user: { role: findUser.role, id: findUser.id } })
            } else {
                reply.send({ success: false, message: 'Incorrect password' })
            }
        } else {
            reply.send({ success: false, message: 'Undefined password' })
        }
    }
}


