
export type GLContext = WebGLRenderingContext | WebGL2RenderingContext;

export function isWebGLRenderingContent(ctx: GLContext): ctx is WebGLRenderingContext {
	return ctx instanceof WebGLRenderingContext;
}

export function isWebGL2RenderingContent(ctx: GLContext): ctx is WebGL2RenderingContext {
	return ctx instanceof WebGL2RenderingContext;
}
