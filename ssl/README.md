# Install the certificate

We have to make sure the browser trust our certificate, so we're going to install it on our local machine.

## OS X

* Double click on the certificate (server.crt)
* Select your desired keychain (login should suffice)
* Add the certificate
* Open Keychain Access if it isn't already open
* Select the keychain you chose earlier
* You should see the certificate localhost
* Double click on the certificate
* Expand Trust
* Select the option Always Trust in When using this certificate
* Close the certificate window
* The certificate is now installed.

# Windows 10

* Double click on the certificate (server.crt)
* Click on the button "Install Certificate …"
* Select whether you want to store it on user level or on machine level
* Click "Next"
* Select "Place all certificates in the following store"
* Click "Browse"
* Select "Trusted Root Certification Authorities"
* Click "Ok"
* Click "Next"
* Click "Finish"
* If you get a prompt, click "Yes"
* The certificate is now installed.