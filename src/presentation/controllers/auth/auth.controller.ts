import bcrypt from 'bcrypt';
import { User } from "../../models/User";
import { createToken } from '../../services/jwt.service';

export class AuthController {

    async login(req: any, res: any) {

        let params = req.body;

        if (!params.usuario || !params.password) {
            return res.status(422).json({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        } else {

            const userValidate = await User.findOneBy({
                usuario: params.usuario
            });

            if (userValidate) {
                // Comprobar password
                const pwd = bcrypt.compareSync(params.password, userValidate.password);

                if (!pwd) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'password inavlido'
                    });
                } else {

                    const Token = createToken(userValidate);

                    return res.status(200).send({
                        status: 'success',
                        message: 'Inicio de sesión correto',
                        user: {
                            id: userValidate.id,
                            user: userValidate.usuario,
                            foto: userValidate.foto
                        },
                        Token
                    });



                }
            }

        }

    }

}