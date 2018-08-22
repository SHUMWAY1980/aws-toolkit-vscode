'use strict';

import { AWSContext } from './awsContext';

export class AWSClientBuilder {

    private awsContext: AWSContext;

    constructor(awsContext: AWSContext) {
        this.awsContext = awsContext;

    }

    // centralized construction of transient AWS service clients, allowing us
    // to customize requests and/or user agent
    public async createAndConfigureSdkClient(awsService: any, awsServiceOpts: any | undefined, region: string | undefined) : Promise<any> {

        if (awsServiceOpts) {
            if (!awsServiceOpts.credentials) {
                awsServiceOpts.credentials = await this.awsContext.getCredentials();
            }
            if (!awsServiceOpts.region && region) {
                awsServiceOpts.region = region;
            }

            return new awsService(awsServiceOpts);
        }

        return new awsService({
            credentials: await this.awsContext.getCredentials(),
            region: region
        });
    }
}