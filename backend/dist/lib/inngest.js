"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.inngest = void 0;
const inngest_1 = require("inngest");
const db_mongoose_1 = require("../db/db.mongoose");
const env_1 = require("../config/env");
const user_model_1 = require("../models/user.model");
exports.inngest = new inngest_1.Inngest({ id: 'Ecommerce-app' });
const syncUser = exports.inngest.createFunction({ id: 'sync-user' }, { event: 'clerk/user.created' }, async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s');
    await (0, db_mongoose_1.connectDatabase)(env_1.ENV.MONGO_URL);
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const newUser = {
        clerkId: id,
        email: email_addresses?.[0]?.email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
        imageUrl: image_url,
        addressess: [],
        wishlist: [],
    };
    await user_model_1.User.create(newUser);
});
const deleteUserFromDB = exports.inngest.createFunction({ id: 'delete-user-from-db' }, { event: 'clerk/user.deleted' }, async ({ event }) => {
    try {
        await (0, db_mongoose_1.connectDatabase)(env_1.ENV.MONGO_URL);
        const { id } = event.data;
        await user_model_1.User.deleteOne({ clerkId: id });
    }
    catch (e) {
        console.error('error deleting user', e);
    }
});
exports.functions = [syncUser, deleteUserFromDB];
