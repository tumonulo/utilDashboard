const schema = require('../../schemas/discordSchema.js')

module.exports = async function clientEdit(req, res) {
    const clients = require('../../app.js')

    const clientsIDs = clients.map(client => client.id);

    const clientID = req.body.clientID;

    if (!clientID) {
        return res.status(400).json({ success: false, error: 'clientID is required' });
    }

    if (!clientsIDs.includes(clientID)) {
        return res.status(404).json({ success: false, error: 'No cuento con ningún cliente con ese ID' });
    }

    const newClientsArray = clients.map(client => ({
        id: client.id,
        name: client.user.username,
        avatar: client.user.avatarURL(),
        selected: client.id === clientID
    }))

    try {
        const data = await schema.findOne()

        data.Clients = newClientsArray

        await data.save()

        res.json({ success: true, clients: newClientsArray })

    } catch (error) {
        console.error(error)
    }
}