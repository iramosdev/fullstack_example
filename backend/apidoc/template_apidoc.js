/**
 * @api {post} http://{{IP}}:{{port}}/auth 1) Autenticacion de usuarios
 * 
 * @apiVersion 1.0.0
 * 
 * @apiName Login
 * @apiGroup Test
 *
 * @apiParam {String} correo    Correo del usuario. <code>Requerido</code>
 * @apiParam {String} password  Contraseña de la cuenta. <code>Requerido</code>
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
        {
            "success": true,
            "id": 666,
            "username": "DKL",
            "email": "root@gmail.com.mx",
            "name": "Root",
            "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbGVtZW50cyI6e30sImlhdCI6MTU4ODgzMjk0NCwiZXhwIjoxNTg4ODM2NTQ0fQ.tX30zN7WSD7Obht9ZTF5-s7hk2H1Qp06CHpBpc1OSyE",
            "token_type": "bearer",
            "expires": 3600
        }
 *
 * @apiError 400  <b> BAD REQUEST :</b>             La petición es inválida o no puede ser procesada.
 * @apiError 401  <b> UNAUTHORIZED :</b>            La petición requiere autenticación.
 * @apiError 404  <b> NOT FOUND    : </b>           No existe el recurso para la URI especificada
 * @apiError 422  <b> UNSUPROCESSABLE ENTITY:</b>   La peticion es correcta pero contenido erroneo por tal no se puede responder correctamente
 
 * 
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Invalid user"
 *     }
 */
