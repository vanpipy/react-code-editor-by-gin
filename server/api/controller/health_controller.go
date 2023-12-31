package controller

import "github.com/gin-gonic/gin"

type HealthController interface {
	Check(ctx *gin.Context)
}

type healthController struct{}

func NewHealthController() HealthController {
	return &healthController{}
}

func (c *healthController) Check(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"status": "ok",
	})
}
