# WeatherWeb

This is a website I made to see the current and hourly temperature and humidity of my room compared to outside. This website also displays the current temperature feel and cloud cover via an image. The predicted hourly outside forecast is known from 12:00 AM to 11:00 PM for the day (forecast updated every 15 mins from wunderground, see my other project [weatherService](https://github.com/cpitzak/weatherService)). The room temperature is updated every 5 seconds via a DHT22 sensor that is connected to a raspberry pi (see my other project [dht22Service](https://github.com/cpitzak/dht22Service)). This website updates dynamically (no need to refresh the webpage).

I have this website start when my raspberry pi is loaded. My raspberry pi is always on and this website is accessable to me on my LAN via http://private_pi_domain_name:3000

This website is to be used with my other two projects [dht22Service](https://github.com/cpitzak/dht22Service) and [weatherService](https://github.com/cpitzak/weatherService).

Live Demo: [https://weather-clintpitzak.rhcloud.com](https://weather-clintpitzak.rhcloud.com)
This is the real-time weather of my room. No need to refresh the webpage, it updates automatically.

## Purpose

I made this website to be able to know what the temperature will be like for my room during the hot summer days so I can plan accordingly. The main motivation was the heat of the summer however it will be useful for the cold winters and regular days. The first phase is what you see below. This has been useful to know the optimal time to open the windows and when it would be good to be out of the house.

The next phase, after gathering several days/hours of temperature data, is to add machine learning to predict what my hourly room temperature will be for the hours of the day.


## Prerequisites
You need to have the following installed:

- [dht22Service](https://github.com/cpitzak/dht22Service)
- [weatherService](https://github.com/cpitzak/weatherService)
- [node.js](https://nodejs.org/en/)
- [bower](https://bower.io/)


## Install

Note: make sure mongdb is running whenever using this service


```
$ sudo mkdir /apps
$ sudo chown pi /apps
$ cd /apps
$ git clone https://github.com/cpitzak/weatherWeb.git
$ cd weatherWeb
$ sudo cp init.d/weatherWeb /etc/init.d/
$ sudo chmod 755 /etc/init.d/weatherWeb
$ sudo update-rc.d weatherWeb defaults
$ sudo update-rc.d weatherWeb enable
$ sudo systemctl daemon-reload
$ npm install
$ bower install
$ sudo service weatherWeb start
```
Screen shot taken around 9:30 pm at night.

![Weather Web](/screenshots/night.png?raw=true "Screen shot of WeatherWeb around 9:30 pm")
