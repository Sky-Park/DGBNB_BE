const AccommoService = require('../services/accommodations.service');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class AccommoController {
    accommoService = new AccommoService();

    hostAccommodation = async (req, res, next) => {
        try {
            const { memberId } = res.locals.user;

            const {
                accName,
                accAddr,
                description,
                price,
                maxPerson,
                bed,
                room,
                bathroom,
                facilities,
                } = req.body;

            const filesData = req.files;

            const hostedAccommo = await this.accommoService.hostAccommodation(
                filesData,
                memberId,
                accName,
                accAddr,
                description,
                price,
                maxPerson,
                bed,
                room,
                bathroom,
                facilities
            );

            res.status(201).json({ message: '숙소를 호스트했습니다.' });
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    };

    getAllAccommodations = async (req, res, next) => {
        let data = [];
        try {
            const accommoList =
                await this.accommoService.getAllAccommodations();

            // for(let i = 0 ; i < accommoList.length; i++) {
            //     data.push({

            //         accId: accommoList[i].accId,
            //         accName: accommoList[i].accName,
            //         accAddr: accommoList[i].accAddr,
            //         price: accommoList[i].price,
            //         rating: accommoList[i].rating,
            //         maxPerson: accommoList[i].maxPerson,
            //         bed: accommoList[i].bed,
            //         room: accommoList[i].room,
            //         bathroom: accommoList[i].bathroom

            //     })
            // }
            
            res.status(200).json( accommoList );
        } catch (err) {
            next(err);
        }
    };

    getAccommoDetails = async (req, res, next) => {
        const {authorization}  = req.headers;
        const [authType, authToken] = (authorization || "").split(" ");
        try {
            const { accId } = req.params;
            if(authorization) {
                const {memberId} = jwt.verify(authToken, process.env.SECRET_KEY);
                const accommoDetails = await this.accommoService.getAccommoDetails(accId, memberId);
                res.status(200).json(accommoDetails);
            } else {
                const accommoDetails = await this.accommoService.getAccommoDetails(accId);
                res.status(200).json(accommoDetails);
            }

        } catch (err) {
            res.status(400).json({errMessage: err.message})
        }
    };

    updateAccommo = async (req, res, next) => {
        const { memberId } = res.locals.user;
        const { accId } = req.params;
        const { accName, accAddr, price, description, maxPerson, bed, room, bathroom, facilities } = req.body;
        
        const fileData = req.files

        try{
            await this.accommoService.updateAccommo(
                fileData,
                memberId,
                accId,
                accName,
                accAddr,
                price,
                description,
                maxPerson,
                bed,
                room,
                bathroom,
                facilities,
            );
            
            res.status(201).json({ message: '숙소 정보를 수정했습니다.' });

        } catch (err) {

            res.status(400).json({error: err.message})
        }
    };

    deleteAccommo = async (req, res, next) => {
        const { memberId } = res.locals.user;
        const { accId } = req.params;
        
        try{
            await this.accommoService.deleteAccommo(memberId, accId);

            res.status(200).json({ message: '숙소를 삭제했습니다.' });
        } catch (err) {
            res.status(400).json({error: err.message})
        }
        
    }
}

module.exports = AccommoController;
