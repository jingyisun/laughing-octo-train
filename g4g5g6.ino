#include <Servo.h>

int incomingByte;

Servo topServo;
Servo bottomServo;

const int piezoPin = A0; //add 1 ohm resistor
const int threshold = 600; //change according to test

int sensorReading = 0;

void setup() {
  Serial.begin(9600);
  topServo.attach(9);
  bottomServo.attach(10);
}

void loop() {
  sensorReading = analogRead(piezoPin);
  if (sensorReading >= threshold) {
    Serial.println('A');
    bottomServo.write(90);
  }

  if (Serial.available() > 0) {
    incomingByte = Serial.read();
    if (incomingByte == 'N') {
      digitalWrite(ledPin, HIGH);
    }
    else if (incomingByte == 'S') {
      digitalWrite(ledPin, LOW);
      topServo.write(90);
    }else if (incomingByte == '') {//scott send something back
      Serial.println('Z');
    }
  }


}
