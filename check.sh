#!/usr/bin/env bash

# check for errors with ejs bleeding through
ag --html "&lt;%|%&gt;" docs
