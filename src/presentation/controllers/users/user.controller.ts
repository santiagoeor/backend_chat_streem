import bcrypt from 'bcrypt';
import { User } from '../../models/User';

export class UserController {

    async crearUser(req: any, res: any) {

        //Recoger los datos
        let params = req.body;

        // Comprobar envio de información
        if (!params.usuario || !params.password || !params.foto) {
            return res.status(422).json({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        } else {

            const userValidate = await User.findOneBy({
                usuario: params.usuario
            });

            if (!userValidate) {

                bcrypt.hash(params.password, 10).then((pwd) => {
                    const user = new User();
                    user.usuario = params.usuario;
                    user.password = pwd;
                    user.foto = params.foto;
                    user.save();
                    return res.status(200).json({
                        status: 'success',
                        message: 'Usuario Creado',
                        user
                    });
                });

            } else {
                return res.status(400).json({
                    status: 'success',
                    message: 'Este usuario ya esta registrado'
                });
            }

        }

    }

}