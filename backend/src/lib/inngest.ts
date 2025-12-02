import { Inngest } from 'inngest';
import { connectDatabase } from '../db/db.mongoose';
import { ENV } from '../config/env';
import { User } from '../models/user.model';

export const inngest = new Inngest({ id: 'Ecommerce-app' });
const syncUser = inngest.createFunction(
  { id: 'sync-user' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    await connectDatabase(ENV.MONGO_URL as string);
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
      imageUrl: image_url,
      addresses: [],
      wishlist: [],
    };
    await User.create(newUser);
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: 'delete-user-from-db' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    try {
      await connectDatabase(ENV.MONGO_URL as string);
      const { id } = event.data;
      await User.deleteOne({ clerkId: id });
    } catch (e) {
      console.error('error deleting user', e);
    }
  },
);

export const functions = [syncUser, deleteUserFromDB];
