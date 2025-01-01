#!/usr/bin/env bash
set -e

# check for errors with ejs bleeding through
# "!" for correct terminal status code
! rg --type html -F "&lt;%|%&gt;" docs
