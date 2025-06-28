#include <LiquidCrystal.h>
#include <Wire.h>
#include <RTClib.h>
#include <SPI.h>
#include <SD.h>

// LCD pins: RS, E, D4, D5, D6, D7
LiquidCrystal lcd(14, 12, 13, 15, 2, 4);

// RTC and SD
RTC_DS1307 rtc;
const int chipSelect = 5; // CS pin for SD card

// Sensor and power line pins
const int voltagePin = 36;
const int currentPin = 39;
const int powerLinePin = 33;

float energyWh = 0.0;
bool lastPowerStatus = true;
unsigned long lastDisplayUpdate = 0;
unsigned long lastSDWrite = 0;

void setup()
{
    Serial.begin(115200);

    lcd.begin(16, 2);
    lcd.print("Initializing...");

    Wire.begin();
    rtc.begin();
    if (!rtc.isrunning())
    {
        rtc.adjust(DateTime(F(_DATE), F(TIME_)));
    }

    if (!SD.begin(chipSelect))
    {
        lcd.setCursor(0, 1);
        lcd.print("SD Fail");
    }

    pinMode(powerLinePin, INPUT);

    delay(2000);
    lcd.clear();
}

void logToSD(float voltage, float current, float energy, bool isOutage = false)
{
    DateTime now = rtc.now();
    File logFile = SD.open("energy.csv", FILE_WRITE);
    if (logFile)
    {
        logFile.print(now.timestamp());
        logFile.print(",");
        logFile.print(voltage, 2);
        logFile.print(",");
        logFile.print(current, 2);
        logFile.print(",");
        logFile.print(energy, 2);
        if (isOutage)
            logFile.print(",POWER LOSS");
        logFile.println();
        logFile.close();
    }
    else
    {
        Serial.println("SD Write Error!");
    }
}

void loop()
{
    unsigned long now = millis();
    bool currentPower = digitalRead(powerLinePin);

    int vRaw = analogRead(voltagePin);
    int iRaw = analogRead(currentPin);

    float voltage = (vRaw / 4095.0) * 250.0;
    float current = (iRaw / 4095.0) * 30.0;
    float power = voltage * current;

    energyWh += (power / 3600.0); // Convert W to Wh per second

    if (now - lastDisplayUpdate >= 1000)
    {
        lastDisplayUpdate = now;
        lcd.setCursor(0, 0);
        lcd.print("V:");
        lcd.print(voltage, 1);
        lcd.print(" I:");
        lcd.print(current, 1);
        lcd.setCursor(0, 1);
        lcd.print("E:");
        lcd.print(energyWh, 2);
        lcd.print("Wh ");
    }

    if (now - lastSDWrite >= 5000)
    {
        lastSDWrite = now;
        logToSD(voltage, current, energyWh);
    }

    if (!currentPower && lastPowerStatus)
    {
        logToSD(voltage, current, energyWh, true);
    }

    lastPowerStatus = currentPower;
}