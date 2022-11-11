import { type RouteHandler } from 'fastify';
import { AppointmentNotFound, Params, Querystring, Body, Reply, ReplyList, } from './schema';


export const getAppointmentsHandler: RouteHandler<{
    Querystring: Querystring
    Reply: ReplyList
}> = async function (req, reply) {

    const appointment = await req.server.prisma.appointment.findMany();
    reply.code(200).send({ appointments: appointment });
    console.log({ appointments: appointment });
}

export const getAppointmentByHandler: RouteHandler<{
    Params: Params
    Reply: Reply | AppointmentNotFound
}> = async function (req, reply) {
    const { case_id } = req.params
    const id = parseInt(case_id);

    const findedAppointment = await req.server.prisma.appointment.findFirst({
        where: {
            case_id: id,
        },
    });

    if (findedAppointment)
        reply.code(200).send({ success: true, message: 'Appoinment found', appointment: findedAppointment })
    else
        reply.code(404).send({ success: false, message: 'Appoinment not found' })
}


export const postAppointmentByCaseHandler: RouteHandler<{
    Params: Params
    Body: Body
    Reply: Reply
}> = async function (req, reply) {

    const { case_id } = req.params;
    const { date, time_from, time_to } = req.body

    const id = parseInt(case_id)
    const postAppointment = await req.server.prisma.appointment.create({
        data: {
            case_id: id,
            date: date,
            time_from: time_from,
            time_to: time_to,
        }
    })
    if (postAppointment)
        reply.code(200).send({ success: true, message: 'Appoinment created', appointment: postAppointment })
    else
        reply.code(404).send({ success: false, message: 'Appoinment not found' })    
}

export const putAppointmentByCaseHandler: RouteHandler<{
    Params: Params
    Body: Body
    Reply: Reply
}> = async function (req, reply) {

    const { case_id } = req.params;
    const id = parseInt(case_id);
    const { date, time_from, time_to } = req.body;

    const putAppointmentByCase = await req.server.prisma.appointment.updateMany({
        data: {
            case_id: id,
            date: date,
            time_from: time_from,
            time_to: time_to,
        },
        where: {
            case_id: id
        }
    })
    if (putAppointmentByCase)
        reply.code(200).send({ success: true, message: 'Appoinment changed', appointment: putAppointmentByCase })
    else
        reply.code(404).send({ success: false, message: 'Appoinment not found' })        
    
}

export const deleteAppointmentByCaseHandler: RouteHandler <{
    Params: Params
    Reply: Reply
}> = async function (req, reply) {
    
    const { case_id } = req.params;
    const id = parseInt(case_id);

    const deleteAppointmentByCaseId = await req.server.prisma.appointment.deleteMany({
        where: {
            case_id : id
        }
    })
    if (deleteAppointmentByCaseId)
        reply.code(200).send({ success: true, message: 'Appoinment deleted' })
    else
        reply.code(404).send({ success: false, message: 'Appoinment not found' })
    
}
