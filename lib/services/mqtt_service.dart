import 'dart:io';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';

class MQTTService {
  MqttServerClient? client;
  final String serverId = 'your_mqtt_server_id';
  
  Future<void> connect() async {
    client = MqttServerClient('broker.hivemq.com', serverId);
    client!.port = 1883;
    client!.keepAlivePeriod = 60;
    client!.onDisconnected = onDisconnected;
    client!.onConnected = onConnected;
    client!.onSubscribed = onSubscribed;

    final connMess = MqttConnectMessage()
        .withClientIdentifier(serverId)
        .withWillTopic('willtopic')
        .withWillMessage('Will message')
        .startClean()
        .withWillQos(MqttQos.atLeastOnce);
    
    client!.connectionMessage = connMess;

    try {
      await client!.connect();
    } on NoConnectionException catch (e) {
      print('MQTT client connection failed - $e');
      client!.disconnect();
    } on SocketException catch (e) {
      print('MQTT socket exception - $e');
      client!.disconnect();
    }
  }

  void onConnected() {
    print('Connected to MQTT broker');
  }

  void onDisconnected() {
    print('Disconnected from MQTT broker');
  }

  void onSubscribed(String topic) {
    print('Subscribed to topic: $topic');
  }

  void publishMessage(String topic, String message) {
    final builder = MqttClientPayloadBuilder();
    builder.addString(message);
    client!.publishMessage(topic, MqttQos.exactlyOnce, builder.payload!);
  }

  void subscribeToTopic(String topic) {
    client!.subscribe(topic, MqttQos.atLeastOnce);
  }

  void disconnect() {
    client!.disconnect();
  }
}