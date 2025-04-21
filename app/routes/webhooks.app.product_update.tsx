import { ActionFunction } from '@remix-run/node';

import db from '../db.server';
import { authenticate } from 'app/shopify.server';


export const action: ActionFunction = async ({ request }) => {
    const { topic, shop, session } = await authenticate.webhook(request);

    switch (topic) {
       case 'PRODUCTS_UPDATE':
            const body = await request.json();
            console.log(`Received ${topic} webhook for ${shop}`);
        default:
            throw new Response('Unhandled webhook topic', { status: 404 });
    }

    throw new Response();
};
