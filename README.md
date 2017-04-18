# socar mobile
Socar Mobile App for iOS and Android

For Android 4.x

# ionic Issues
If you encounter this error while adding the Android Platform run:
Bower error, check that "android" exists,

  1. sudo npm install -g ionic
  2. sudo npm install -g cordova
  3. ionic lib update
  4. ionic add ionic-platform-web-client
  5. ionic add android
  6. ionic add ios

# Publishing Android:
  0. cordova build --release android
  1. cd socarmobile/platforms/android/build/outputs/apk
  2. keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
  3. jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name
  4. ~/Library/Android/sdk/build-tools/22.0.1/zipalign -v 4 android-release-unsigned.apk socartracking.apk
