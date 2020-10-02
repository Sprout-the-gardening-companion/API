const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const serviceAccount = require(`../${process.env.SERVICE_ACCOUNT_CREDS}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sprout-the-garden-companion.firebaseio.com"
});

const db = admin.firestore();

// GET all plants
router.get('/', async (req, res) => {
    try {
        const plantRef = db.collection('Plants');
        const snapshot = await plantRef.get();
        let sendMe;
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            const id = doc.id;
            const data = doc.data();
            sendMe = { ...sendMe, [id]: data }
        });
        console.log(sendMe);
        res.json(sendMe);        
    } catch(err) {
        res.json({ message: err });
    }
});

// Submit a plant
router.post('/', async (req, res) => {
    try {
        const plantRef = db.collection('Plants');
        console.log(req.body);
        await plantRef.doc(req.body.name).set({
            care: req.body.care,
            description: req.body.description
        });
        const newPlant = await plantRef.doc(req.body.name).get();
        res.json({ [newPlant.id]: newPlant.data() });
    } catch(err) {
        res.json({ message: err });
    }
});

// GET a specific plant
router.get('/:plantId', async (req, res) => {
    try {
        const singlePlant = await Sprout.findById(req.params.plantId);
        res.json(singlePlant);
    } catch(err) {
        res.json({ message: err });
    }
});

// UPDATE a plant
router.patch('/:plantName', async (req, res) => {
    try {
        const plantRef = db.collection('Plants');
        if (req.body.care) {
            await plantRef.doc(req.params.plantName).set({
                care: req.body.care
            }, { merge: true } );
        }
        if (req.body.description) {
            await plantRef.doc(req.params.plantName).set({
                description: req.body.description
            }, { merge: true } );
        }
        const updatedPlant = await plantRef.doc(req.params.plantName).get();
        res.json(updatedPlant.data());
    } catch(err) {
        res.json({ message: err });
    }
});

// Update the amount of times this plant has been favorited/saved by users
// TODO: Figure out how to "++" the favs then uncomment and impelment
// router.patch('/fav/:plantId', async (req, res) => {
//     try {
//         console.log("It's my favorite -> ", req.body);
//         const favoritedPlant = await Sprout.updateOne(
//             { _id: req.params.plantId},
//             { $set: {
//                 favs: req.body.favs
//             }}
//         );
//         res.json(favoritedPlant);
//     } catch(err) {
//         res.json({ message: err });
//     }
// });

// DELETE a specific plant
router.delete('/:plantId', async (req, res) => {
    try {
        const removePlant = await Sprout.deleteOne({ _id: req.params.plantId });
        res.json(removePlant);
    } catch(err) {
        res.json({ message: err });
    }
});

module.exports = router;
