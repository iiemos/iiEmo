import { Context as HandlerContext, Context } from '../function/context';
import { Event as HandlerEvent } from '../function/event';
import { BaseHandler, HandlerCallback } from '../function/handler';
import { Response } from '../function/response';
import { NetlifySecrets } from './secrets_helper';
export { getSecrets, getSecretsForBuild } from './secrets_helper';
export { getNetlifyGraphToken, getNetlifyGraphTokenForBuild, GraphTokenResponse, HasHeaders } from './graph_token';
export interface ContextWithSecrets extends Context {
    secrets: NetlifySecrets;
}
export declare type HandlerWithSecrets = BaseHandler<Response, ContextWithSecrets>;
export declare const withSecrets: (handler: BaseHandler<Response, ContextWithSecrets>) => (event: HandlerEvent, context: HandlerContext, callback: HandlerCallback<Response>) => Promise<void | Response>;
