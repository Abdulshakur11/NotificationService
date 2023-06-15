import amqplib from 'amqplib';
import { Notification } from './modules/bot/bot';

const queueName = 'my-queue';

export const connect = async () => {
    try {
        const connection = await amqplib.connect('amqp://localhost');

        const channel = await connection.createChannel();

        channel.consume(queueName, (msg) => {

            Notification(JSON.parse(msg.content.toString()))
            
        }, {noAck: true})
        
    } catch (error) {
        console.log(error)
    }
};