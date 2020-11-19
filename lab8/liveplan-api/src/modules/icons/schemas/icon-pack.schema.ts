import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const IconPackSchema = new Schema({
    key: {type: String, unique: true},
    name: String,
    users: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    // icons: [{type: MongoId, ref: 'Icon'}],
}, {
    strictQuery: true,
    timestamps: true,
    useNestedStrict: true,
});
