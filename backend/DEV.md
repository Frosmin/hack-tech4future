$env:Path += ";$(go env GOPATH)\bin"

para linux
export PATH=$(go env GOPATH)/bin:$PATH

go mod tidy