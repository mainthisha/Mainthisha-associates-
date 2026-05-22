import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development_only_123456';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload: { email: string; role: string }): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secretKey);
}

export async function verifyToken(token: string): Promise<{ email: string; role: string } | null> {
    try {
        const { payload } = await jwtVerify(token, secretKey, {
            algorithms: ['HS256'],
        });
        return payload as { email: string; role: string };
    } catch (error) {
        return null;
    }
}
