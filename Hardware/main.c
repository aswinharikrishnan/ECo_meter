#include <LiquidCrystal.h>
#include <SD.h>

#define VOLTAGE_SENSOR A0
#define CURRENT_SENSOR A3
#define SD_CS 5 // Change if your SD module uses a different CS pin

// LCD Pins: RS, E, D4, D5, D6, D7
LiquidCrystal lcd(25, 26, 14, 27, 12, 13);

// For energy calculation
float voltage = 0.0;
float current = 0.0;
float energyWh = 0.0;

unsigned long lastSampleTime = 0;
unsigned long lastSaveTime = 0;
unsigned long sampleInterval = 1000;  // 1 second sampling
unsigned long saveInterval = 3600000; // 1 hour saving interval (in ms)
unsigned int hourCounter = 0;

void setup()
{
    Serial.begin(9600);
    lcd.begin(16, 2);
    lcd.print("Smart Energy");

    delay(1000);
    lcd.clear();

    if (!SD.begin(SD_CS))
    {
        lcd.print("SD init failed");
        Serial.println("SD initialization failed!");
        while (1)
            ;
    }

    lcd.print("SD Ready");
    delay(1000);
    lcd.clear();
}

void loop()
{
    unsigned long currentMillis = millis();

    // Sample every second
    if (currentMillis - lastSampleTime >= sampleInterval)
    {
        lastSampleTime = currentMillis;

        voltage = readVoltage();
        current = readCurrent();

        float power = voltage * current; // in watts
        energyWh += power / 3600.0;      // Energy in watt-hours

        // Display live values
        lcd.setCursor(0, 0);
        lcd.print("V:");
        lcd.print(voltage, 1);
        lcd.print(" I:");
        lcd.print(current, 1);

        lcd.setCursor(0, 1);
        lcd.print("E:");
        lcd.print(energyWh, 2);
        lcd.print("Wh");
    }

    // Save every hour
    if (currentMillis - lastSaveTime >= saveInterval)
    {
        lastSaveTime = currentMillis;
        hourCounter++;
        logToSD(hourCounter, energyWh);
    }
}

float readVoltage()
{
    int raw = analogRead(VOLTAGE_SENSOR);
    float voltage = (raw / 4095.0) * 3.3;          // Assuming 3.3V ADC ref
    float actualVoltage = voltage * (250.0 / 3.3); // Adjust with scaling factor
    return actualVoltage;
}

float readCurrent()
{
    int raw = analogRead(CURRENT_SENSOR);
    float voltage = (raw / 4095.0) * 3.3; // Assuming 3.3V ADC ref
    float current = voltage * 10.0;       // Adjust based on CT calibration
    return current;
}

void logToSD(int hour, float energyWh)
{
    File file = SD.open("/energy_log.csv", FILE_APPEND);
    if (file)
    {
        file.print("Hour ");
        file.print(hour);
        file.print(",");
        file.print(energyWh, 2);
        file.println(" Wh");
        file.close();
        Serial.println("Logged to SD");
    }
    else
    {
        Serial.println("Error writing to SD");
    }
}