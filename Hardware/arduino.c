#include <LiquidCrystal.h>
#include <Wire.h>
#include <RTClib.h>
#include <SPI.h>
#include <SD.h>

LiquidCrystal lcd(7, 6, 5, 4, 3, 2); // RS, EN, D4–D7
RTC_DS1307 rtc;

const int chipSelect = 10;
const int powerLinePin = 8; // Slide switch for simulating power cut

unsigned long lastSave = 0;
float energyWh = 0;
bool lastPowerStatus = HIGH;

// Function declaration
void logToSD(float voltage, float current, float energy, bool isOutage = false);

void setup()
{
    pinMode(powerLinePin, INPUT_PULLUP); // use internal pull-up

    lcd.begin(16, 2);
    lcd.print("Smart Energy");
    delay(1500);
    lcd.clear();

    if (!rtc.begin())
    {
        lcd.print("RTC fail");
        while (1)
            ;
    }

    if (!rtc.isrunning())
    {
        rtc.adjust(DateTime(F(_DATE), F(TIME_)));
    }

    if (!SD.begin(chipSelect))
    {
        lcd.setCursor(0, 1);
        lcd.print("SD Fail");
        while (1)
            ;
    }
}

void loop()
{
    unsigned long now = millis();
    bool currentPower = digitalRead(powerLinePin);

    // Simulated analog readings using slide pots
    int voltageAnalog = analogRead(A0); // Voltage pot
    int currentAnalog = analogRead(A1); // Current pot

    float voltage = (voltageAnalog / 1023.0) * 250.0; // Simulate 0–250V
    float current = (currentAnalog / 1023.0) * 30.0;  // Simulate 0–30A
    float power = voltage * current;

    // Sample interval is 50ms → convert to hours = 0.05/3600
    energyWh += power * (0.05 / 3600.0); // Wh

    // Display energy on LCD (line 1)
    lcd.setCursor(0, 0);
    lcd.print("Energy:");
    lcd.setCursor(8, 0);
    lcd.print(energyWh, 2);
    lcd.print("Wh ");

    // Display voltage & current (line 2)
    lcd.setCursor(0, 1);
    lcd.print("V:");
    lcd.print(voltage, 0);
    lcd.print(" I:");
    lcd.print(current, 1);
    lcd.print("  "); // clear excess characters

    // Save every 5 seconds
    if (now - lastSave >= 5000)
    {
        logToSD(voltage, current, energyWh);
        lastSave = now;
    }

    // Emergency save on power cut
    if (lastPowerStatus == HIGH && currentPower == LOW)
    {
        logToSD(voltage, current, energyWh, true);
    }

    lastPowerStatus = currentPower;
    delay(50);
}

void logToSD(float voltage, float current, float energy, bool isOutage)
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
        lcd.setCursor(0, 1);
        lcd.print("SD Write Error ");
    }
}