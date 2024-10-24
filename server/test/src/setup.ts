import * as dotenv from 'dotenv';

export default async function setup() {
    dotenv.config({path: './.env'});
}