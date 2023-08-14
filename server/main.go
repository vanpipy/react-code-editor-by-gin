package main

import (
  "os"
  "fmt"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
  "github.com/gin-gonic/contrib/static"
  "github.com/vanpipy/react-code-editor-by-gin/server/api"
)

var (
	router api.Router = api.NewRouter()
)

func setupRouter() *gin.Engine {
  www := os.Getenv("STATIC_DIR")
	app := gin.Default()
	app.Use(static.Serve("/", static.LocalFile(www, true)))
  msg := fmt.Sprintf("Static is serving at dir %s", www)
  fmt.Println(msg)
	router.SetupRouter(app)
  return app
}

func main() {
	// Load ENV from .env file
	err := godotenv.Load()
	if err != nil {
		panic("error loading .env file, check the .env.* and try move to .env")
	}

  host := os.Getenv("LOCALHOST")
  port := os.Getenv("LOCALPORT")

  msg := fmt.Sprintf("Application is running %s:%s", host, port)
  fmt.Println(msg)

  app := setupRouter()
  app.Run(host + ":" + port)
}
