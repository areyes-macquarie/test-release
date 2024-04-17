#!/bin/sh
set -e
service ssh start

exec node server.js
