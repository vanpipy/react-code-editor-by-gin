package controller

import (
  "fmt"
  "bytes"
  "net/http"

  "github.com/gin-gonic/gin"
  "github.com/traefik/yaegi/interp"
  "github.com/traefik/yaegi/stdlib"
)

type ExecutorController interface {
  Execute(ctx *gin.Context)
}

type executorController struct{}

type Executor struct {
  Code string `json:"code"`
}

func NewExecutorController() ExecutorController {
  return &executorController{}
}

func (c *executorController) Execute(ctx *gin.Context) {
  var stdout, stderr bytes.Buffer
  var executor Executor

  if err := ctx.ShouldBindJSON(&executor); err == nil {
    interpreter := interp.New(interp.Options{
      Stdout: &stdout,
      Stderr: &stderr,
    })
    interpreter.Use(stdlib.Symbols)

    _, err := interpreter.Eval(executor.Code)

    result := stdout.String()
    fmt.Println("Executed result: " + result)

    ctx.JSON(http.StatusOK, gin.H{
      "msg": result,
      "error": err,
    })

    return
  }

  ctx.JSON(http.StatusBadRequest, gin.H{
    "error": "the code is required",
  })
}
