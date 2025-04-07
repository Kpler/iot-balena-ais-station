#!/usr/bin/env bash
if [[ -n $CHECK_CONN_FREQ ]]
    then
        freq=$CHECK_CONN_FREQ
    else
        freq=120
fi


sleep 5

while true; do
    if [[ $VERBOSE != false ]]; then echo "Checking internet connectivity ..."; fi
    if iwgetid -r; then
        if [[ $VERBOSE != false ]]; then printf "Your device is already connected to the internet.\nSkipping setting up Wifi-Connect Access Point. Will check again in %d seconds." "$freq"; fi
    else
        if [[ $VERBOSE != false ]]; then printf "Your device is not connected to the internet.\nStarting up Wifi-Connect.\n Connect to the Access Point and configure the SSID and Passphrase for the network to connect to."; fi
        DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket /usr/src/app/wifi-connect -u /usr/src/app/ui
    fi

    sleep "$freq"

done


balena-idle