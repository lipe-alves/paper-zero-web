export type Middleware = (req: NextRequest) => void | Promise<void>;
export type Controller<ResponseData> = (
    req: NextApiRequest
) => APIResponse<ResponseData> | Promise<APIResponse<ResponseData>>;
