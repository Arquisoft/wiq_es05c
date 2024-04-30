#!/bin/bash
source ~/.bashrc
source ~/.profile
cd ~
if [ ! -d "e2e" ]; then
  git clone https://github.com/Arquisoft/wiq_es05c.git e2e
fi
cd e2e
git pull
npm install -g npm@10.5.0
npm --prefix users/authservice install
npm --prefix users/userservice install
npm --prefix gatewayservice install
npm --prefix historyservice install
npm --prefix questionservice install
npm --prefix roomservice install
npm --prefix webapp install
npm --prefix webapp run build
xvfb-run --auto-servernum npm --prefix webapp run test:e2e