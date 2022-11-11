import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get('/', async function (req, reply) {

        // const managerDelays = [
        //     { Created: 0 },
        //     { Assigned: 0 },
        //     { Confirmed: 0 }, // delay without appointment
        //     { Appointment: 0 }, // date of appointment
        //     { Ready: 0 }
        // ];

        // const inspectorDelays = [
        //     { Assigned: 0 },
        //     { Confirmed: 0 }, // delay without appointment
        //     { Appointment: 0 }, // date of appointment
        // ];


        // find role by user_id
        // get
        // 
        // get delays by states
        // get cases last update + delay 

        // cases by user and dedline (last_update + delay (by role) ) >= Date.now()

        // const { user_id } = req.query;

        //req.server.prisma.case

        //return { root: true }
        reply.send('ok');
    })
}

export default root