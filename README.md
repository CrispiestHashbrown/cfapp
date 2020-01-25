# cfapp
The Commit Frequency App is a mobile Ionic webapp that adds a contribution history chart for every search result from GitHub. This lets the user know how active project development has been within the past half year for any particular repository.

 ![cfapp-walkthrough](https://media.giphy.com/media/Jo1QJ5nu7nF4Zqgk1J/giphy.gif)

## Getting started
Clone the application: 
```
git clone https://github.com/CrispiestHashbrown/cfapp.git
```
Navigate to the project directory and install dependencies:
```
npm install
```
Install the [Ionic and Cordova CLI](https://ionicframework.com/docs/v3/intro/installation/):
```
npm install -g ionic cordova
```
Testing on your machine browser:
```
ionic serve
```
To build an Android debug apk:
```
ionic cordova run android --debug
```
To build an Android release apk:
```
ionic cordova run android --prod --release
```
Builds can be found at:
```
/platforms/android/app/build/outputs/apk
```

## Usage
- This mobile web app is designed to work with the [Commit Frequency API](https://github.com/CrispiestHashbrown/cfapi).

- The CFAPP requires you to login to GitHub to receive a one-time use token, which you must copy and submit to access the app. 

 ![cfapp-signin](https://media.giphy.com/media/VHqhEanVi6cVfBU8tu/giphy.gif)

- GitHub tokens never expire. To revoke GitHub tokens you simply log out of the app or you can visit your GitHub through:
```
Settings > Applications > Authorized GitHub Apps
```

- There are no ads.

- This has only been tested on Chrome web browser and Android Marshmallow. 

## Contributions
- Contributions welcome!
