const Message = require('../models/message')

const obtenerChat = async ( req, res) =>{

        const userId = req.uid;
        const mensajeDe = req.params.de;

        const last30 = await Message.find({
            $or:
            [
                { from: userId, to:mensajeDe },
                { from: mensajeDe, to: userId},
            ]
        })
        .sort({ createdAt : 'desc'})
        .limit(30)

        res.json({
            ok: true,
            mensajeDe: last30,
        })

}

module.exports = {
    obtenerChat
}