## Build locally

https://docs.expo.dev/get-started/set-up-your-environment/
npx expo run:ios

`build for emulator`
https://docs.expo.dev/develop/development-builds/create-a-build/

`development build need to connect with local server to run`

- eas build --profile development --platform ios

`preview build don't need to connect with local server to run aka run it but just installing it`

- eas build -p ios --profile preview

## Local build | `This is working with linux and mac only`

https://docs.expo.dev/build-reference/local-builds/

eas build --platform ios --local
eas build --platform ios --local --profile development
eas build --platform ios --local --profile preview_aab

## File size

https://github.com/expo/fyi/blob/main/android-app-size.md

## How to build app for devices

https://docs.expo.dev/develop/development-builds/create-a-build/

## how to test builds on IOS

https://docs.expo.dev/build/internal-distribution/

## how to install the specific version of builds

- eas build:run -p android
- https://docs.expo.dev/build-reference/apk/

## Expo code

Once you've added the Expo code, you must prebuild your app before running it.

`npx expo prebuild --platform android  --clean`
`adb uninstall com.anishjain.mr-app`
`npx expo prebuild --platform ios  --clean`

## How to run app on device

Expo Go is the fastest way to run your app but superwall needs development build to run.

`Expo Go`

- npx run ios
- npx run android

`Development Build`

- npx expo run:ios
- npx expo run:android

## My 2penies

it's might not work though I have tested it on my `M4 MacBook Pro` making react native expo app is most frustrating experience of my development journey.

so if you are using shitty machine don't even bother to try it. it's a waste of time web dev is so much fun.

but if you are stil here please use

- Convex for backend, don't even bother to use to expo sqlite OMG making local database is so hard look around I have other `Boote` using it and dug your grave

- and keep refeshing, keep refeshing, keep refeshing it's might work.

Your Welcome :)
