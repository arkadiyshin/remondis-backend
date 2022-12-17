import { type RouteHandler } from "fastify";
import type { Params, ParamsReq, BodyNew, Reply, ReplyList, CaseItemNotFound, BodyPhoto } from './schema'
import { ParamsPhoto, CasePhotoNotFound, ReplyPhoto, BodyPhotos, ParamsReqPhoto, ReplyListPhoto } from './schema';

export const getCaseItemsHandler: RouteHandler<{
    Params: ParamsReq
    Reply: ReplyList
}> = async function (req, reply) {

    const { case_id } = req.params;
    const id = parseInt(case_id);

    const records = await req.server.prisma.caseItem.findMany({
        include: {
            CasePhoto: true,
        },
        where: {
            case_id: id,
        }
    });

    reply
        .code(200)
        .send({ success: true, message: "List of case items", caseItems: records });

};

export const getCaseItemHandler: RouteHandler<{
    Params: Params
    //Reply: Reply | CaseItemNotFound | any
}> = async function (req, reply) {

    const { case_id, room } = req.params;
    const id = parseInt(case_id);
    const room_id = parseInt(room!);

    const record = await req.server.prisma.caseItem.findUnique({
        include: {
            CasePhoto: true,
        },
        where: {
            caseRoom: {
                case_id: id,
                room: room_id,
            },
        }
    });
    console.log(`record`, record)
    if (record) {
        console.log(record)
        reply
            .code(200)
            .send({ success: true, message: "Case item found", caseItem: { ...record, CasePhoto: record.CasePhoto } });
    } else {
        reply
            .code(404)
            .send({ success: false, message: "Case item not found" });
    }

};

export const addCaseItemHandler: RouteHandler<{
    Params: Params
    Body: BodyNew
    Reply: Reply | CaseItemNotFound
}> = async function (req, reply) {

    const { case_id, room } = req.params;
    const id = parseInt(case_id);
    const room_id = parseInt(room!);

    const record = await req.server.prisma.caseItem.create({
        data: {
            case_id: id,
            room: room_id,
            ...req.body,
        }
    });
    if (record)
        reply
            .code(200)
            .send({ success: true, message: "Case item added", caseItem: record });
    else
        reply
            .code(404)
            .send({ success: false, message: "Case item not added" });
};

export const updateCaseItemHandler: RouteHandler<{
    Params: Params
    Body: BodyNew
    Reply: Reply | CaseItemNotFound
}> = async function (req, reply) {

    const { case_id, room } = req.params;
    const id = parseInt(case_id);
    const room_id = parseInt(room!);
    console.log(req.body)
    const record = await req.server.prisma.caseItem.upsert({
        create: {
            case_id: id,
            room: room_id,
            ...req.body,
        },
        update: {
            case_id: id,
            room: room_id,
            ...req.body,
        },
        where: {
            caseRoom: {
                case_id: id,
                room: room_id,
            },
        }
    });

    if (record)
        reply
            .code(200)
            .send({ success: true, message: "Case item changed", caseItem: record });
    else reply
        .code(404)
        .send({ success: false, message: "Case item not found" });
};

export const deleteCaseItemHandler: RouteHandler<{
    Params: Params
    Reply: Reply | CaseItemNotFound
}> = async function (req, reply) {

    const { case_id, room } = req.params;
    const id = parseInt(case_id);
    const room_id = parseInt(room!);

    const record = await req.server.prisma.caseItem.delete({
        where: {
            caseRoom: {
                case_id: id,
                room: room_id,
            },
        }
    });

    if (record)
        reply
            .code(204)
            .send({ success: true, message: "Case item deleted" });
    else reply
        .code(404)
        .send({ success: false, message: "Case item not deleted" });
};

/**
 *  Photos
 */

const Base64URLtoBuffer = (Base64URL: string): Buffer => {
    const regex = /^data:.+\/(.+);base64,(.*)$/;

    const matches = Base64URL.match(regex);
    if (matches) {
        //const ext = matches[1];
        const data = matches[2];
        return Buffer.from(data, 'base64');
    } else {
        return Buffer.from('', 'base64');
    }
    //return Buffer.from(Base64URL, 'base64');
}

export const addCasePhotoHandler: RouteHandler<{
    Params: ParamsPhoto
    Body: BodyPhoto
    Reply: ReplyPhoto | CasePhotoNotFound
}> = async function (req, reply) {

    const { case_id, room } = req.params;
    const caseId = parseInt(case_id);
    const roomId = parseInt(room!);
    const file_name = req.body.file_name;
    const photo = Base64URLtoBuffer(req.body.photo);
    //...req.body
    const record = await req.server.prisma.casePhoto.create({
        data: {
            case_id: caseId,
            room: roomId,
            file_name: file_name,
            photo: photo,

            //...req.body,
        }
    });
    if (record) {
        const { photo, ...replyObject } = { ...record };
        reply
            .code(200)
            .send({ success: true, message: "Case photo added", CasePhoto: { ...replyObject, photo: '' } });
    } else {
        reply
            .code(404)
            .send({ success: false, message: "Case photo not added" });
    }
};

export const updateCasePhotoHandler: RouteHandler<{
    Params: ParamsReqPhoto
    Body: BodyPhotos
    Reply: ReplyListPhoto
}> = async function (req, reply) {

    if (req.body.CasePhotos) {
        const { case_id, room } = req.params;
        const caseId = parseInt(case_id);
        const roomId = parseInt(room!);

        //const photos = req.body.CasePhotos;

        await req.server.prisma.casePhoto.deleteMany({
            where: {
                case_id: caseId,
                room: roomId,
            }
        });

        //if (deleteRecords) {
        const photos = [];
        for (const photo of req.body.CasePhotos) {
            photos.push({
                case_id: caseId,
                room: roomId,
                file_name: photo.file_name,
                photo: Base64URLtoBuffer(photo.photo),
            })
        }
        console.log(photos)
        const records = await req.server.prisma.casePhoto.createMany({
            data: photos
        });

        if (records) {
            //const {photo, ...replyObject} = {...record};
            reply
                .code(200)
                .send({ success: true, message: "Case photo changed" });
        } else reply
            .code(404)
            .send({ success: false, message: "Case photo not found" });
        //}
    }
};

export const deleteCasePhotoHandler: RouteHandler<{
    Params: ParamsPhoto
    Reply: ReplyPhoto | CasePhotoNotFound
}> = async function (req, reply) {

    const { photo_id } = req.params;
    const id = parseInt(photo_id);

    const record = await req.server.prisma.casePhoto.delete({
        where: {
            id: id,
        }
    });

    if (record)
        reply
            .code(204)
            .send({ success: true, message: "Case photo deleted" });
    else reply
        .code(404)
        .send({ success: false, message: "Case photo not deleted" });
};

