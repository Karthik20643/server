import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "movie-ticket-booking-app" });

const syncUserCreation = inngest.createFunction(
    { id: "sync-user-from-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;

        await User.create({
            id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`.trim(),
            image: image_url,
        });
    },
);

const syncUserDeletion = inngest.createFunction(
    { id: "delete-user-from-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        await User.findOneAndDelete({ id: event.data.id });
    },
);

const syncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;

        await User.findOneAndUpdate(
            { id },
            {
                email: email_addresses[0].email_address,
                name: `${first_name} ${last_name}`.trim(),
                image: image_url,
            },
            { new: true },
        );
    },
);

export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
];



