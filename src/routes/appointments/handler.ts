import { type RouteHandler } from 'fastify';
import type { AppointmentNotFound, Params, Querystring, Body, Reply, ReplyList, } from './schema';


export const getAppointmentsHandler: RouteHandler<{
    Querystring: Querystring
    Reply: ReplyList
}> = async function (req, reply) {
    const {
        date_from,
        date_to,
        inspector_id,
        case_id,
    } = req.query;

    const appointment = await req.server.prisma.appointment.findMany({
        include: {
            Case: true,
        },
        where: {
            date: {
                gte: date_from,
                lte: date_to,
            },
            Case: {
                id: case_id,
                inspector_id: inspector_id,
            }
        },
    });
    reply.code(200).send({ success: true, message: 'List of appointments', appointments: appointment });
}

export const getAppointmentByHandler: RouteHandler<{
    Params: Params
    Reply: Reply | AppointmentNotFound | any
}> = async function (req, reply) {
    const { case_id } = req.params
    const id = parseInt(case_id);

    const findedAppointment = await req.server.prisma.appointment.findUnique({
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
    Reply: Reply | any
}> = async function (req, reply) {

    const { case_id } = req.params;
    const { date, time_from, time_to } = req.body

    if (!date || !time_from || !time_to) {
        reply.code(404).send({ success: false, message: 'Appoinment not found' })
        return;
    }

    const id = parseInt(case_id)
    const postAppointment = await req.server.prisma.appointment.upsert({
        create: {
            case_id: id,
            date: date,
            time_from: time_from,
            time_to: time_to,
        },
        update: {
            case_id: id,
            date: date,
            time_from: time_from,
            time_to: time_to,
        },
        where: {
            case_id: id,
          },
    })
    if (postAppointment)
        reply.code(200).send({ success: true, message: 'Appoinment created', appointment: postAppointment })
    else
        reply.code(404).send({ success: false, message: 'Appoinment not found' })
}

export const putAppointmentByCaseHandler: RouteHandler<{
    Params: Params
    Body: Body
    Reply: Reply | any
}> = async function (req, reply) {

    const { case_id } = req.params;
    const id = parseInt(case_id);
    const { date, time_from, time_to } = req.body;

    const putAppointmentByCase = await req.server.prisma.appointment.update({
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

export const deleteAppointmentByCaseHandler: RouteHandler<{
    Params: Params
    Reply: Reply
}> = async function (req, reply) {

    const { case_id } = req.params;
    const id = parseInt(case_id);

    const deleteAppointmentByCaseId = await req.server.prisma.appointment.delete({
        where: {
            case_id: id
        }
    })
    if (deleteAppointmentByCaseId)
        reply.code(200).send({ success: true, message: 'Appoinment deleted' })
    else
        reply.code(404).send({ success: false, message: 'Appoinment not found' })

}

