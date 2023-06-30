# If you are first time running app in real IOS device.
# Step 1: 
sudo npm install -g ios-deploy --unsafe-perm=true --allow-root

react-native run-ios --device "Mukthaharios"

# Check List of available devices
xcrun xctrace list devices

# Open android studio from mac terminal
open -a /Applications/Android\ Studio.app