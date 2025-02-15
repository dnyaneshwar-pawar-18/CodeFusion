import jwt from 'jsonwebtoken'

export const generateToken = async (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_USER_SECRET, {
        expiresIn: '3d',
    })

    res.cookie('jwt', token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    })

    return token;
}

export const generateMentorToken = async (mentorId, res) => {
    const mentorToken = jwt.sign({mentorId}, process.env.JWT_MENTOR_SECRET, { expiresIn: '3d'})

    res.cookie('mentor_jwt', mentorToken, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    })
}