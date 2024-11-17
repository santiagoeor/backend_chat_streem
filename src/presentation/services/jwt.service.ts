import jwt from "jwt-simple";
import moment from "moment";
import { Users } from "../interfaces/user.interface";

export const secret = 'ClaveSecddSD_W_ddj_FGS12';

export const createToken = (user: Users) => {

    const payload = {
        id: user.id,
        user: user.usuario,
        foto: user.foto,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix()
    };

    return jwt.encode(payload, secret);

}