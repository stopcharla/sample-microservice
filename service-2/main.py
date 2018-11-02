import constants as const
import pika
import json
import configparser

global channel

def subscriber(ch, method, properties, body):
    body = json.loads(body)
    print body
    body['isPaymentDone'] = True
    publish(const.InferencedImagesQ,json.dumps(body))
    ch.basic_ack(delivery_tag = method.delivery_tag)

def publish(queueName, body):
    global channel
    channel.basic_publish('',queueName,body)
    print ('published to q:',queueName)
    print('published body:',body)

def initalizeRabbitmq():
    global channel
    print "config found "
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    print "connected to rabbitmq"
    channel = connection.channel()
    channel.queue_declare(queue=const.InferencedImagesQ, durable=True)
    channel.queue_declare(queue=const.QToInferenceImages, durable=True)
    
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(subscriber,queue = const.QToInferenceImages)
    channel.start_consuming()


if __name__ == "__main__":
    initalizeRabbitmq()
