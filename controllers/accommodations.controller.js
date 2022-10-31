const AccommoService = require('../services/accommodations.service');

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
                accImg,
            } = req.body;

            console.log(req.body)

            const hostedAccommo = await this.accommoService.hostAccommodation(
                memberId,
                accName,
                accAddr,
                description,
                price,
                maxPerson,
                bed,
                room,
                bathroom,
                facilities,
                accImg
            );

            res.status(201).json({ message: '숙소를 호스트했습니다.' });
        } catch (err) {
            next(err);
        }
    };

    getAllAccommodations = async (req, res, next) => {
        let data = [];
        try {
            const accommoList =
                await this.accommoService.getAllAccommodations();

            for(let i = 0 ; i < accommoList.length; i++) {
                data.push({
                    accId: accommoList[i].accId,
                    accName: accommoList[i].accName,
                    accAddr: accommoList[i].accAddr,
                    price: accommoList[i].price,
                    rating: accommoList[i].rating,
                    maxPerson: accommoList[i].maxPerson,
                    bed: accommoList[i].bed,
                    room: accommoList[i].room,
                    toilet: accommoList[i].toilet,
                    accImg: accommoList[i].accImg
                })
            }
            
            res.status(200).json({ data: data });
        } catch (err) {
            next(err);
        }
    };

    getAccommoDetails = async (req, res, next) => {
        try {
            const { accId } = req.params;
            const accommoDetails = await this.accommoService.getAccommoDetails(accId);

            res.status(200).json({ data: accommoDetails });
        } catch (err) {
            next(err);
        }
    };

    updateAccommo = async (req, res, next) => {
        // const { memberId } = res.locals.user;
        const { accId } = req.params;
        const { price, description, maxPerson, bed, room, bathroom, facilities, accImg } = req.body;

        await this.accommoService.updateAccommo(
            accId,
            price,
            description,
            maxPerson,
            bed,
            room,
            bathroom,
            facilities,
            accImg
        );

        res.status(201).json({ message: '숙소 정보를 수정했습니다.' });
    };

    deleteAccommo = async (req, res, next) => {
        // const { memberId } = res.locals.user;
        const { accId } = req.params;

        await this.accommoService.deleteAccommo(accId);

        res.status(201).json({ message: '숙소를 삭제했습니다.' });
    }
}

module.exports = AccommoController;
