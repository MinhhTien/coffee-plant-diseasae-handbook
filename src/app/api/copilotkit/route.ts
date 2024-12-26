import { NextRequest } from 'next/server'
import {
  CopilotRuntime,
  OpenAIAdapter,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint
} from '@copilotkit/runtime'
const { GoogleGenerativeAI } = require('@google/generative-ai')

export const POST = async (req: NextRequest) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro'
  })

  const serviceAdapter = new GoogleGenerativeAIAdapter({ model })
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: new CopilotRuntime(),
    serviceAdapter: serviceAdapter,
    endpoint: req.nextUrl.pathname
  })

  return handleRequest(req)
}