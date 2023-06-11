import { sign, verify } from "jsonwebtoken"

const secretToken = process.env.JWT_SECRET

const signToken = async (userInfo) => {
    const jwt = sign(userInfo, secretToken, {
        expiresIn: '24h'
    })

    return jwt
}

const verifyToken = async (jwt) => {
    const isOk = verify(jwt, secretToken)
    return isOk
}

const decodeToken = async (jwt) => {
    try {
        const decoded = verify(jwt, secretToken);
        return decoded['email'];
    } catch (err) {
        return null;
    }
}

export { signToken, verifyToken, decodeToken }