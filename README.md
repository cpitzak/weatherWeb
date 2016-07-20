# WeatherWeb

This is a website I made to see the current temperature and humidity of my room compared to the weather conditions outside. This website displays the hourly outside and inside temperature and humidity through charts. The current ouside temperature, temperature feel, humidity, and cloud cover are shown. Also the current indoor temperature and humidity are shown.

I have this website start when my raspberry pi is loaded. My raspberry pi is always on and this website is accessable to me on my LAN via http://private_pi_domain_name:3000

This website is to be used with my other two projects [dht22Service](https://github.com/cpitzak/dht22Service) and [weatherService](https://github.com/cpitzak/weatherService).


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
