const express = require('express');
const router = express.Router();
const Sprout = require('../models/Sprout');

// GET all plants
router.get('/', async (req, res) => {
    try {
        const plants = await Sprout.find();
        res.json(plants);
    } catch(err) {
        res.json({ message: err });
    }
});

// Submit a plant
router.post('/', async (req, res) => {
    const plant = new Sprout({
        name: req.body.name,
        description: req.body.description,
        care: req.body.care,
        varieties: req.body.varieties,
        favs: req.body.favs
    });

    try {
        const savedPlant = await plant.save()
        res.json(savedPlant);
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
router.patch('/:plantId', async (req, res) => {
    try {
        console.log("Update Body -> ", req.body);
        const updatedPlant = await Sprout.updateOne(
            { _id: req.params.plantId }, 
            { $set: {
                name: req.body.name,
                description: req.body.description,
                care: req.body.care,
                varieties: req.body.varieties
            }}
        );
        res.json(updatedPlant);
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
