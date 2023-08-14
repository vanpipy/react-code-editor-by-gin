package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestExecuteRoute(t *testing.T) {
  router := setupRouter()

  w := httptest.NewRecorder()
  jsonBody := []byte(`{"code":"package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, World\")\n}"}`)
  bodyReader := bytes.NewReader(jsonBody)
  req, _ := http.NewRequest(http.MethodPost, "/api/v1/execute", bodyReader)
  router.ServeHTTP(w, req)

  assert.Equal(t, 200, w.Code)
  assert.Equal(t, `{"error":null,"msg":"Hello, World\n"}`, w.Body.String())
}
