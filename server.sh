#!/usr/bin/env sh

PORT=${1-"8080"}
http-server docs -c-1 -p "$PORT"
