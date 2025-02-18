#!/bin/sh

echo "Starting rtl_ais..."

if [ -z "${RTL_SDR_OUTPUT_HOST}" ] && [ -z "${RTL_SDR_OUTPUT_PORT}" ]; then
  echo "Please set the RTL_SDR_OUTPUT_HOST and RTL_SDR_OUTPUT_PORT environment variable"
  exit 1
fi
FLAGS="-h ${RTL_SDR_OUTPUT_HOST} -P ${RTL_SDR_OUTPUT_PORT}"
if [ "${VERBOSE}" = "true" ]; then
  echo "Enabling verbose mode"
  FLAGS="${FLAGS} -n"
fi
rtl_ais ${FLAGS}