# Initial Docker setup for Golang

## Build and create image
1. docker build -t cfb_go .

## Run the app
2. docker run cfb_go

# Running without Docker
I. Make sure you have the latest go library here: https://golang.org/dl/

## Compile go file
1. go build hello.go

## Execute program
2. ./hello

## Compile and run
3. go run hello.go