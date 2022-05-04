#!/bin/bash

gunicorn --certfile=/etc/letsencrypt/live/benbrady.me/cert.pem --keyfile=/etc/letsencrypt/live/benbrady.me/privkey.pem --bind 0.0.0.0:443 wsgi:app
