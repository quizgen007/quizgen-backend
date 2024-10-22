import { Schema, model, Document } from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           unique: true
 *           format: email
 *         googleId:
 *           type: string
 *         plan:
 *           type: string
 *           default: free 
 *       required:
 *         - name
 *         - email
 *         - plan
 */

interface IUser extends Document {
    name: string;
    email: string;
    googleId?: string,
    plan: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    plan: { type: String, required: true, default: 'free' },
});

export default model<IUser>('User', userSchema);