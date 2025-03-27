interface AmoCRMConfig {
    domain: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    accessToken?: string;
    authCode?: string;
    pipelineId: number;
    statusId: number;
}
interface AmoCRMLead {
    name: string;
    price: number;
    contact: {
        name: string;
        email: string;
        phone: string;
    };
    message?: string;
}
interface AmoCRMTokenResponse {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
}
export declare class AmoCRMService {
    private config;
    private apiDomain;
    constructor(config: AmoCRMConfig);
    exchangeAuthCode(): Promise<AmoCRMTokenResponse>;
    createLead(data: AmoCRMLead): Promise<any>;
    getPipelines(): Promise<any>;
}
export declare const amoCRMService: AmoCRMService;
export {};
